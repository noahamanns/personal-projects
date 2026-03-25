export default async function handler(req, res) {
    const { city } = req.query;
    const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${encodeURIComponent(city)}&days=7`
    );
    const data = await response.json();
    res.status(200).json(data);
}