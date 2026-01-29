import { useDispatch, useSelector } from "react-redux";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import { getWeather, swichtheme } from "../Store/Slice";


export function setDarkMode(){
    document.querySelector("body").setAttribute("data-theme","dark");
  };
export function setLightMode(){
    document.querySelector("body").setAttribute("data-theme","light");
  };
  

export default function Box(){
    const { weather, city, error, loading, isNightMode }=useSelector((state)=>state.meteo);
    function themeToggle(e){
      if(e.target.checked) setDarkMode();else setLightMode();
      dispatch(swichtheme());
    }

    const dispatch=useDispatch()

    return <div className="app">
    <div className="themetoggle">
    <label style={{ cursor: 'pointer' }}>
      <input type="checkbox" onChange={themeToggle} checked={!isNightMode}/>
      <div className="check">
        <img src={`https://img.icons8.com/?size=100&id=9313&format=png&color=7f7f7f`} id="sun"/>
        <img src={`https://img.icons8.com/?size=100&id=bv1XgSVyIgCb&format=png&color=7f7f7f`} id="moon"/>
      </div>
    </label>
    </div>
        {loading===true && <div className="loading">Chargement . . .</div>}
        {weather!==null && <div className="box"><LeftSide/><RightSide/></div>}
        {error && <p >{error}</p>}
  </div>
}