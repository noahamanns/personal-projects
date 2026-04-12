import { useState, useEffect } from 'react';
import './App.css';
import { getWeatherData } from './api';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import { parse } from 'date-fns';



const getGradientClass = (hour) => {
  if (hour >= 6 && hour < 9) return 'bg-sunrise';
  if (hour >= 9 && hour < 17) return 'bg-sunset';
  if (hour >= 17 && hour < 20) return 'bg-sunset';
  return 'bg-night';
};

function App() {
const [city, setCity] = useState('Seattle')
const [weatherData, setWeatherData] = useState(null)
const [loading, setLoading] = useState(false)
const [error, setError] = useState('');

const hour = weatherData?.location?.localtime
? parse(
    weatherData.location.localtime,
    'yyyy-MM-dd HH:mm',
    new Date()) .getHours()
 : new Date().getHours();


const gradientClass = getGradientClass(hour);


useEffect (() => {
  const fetchWeather = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getWeatherData(city);

      const { mintemp_f, maxtemp_f } = data.forecast.forecastday[0].day

      setWeatherData({
        current: {...data.current, mintemp_f, maxtemp_f},
        hourly: data.forecast.forecastday[0].hour,
        location: data.location,
        forecast: data.forecast
      })
      console.log(data);
    } catch (e) {
      setError(`Error: ${e.message}`)
    } finally {
      setLoading(false);
    }
  };

  fetchWeather();
}, [city]);


return (
  <div className={`app ${gradientClass}`}>
    <div className="container">
      <SearchBar onSearch={setCity} />
      {loading && <p> Loading. . .</p>}
      {error && <p>{error}</p>}
      {weatherData && (
        <>
        <CurrentWeather 
          data={weatherData} 
          location={weatherData.location} 
          />
        <HourlyForecast data={weatherData.hourly} />
        </>
      )}
    </div>
  </div>
  );
}

export default App;