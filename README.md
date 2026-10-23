# DRAGON-X 120 Pattern API

Vercel-ready JavaScript API for **historical sequence analysis**. Includes more than 120 descriptive detectors covering frequency, streaks, Markov transitions, zigzag/alternation, repeating motifs, rolling windows, and data-quality checks.

It intentionally does not output future WinGo picks or betting recommendations. Historical pattern frequency is not proof that a random future outcome can be predicted.

## Deploy to Vercel

1. Upload this folder to a GitHub repository.
2. Import the repository in Vercel.
3. Framework preset: Other. Use Node.js 18+.
4. Optional environment variables:
   - `API_TOKEN`: if set, `/api/analyze` requires `Authorization: Bearer YOUR_TOKEN`.
   - `ALLOWED_ORIGIN`: restrict browser CORS to your frontend origin, e.g. `https://your-site.example`.
5. Deploy. No Firebase Admin key or private credential belongs in frontend HTML.

## Endpoints

- `GET /api/patterns` — catalog of all detectors.
- `POST /api/analyze` — analyze a historical sequence.

## Request example

```json
{
  "sequence": ["BIG", "SMALL", "BIG", "SMALL", "RED", "RED", "GREEN"],
  "periods": ["1001", "1002", "1003", "1004", "1005", "1006", "1007"],
  "allowedSymbols": ["BIG", "SMALL", "RED", "GREEN"]
}
```

`sequence` must be an array of 1–2000 strings or numbers, in chronological order (oldest first). `periods` is optional and should align item-for-item with `sequence`.

## Response

The API returns engine/version metadata, observation count, pattern count, and an array of named results. Some results may be `null` when the input is too short or the pattern is not applicable.

## Local test

Requires Node.js 18+:

```bash
npm test
npm start
```

Then POST JSON to `http://localhost:3000/api/analyze`.

## Notes

- These are descriptive historical metrics, not guaranteed predictions.
- Do not use browser-only checks to protect privileged data.
- For paid tool access, add server-side user authentication and verified payment-provider webhooks separately.
- For production, set `ALLOWED_ORIGIN`, add rate limiting, request-size limits, and logs that do not expose secrets.
