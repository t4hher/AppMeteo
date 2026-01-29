import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function RightSide(){
    const  weather  = useSelector((state) => state.meteo.weather);
    const  isNightMode  = useSelector((state) => state.meteo.isNightMode);

    const isDay = weather.current.is_day
    const getWeatherStatus = (code) => {
        const status = {
          0: "Clear",
          1: "Clear",
          2: "Cloudy",
          3: "Overcast",
          45: "Fog",
          48: "Fog",
          51: "Drizzle",
          61: "Rainy",
          71: "Snowy",
          80: "Rainy",
          95: "Thunder",
        };
        return status[code] || "Cloudy"; 
    };
    const daily = weather.daily.time;
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => {
          setTime(new Date());
        }, 60000);
        return () => clearInterval(timer);
    }, []);
    
    const timeString = time.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });

    return <div className="rightSide">
            <div className="greating">Good {isDay? "Morning":"Night"}</div>
            <div className="time">{timeString}</div>
            <div className="miniWeather">
                <div className="summary">
                    <div className="temp">{weather.current.temperature_2m}°</div>
                    <div className="vertLine"></div>
                    <div className="others">
                        <div className="wind"><img src={`https://img.icons8.com/?size=100&id=NFarzlQfH1Dz&format=png&color=${isNightMode?"ffffff":"000000"}`}/> {weather?.current?.wind_speed_10m} km/h</div>
                        <div className="humidity"><img src={`https://img.icons8.com/?size=100&id=mS88fu3JtfrS&format=png&color=${isNightMode?"ffffff":"000000"}`}/> {weather?.current?.relative_humidity_2m}%</div>
                    </div>
                </div>
                <div className="status">{getWeatherStatus(weather.current.weather_code)}</div>
            </div>
            <div className="horiLine"></div>
            <div className="daily">
                <div className="heading">Daily Forcast</div>
                <div className="forcasts">
                    {
                        daily.map((date, index) => {
                            if (index === 0) return null;
                            const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
                          
                            return (
                                <div className="forcast" key={date}>
                                    <div className="day">{dayName}</div>
                                    <div className="temp">{weather.daily.temperature_2m_max[index]}°</div>
                                    <div className="status">{getWeatherStatus(weather.daily.weather_code[index])}</div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
}