import { buildPortfolioContext } from "@/lib/portfolio-context";

export const runtime = "edge";

type ChatMessage = { role: "user" | "assistant"; content: string };

/**
 * Streams answers about the portfolio from a free, OpenAI-compatible LLM
 * (Groq by default). The API key lives only on the server. If no key is
 * configured, returns a sentinel so the client shows a graceful fallback.
 */
export async function POST(req: Request) {
  const apiKey = process.env.LLM_API_KEY;
  const baseUrl = process.env.LLM_BASE_URL ?? "https://api.groq.com/openai/v1";
  const model = process.env.LLM_MODEL ?? "llama-3.3-70b-versatile";

  if (!apiKey) {
    return new Response("NOT_CONFIGURED", {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  let messages: ChatMessage[] = [];
  try {
    const body = await req.json();
    messages = Array.isArray(body?.messages) ? body.messages : [];
  } catch {
    return new Response("Bad request", { status: 400 });
  }

  // Keep it cheap + safe: cap history and message length.
  const trimmed = messages
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && m.content)
    .slice(-8)
    .map((m) => ({ role: m.role, content: String(m.content).slice(0, 1500) }));

  const system = `You are the AI guide for the portfolio of Olajide Ajao, an AI GTM Engineer. Answer questions about Olajide using ONLY the knowledge below. Be concise, warm, and specific (2-5 sentences, no fluff). When relevant, point to a page by its path (e.g. "see /gtm" or "/work"). Never invent metrics, clients, or claims that aren't in the knowledge. If something isn't covered, say so briefly and suggest the /contact page. Speak about Olajide in the third person.

KNOWLEDGE:
${buildPortfolioContext()}`;

  const upstream = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      stream: true,
      temperature: 0.4,
      max_tokens: 600,
      messages: [{ role: "system", content: system }, ...trimmed],
    }),
  });

  if (!upstream.ok || !upstream.body) {
    return new Response("UPSTREAM_ERROR", { status: 200 });
  }

  // Transform the provider's SSE into a plain text delta stream for the client.
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = upstream.body!.getReader();
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            const trimmedLine = line.trim();
            if (!trimmedLine.startsWith("data:")) continue;
            const data = trimmedLine.slice(5).trim();
            if (data === "[DONE]") {
              controller.close();
              return;
            }
            try {
              const json = JSON.parse(data);
              const delta = json.choices?.[0]?.delta?.content;
              if (delta) controller.enqueue(encoder.encode(delta));
            } catch {
              // ignore keep-alive / partial lines
            }
          }
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
