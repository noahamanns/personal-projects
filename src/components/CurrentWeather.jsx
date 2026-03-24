
import { format, parse } from 'date-fns';
import './CurrentWeather.css';

const getDayAndHHMM = (rawdate) => {
    console.log(rawdate)
    const date = parse(rawdate, 'yyyy-MM-dd HH:mm', new Date());
    console.log(date)
    return format(date, 'EEEE, MMM d, h:mm a');
}

const CurrentWeather = ({data,location}) => {
    const forecastDayEntries = data?.forecast?.forecastday?.slice(0, 3) ?? [];
    const { localtime, name, region } = location;
    const {temp_f, condition, feelslike_f} = data.current;

    const dayLabels = ['Today', 'Tomorrow', 'Day after'];
    return (
        <div className="current-weather">
            <div className="location-header">
                <h2>{name}</h2>
                <p className="region-line">{region}, {name}</p>
            </div>

        <div className="forecast-cards">
            {forecastDayEntries.map((forecastDayEntry, dayIndex) => {
                const dailyWeather = forecastDayEntry.day;

            return (
                <div key={forecastDayEntry.date} className="forecast-card">
                    <h3>{dayLabels [dayIndex]}</h3>
                    <p className="current-temp">
                    {dayIndex === 0
                        ? `${Math.round(temp_f)}°`
                        : `${Math.round(dailyWeather.avgtemp_f)}°`}</p>
                    {dayIndex === 0 && (
                        <p className="feels-like">Feels like {feelslike_f}°</p>
                    )}
                    <p className="hi-lo">
                        {Math.round(dailyWeather.maxtemp_f)}° / {Math.round(dailyWeather.mintemp_f)}°</p>
                    <p className="local-time">
                        {dayIndex === 0
                            ? getDayAndHHMM(localtime)
                            : format(new Date(forecastDayEntry.date + 'T00:00:00'), 'EEEE, MMM d')}</p>
                        <div className="condition">
                            <img
                                src={dayIndex === 0 ? condition.icon : dailyWeather.condition.icon}
                                alt={dayIndex === 0 ? condition.text : dailyWeather.condition.text}
                            />
                            <p className="condition-text">
                                {dayIndex === 0 ? condition.text : dailyWeather.condition.text}
                            </p>
                        </div>
                </div>
            );
            })}
        </div>
        </div>
        );
};


export default CurrentWeather;