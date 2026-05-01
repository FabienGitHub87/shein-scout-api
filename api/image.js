export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { url } = req.query;
  if (!url) return res.status(400).end();
  try {
    const r = await fetch(decodeURIComponent(url), {
      headers: { 'Referer': 'https://www.shein.com', 'User-Agent': 'Mozilla/5.0' }
    });
    const buffer = await r.arrayBuffer();
    res.setHeader('Content-Type', r.headers.get('content-type') || 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(Buffer.from(buffer));
  } catch(e) { res.status(500).end(); }
}
