import { useEffect } from "react";
import Box, { setDarkMode, setLightMode } from "./Box";
import { getWeather } from "../Store/Slice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch=useDispatch();
  const cityCoords=useSelector((state)=>state.meteo.citiesCoords);
  const selectedCity=useSelector((state)=>state.meteo.city);
  const weather=useSelector((state)=>state.meteo.weather);
  const selectedCoords = cityCoords[selectedCity];

  useEffect(() => {
    dispatch(getWeather(selectedCoords));
    const interval = setInterval(() => dispatch(getWeather(selectedCoords)), 1200000);
    return () => clearInterval(interval);
  }, [dispatch,selectedCity, selectedCoords]);

  if(weather==null || !weather.current){return <Box><div className="loading">Loading . . .</div></Box>}

  const isDay=weather.current.is_day===1;

  return (
    <Box isDay={isDay}>{isDay?setLightMode():setDarkMode()}</Box>
  );
}



export default App;
