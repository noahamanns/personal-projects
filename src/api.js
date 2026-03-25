export const getWeatherData = async (cityName) => {
    const response = await fetch(`/api/weather?city=${cityName}`);
    return response.json();
};