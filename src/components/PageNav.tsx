// Shared navigation header for the result and sub-pages, so there is always a
// visible way home and between tools. The logo and the Home button both return
// to the landing page; the menu links jump between the tools.

import { OnaMark } from "./OnaMark";

interface PageNavProps {
  onHome: () => void;
  onOpenOpportunities?: () => void;
  onOpenBranding?: () => void;
  onOpenAi?: () => void;
  active?: "opportunities" | "branding" | "ai";
}

export function PageNav({
  onHome,
  onOpenOpportunities,
  onOpenBranding,
  onOpenAi,
  active,
}: PageNavProps) {
  return (
    <header className="flex items-center justify-between gap-3 py-6">
      <button
        onClick={onHome}
        className="flex items-center gap-2.5"
        aria-label="Back to home"
      >
        <OnaMark className="h-8 w-8 text-navy" />
        <span className="text-xl font-bold tracking-tight text-navy">Ona</span>
      </button>

      <nav className="flex items-center gap-1 rounded-full border border-black/5 bg-white/70 p-1.5 shadow-[0px_6px_18.6px_0px_#d0d0d050] backdrop-blur">
        {onOpenOpportunities && (
          <NavLink active={active === "opportunities"} onClick={onOpenOpportunities}>
            Opportunities
          </NavLink>
        )}
        {onOpenBranding && (
          <NavLink active={active === "branding"} onClick={onOpenBranding}>
            Branding
          </NavLink>
        )}
        {onOpenAi && (
          <NavLink active={active === "ai"} onClick={onOpenAi}>
            AI for path
          </NavLink>
        )}
        <button onClick={onHome} className="btn-primary !rounded-full !px-5 !py-2.5">
          Home
        </button>
      </nav>
    </header>
  );
}

function NavLink({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "hidden rounded-full px-4 py-2 font-mono text-xs uppercase tracking-wider transition sm:block",
        active
          ? "bg-black/5 text-black"
          : "text-zinc-600 hover:bg-black/5 hover:text-black",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
