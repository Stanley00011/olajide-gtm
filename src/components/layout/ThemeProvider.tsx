"use client";

import { ThemeProvider as NextThemes } from "next-themes";

/** Dark is the firm default; the toggle flips to light. No system override. */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemes
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemes>
  );
}
