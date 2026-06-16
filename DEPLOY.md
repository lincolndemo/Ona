# Deploying Ona + installing it on iOS (free, no $99)

Ona is a Progressive Web App (PWA). Once it's hosted over HTTPS, anyone can
install it to their iPhone (or Android) home screen straight from the link — no
App Store, no Apple Developer fee.

## 1. Deploy to Vercel (free)

**Option A — connect the GitHub repo (recommended, auto-deploys on every push):**

1. Go to <https://vercel.com/new>.
2. **Import** the `lincolndemo/Ona` repository.
3. Vercel auto-detects **Vite**. Leave the defaults:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Click **Deploy**. In ~1 minute you get a URL like `https://ona-xxxx.vercel.app`.

Every future `git push` to `master` redeploys automatically.

**Option B — Vercel CLI:**

```bash
npm i -g vercel
vercel            # first run: link/create the project, then deploys a preview
vercel --prod     # deploy to production
```

## 2. Install on an iPhone

1. Open the Vercel URL in **Safari** (must be Safari, not Chrome, on iOS).
2. Tap the **Share** button (the square with an arrow).
3. Tap **Add to Home Screen** → **Add**.
4. Ona now has its own icon and opens **fullscreen**, like a native app — and
   works offline after the first open.

> Tip: open it from the home-screen icon (not Safari) to get the standalone,
> no-browser-chrome experience.

## 3. Updates

After a new deploy, the app updates itself the next time it's opened online (the
service worker fetches the new version). To force it, close and reopen the app.

## Counting assessments (optional)

Ona can count how many assessments have been generated platform-wide via a tiny
serverless function (`api/assessments.js`) backed by a free Upstash Redis store.

1. In your Vercel project: **Storage → Create Database → Upstash Redis** (free
   tier). Vercel automatically adds `UPSTASH_REDIS_REST_URL` and
   `UPSTASH_REDIS_REST_TOKEN` to the project's environment.
2. **Redeploy.**
3. Read the live total any time:
   - Visit `https://your-app.vercel.app/api/assessments` → `{ "count": 123 }`, or
   - Open the Upstash dashboard and look at the `ona:assessments` key.
4. Once the count passes 25, it also shows quietly on the landing page as social
   proof (tune the threshold in `src/components/Landing.tsx`).

Until Upstash is configured the endpoint returns `{ "count": null }` and the app
behaves exactly as before — nothing breaks. The counter increments once per
completed assessment (not on shared-link visits or refreshes), and stores **no
personal data** — just a number.

> Want the *email-update* addresses too? Set `VITE_LEAD_ENDPOINT` (see
> `.env.example`) to a form endpoint (Formspree/Web3Forms) or another serverless
> function — otherwise those emails only live in each visitor's own browser.

## What this is and isn't

- ✅ Free, installable, offline-capable, shareable by link, instant updates.
- ✅ Works on iOS and Android.
- ❌ Not in the Apple App Store — that requires the $99/yr Apple Developer
  Program. A PWA is the standard free alternative for a web app like Ona.
