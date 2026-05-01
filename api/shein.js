export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const { endpoint, ...params } = req.query;
  const qs = new URLSearchParams({...params, countryCode: 'FR'}).toString();
  const url = `https://shein-data-api.p.rapidapi.com/${endpoint}?${qs}`;

  try {
    const r = await fetch(url, {
      headers: {
        'x-rapidapi-host': 'shein-data-api.p.rapidapi.com',
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'Content-Type': 'application/json'
      }
    });
    const data = await r.json();
    res.status(200).json(data);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
