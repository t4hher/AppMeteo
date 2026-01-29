import { useDispatch, useSelector } from "react-redux"
import { changeCity } from "../Store/Slice";

export default function LeftSide(){
    const dispatch= useDispatch();
    const  weather  = useSelector((state) => state.meteo.weather);
    const  isNightMode  = useSelector((state) => state.meteo.isNightMode);

    const [date,time] = weather.current.time.split("T");
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
    const hourly = weather.hourly.time;

    const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });

    const now = new Date();
    const currentHour = now.getHours() + ":00";
    const hourlyStartIndex= weather.hourly.time.findIndex(t=>t.includes(currentHour));

    return <div className="leftSide">
    <div className="header">
        <div className="city">
            <select className="styled-select" onChange={(e)=>dispatch(changeCity(e.target.value))}>
                <option value="Fes">Fes</option>
                <option value="Casablanca">Casablanca</option>
                <option value="Rabat">Rabat</option>
                <option value="Tangier">Tangier</option>
                <option value="Agadir">Agadir</option>
                <option value="Meknes">Meknes</option>
                <option value="Oujda">Oujda</option>
                <option value="Marrakech">Marrakech</option>
            </select>
        </div>
        <div className="day">{dayName}</div>
        <div className="date">{date}</div>
    </div>
    <div className="weather">
        <div className="general">
            <div className="temp">{weather.current.temperature_2m}°</div>
            
        </div>
        <div className="others">
            <div className="wind"><img src={`https://img.icons8.com/?size=100&id=NFarzlQfH1Dz&format=png&color=${isNightMode?"ffffff":"000000"}`}/> {weather.current.wind_speed_10m}km/h</div>
            <div className="humidity"><img src={`https://img.icons8.com/?size=100&id=mS88fu3JtfrS&format=png&color=${isNightMode?"ffffff":"000000"}`}/> {weather.current.relative_humidity_2m}%</div>
        </div>
    </div>
    <div className="status">{getWeatherStatus(weather.current.weather_code)}</div>
    <div className="horiLine"></div>
    <div className="heading">Hourly Forcasts</div>
    <div className="hourly">
        {

            hourly.slice(hourlyStartIndex,hourlyStartIndex+25).map((time, index) => {
                if (index === 0) return null;
                const [date,hour] = time.split("T");
                return (
                    <div className="hour">
                        <div className="day">{hour}</div>
                        <div className="temp">{weather.hourly.temperature_2m[index+hourlyStartIndex]}°</div>
                        <div className="status">{getWeatherStatus(weather.hourly.weather_code[index+hourlyStartIndex])}</div>
                    </div> 
                );
            })
        }
    </div>
</div>
}