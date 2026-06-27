"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Sparkles, X, ArrowUp } from "lucide-react";
import { SUGGESTED_QUESTIONS } from "@/lib/portfolio-context";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "assistant"; content: string };

const PATH_RE = /(\/(?:automation|gtm|work|writing|about|contact)(?:\/[a-z0-9-]+)?)/g;

/** Render assistant text, turning internal paths like "/work" into links. */
function withLinks(text: string) {
  const parts = text.split(PATH_RE);
  return parts.map((part, i) =>
    PATH_RE.test(part) ? (
      <Link key={i} href={part} className="text-accent underline underline-offset-2">
        {part}
      </Link>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

const FALLBACK = `The live AI chat isn't switched on yet. In short: ${site.shortName} builds AI automation and GTM systems, taking manual, repetitive work and turning it into systems that run themselves. Explore /work for real case studies, or reach him at ${site.email}.`;

export function PortfolioChat() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 250);
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, busy]);

  async function ask(question: string) {
    const q = question.trim();
    if (!q || busy) return;
    setInput("");
    const next: Msg[] = [...messages, { role: "user", content: q }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setBusy(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      // Non-streaming sentinels (no key configured / upstream error)
      const ct = res.headers.get("Content-Type") ?? "";
      if (!res.body || !ct.includes("text/plain")) {
        setMessages([...next, { role: "assistant", content: FALLBACK }]);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        if (acc.startsWith("NOT_CONFIGURED") || acc.startsWith("UPSTREAM_ERROR")) {
          acc = FALLBACK;
        }
        setMessages([...next, { role: "assistant", content: acc }]);
      }
      if (!acc.trim()) {
        setMessages([...next, { role: "assistant", content: FALLBACK }]);
      }
    } catch {
      setMessages([...next, { role: "assistant", content: FALLBACK }]);
    } finally {
      setBusy(false);
    }
  }

  const lastIsEmptyAssistant =
    busy && messages[messages.length - 1]?.role === "assistant" &&
    !messages[messages.length - 1]?.content;

  return (
    <>
      {/* Launcher */}
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Ask the portfolio AI"
        initial={reduced ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: open ? 0 : 1, y: 0, pointerEvents: open ? "none" : "auto" }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="glass group fixed bottom-5 right-5 z-40 inline-flex items-center gap-2.5 rounded-full border border-border-strong px-4 py-3 text-sm font-medium text-fg shadow-[0_8px_30px_-8px_rgba(0,0,0,0.6)] hover:border-accent"
      >
        <span className="relative grid size-5 place-items-center">
          <Sparkles className="size-4 text-accent" />
          <span className="absolute inset-0 animate-ping rounded-full bg-accent/30" />
        </span>
        Ask my AI
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="chat"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="glass fixed inset-x-3 bottom-3 z-[60] flex h-[72vh] max-h-[640px] flex-col overflow-hidden rounded-2xl border border-border-strong shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] sm:inset-x-auto sm:right-5 sm:bottom-5 sm:h-[560px] sm:w-[400px]"
          >
            {/* Header */}
            <div className="relative flex items-center justify-between border-b border-border bg-bg-elev/70 px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-lg border border-border-strong bg-surface">
                  <Sparkles className="size-4 text-accent" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-fg">Portfolio AI</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-faint">
                    ask anything about {site.shortName}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="grid size-8 place-items-center rounded-full border border-border text-fg-muted hover:text-fg"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-5">
              {messages.length === 0 && (
                <div>
                  <p className="text-sm leading-relaxed text-fg-muted">
                    Hi, I&apos;m {site.shortName}&apos;s portfolio assistant. Ask me
                    about his automation and GTM systems, how he works, or whether
                    he&apos;s available.
                  </p>
                  <div className="mt-4 flex flex-col gap-2">
                    {SUGGESTED_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => ask(q)}
                        className="rounded-xl border border-border bg-bg-elev px-3.5 py-2.5 text-left text-sm text-fg-muted transition-colors hover:border-accent hover:text-fg"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex",
                    m.role === "user" ? "justify-end" : "justify-start",
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                      m.role === "user"
                        ? "bg-accent text-accent-fg"
                        : "border border-border bg-bg-elev text-fg",
                    )}
                  >
                    {m.role === "assistant" ? withLinks(m.content) : m.content}
                  </div>
                </motion.div>
              ))}

              {lastIsEmptyAssistant && (
                <div className="flex justify-start">
                  <div className="flex gap-1 rounded-2xl border border-border bg-bg-elev px-4 py-3">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="size-1.5 animate-pulse rounded-full bg-fg-faint"
                        style={{ animationDelay: `${d * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
              className="flex items-center gap-2 border-t border-border bg-bg-elev/70 p-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about a system, the process…"
                className="min-w-0 flex-1 rounded-full border border-border bg-bg px-4 py-2.5 text-sm text-fg placeholder:text-fg-faint focus:border-accent focus:outline-none"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label="Send"
                className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-accent-fg transition-transform hover:-translate-y-0.5 disabled:opacity-40"
              >
                <ArrowUp className="size-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
