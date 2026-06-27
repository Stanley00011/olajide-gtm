"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { site } from "@/data/site";

/**
 * Zero-backend v1: composes a mailto: with the message prefilled. Swap for a
 * Resend route or Formspree later without changing the page.
 */
export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`New inquiry from ${name || "the site"}`);
    const body = encodeURIComponent(
      `${message}\n\n— ${name}${email ? ` (${email})` : ""}`,
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  }

  const field =
    "w-full rounded-xl border border-border bg-bg-elev px-4 py-3 text-sm text-fg placeholder:text-fg-faint transition-colors focus:border-accent focus:outline-none";

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-4 rounded-[var(--radius)] border border-border bg-surface/40 p-7"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-fg-faint">
            Name
          </span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className={field}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-fg-faint">
            Email
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className={field}
          />
        </label>
      </div>
      <label className="flex flex-col gap-2">
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-fg-faint">
          What do you want to automate?
        </span>
        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          placeholder="Describe the process, the volume, and where it hurts…"
          className={`${field} resize-none`}
        />
      </label>
      <button
        type="submit"
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-accent-fg transition-transform hover:-translate-y-0.5"
      >
        Send message <Send className="size-4" />
      </button>
    </form>
  );
}
