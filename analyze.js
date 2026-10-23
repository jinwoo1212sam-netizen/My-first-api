const { analyzeSequence } = require("../lib/dragonx");

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", process.env.ALLOWED_ORIGIN || "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Use POST" });

  // Optional shared bearer token. Set API_TOKEN in Vercel environment variables.
  if (process.env.API_TOKEN) {
    const auth = req.headers.authorization || "";
    if (auth !== `Bearer ${process.env.API_TOKEN}`) {
      return res.status(401).json({ error: "Unauthorized" });
    }
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
    if (!Array.isArray(body.sequence)) {
      return res.status(400).json({ error: "Body must include sequence: []" });
    }
    if (body.sequence.length < 1) {
      return res.status(400).json({ error: "sequence cannot be empty" });
    }
    const result = analyzeSequence(body.sequence, {
      periods: body.periods,
      allowedSymbols: body.allowedSymbols
    });
    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({ error: err.message || "Invalid request" });
  }
};
