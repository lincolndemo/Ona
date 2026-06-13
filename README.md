# Ona

**Find your path. Build your future.**

Ona is a career decision tool. A person answers a short assessment and Ona
returns one recommended technology career, the reasoning behind it, an honest
reality check, a skills-gap readout, and one concrete next step.

The recommendation is delivered before any request to register. The matching
engine runs entirely client-side and is **deterministic** — the same answers
always produce the same result.

## Stack

- React + Vite + TypeScript
- Tailwind CSS (v4, via the `@tailwindcss/vite` plugin)
- No backend. Career content and questions live in typed data files.

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check (tsc -b) and build for production
npm run preview  # preview the production build
```

## How it works

The flow is one linear journey: landing → six-section assessment → deterministic
match → recommendation → skills gap → next step → optional email capture.

```
src/
  data/        # content & tuning — edit without touching logic
    types.ts       shared domain types
    questions.ts   the six assessment sections (14 questions)
    careers.ts     the career library (12 careers + reality checks)
    weights.ts     scoring weights and mapping tables
  engine/      # pure, testable matching logic
    profile.ts     the six sub-scores (each 0–1)
    match.ts       weighted total, ranking, top match
    reasoning.ts   builds the reasoning paragraph from top contributors
    gap.ts         skills gap + honest time estimate
  components/  # presentational React components
  storage.ts   # localStorage helpers (resume-on-refresh, local lead storage)
  App.tsx      # flow controller
```

### Editing content

All career profiles, reality checks, next steps, and assessment questions live
in `src/data`. Adjust `careers.ts` to add or edit careers and `weights.ts` to
tune the scoring — no engine changes needed.

> **Before launch:** salary figures in `careers.ts` are placeholders in Nigerian
> Naira marked `// VERIFY`. Confirm them against current local data.

### Email capture

Optional and never blocks the result. On submit, Ona POSTs
`{ email, careerId, timestamp }` to `VITE_LEAD_ENDPOINT` if set; otherwise the
lead is stored in `localStorage`. See `.env.example`.

### Smoke test

`scripts/smoke.ts` runs the engine against sample profiles to confirm
determinism and sane matches. It is a dev aid, not part of the build.
