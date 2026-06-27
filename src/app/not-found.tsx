import { Aurora } from "@/components/ui/Aurora";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative grid min-h-[80svh] place-items-center overflow-hidden">
      <Aurora />
      <div className="container-page relative text-center">
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-accent">
          404 — signal lost
        </p>
        <h1 className="mx-auto mt-5 max-w-2xl font-display text-4xl font-semibold tracking-tight text-fg sm:text-6xl">
          This node isn&apos;t in the graph.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-fg-muted">
          The page you&apos;re after doesn&apos;t exist — but the systems that do
          are worth a look.
        </p>
        <div className="mt-9 flex justify-center gap-3">
          <Button href="/" size="lg">
            Back home
          </Button>
          <Button href="/work" variant="ghost" size="lg">
            See the work
          </Button>
        </div>
      </div>
    </section>
  );
}
