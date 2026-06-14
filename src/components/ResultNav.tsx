// Sticky scroll-spy navigation for the result page. Horizontally scrollable on
// mobile; highlights the section currently in view and jumps to a section on
// tap. The active pill is kept scrolled into view.

import { useEffect, useRef } from "react";

export interface NavSection {
  id: string;
  label: string;
}

interface ResultNavProps {
  sections: NavSection[];
  activeId: string;
  onJump: (id: string) => void;
}

export function ResultNav({ sections, activeId, onJump }: ResultNavProps) {
  const activeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({
      inline: "center",
      block: "nearest",
      behavior: "smooth",
    });
  }, [activeId]);

  return (
    <div className="sticky top-0 z-30 -mx-6 mb-2 border-b border-black/5 bg-[#fbfbfd]/85 px-6 py-2.5 backdrop-blur">
      <div className="no-scrollbar flex gap-1.5 overflow-x-auto">
        {sections.map((s) => {
          const active = s.id === activeId;
          return (
            <button
              key={s.id}
              ref={active ? activeRef : undefined}
              onClick={() => onJump(s.id)}
              className={[
                "shrink-0 rounded-full px-4 py-2 font-mono text-xs uppercase tracking-wider transition",
                active
                  ? "bg-black text-white"
                  : "text-zinc-500 hover:bg-black/5 hover:text-black",
              ].join(" ")}
            >
              {s.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
