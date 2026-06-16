// Vercel serverless function: a platform-wide "assessments taken" counter.
//   GET  /api/assessments  -> { count }   (read the total)
//   POST /api/assessments  -> { count }   (increment, called on completion)
//
// Backed by Upstash Redis via its REST API. Set these env vars in Vercel
// (the Vercel → Storage → Upstash integration adds them automatically):
//   UPSTASH_REDIS_REST_URL
//   UPSTASH_REDIS_REST_TOKEN
// Until they're set, the endpoint returns { count: null } and the app no-ops.

// Works with either the Upstash integration (UPSTASH_*) or Vercel KV (KV_*) —
// both expose the same Upstash REST API.
const REDIS_URL =
  process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const REDIS_TOKEN =
  process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
const KEY = "ona:assessments";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (!REDIS_URL || !REDIS_TOKEN) {
    return res.status(200).json({ count: null, configured: false });
  }

  try {
    const command = req.method === "POST" ? `incr/${KEY}` : `get/${KEY}`;
    const response = await fetch(`${REDIS_URL}/${command}`, {
      headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
    });
    const data = await response.json(); // { result: number | string | null }
    const count = data.result == null ? 0 : Number(data.result);
    return res.status(200).json({ count });
  } catch {
    return res.status(200).json({ count: null });
  }
}
