export const getWeatherData = async (cityName) => {
    console.log('Fetching weather for:', cityName);

    const response = await fetch(
        `http://localhost:5000/api/weather?city=${cityName}`
    );
    return response.json();
};