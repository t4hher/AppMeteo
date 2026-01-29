import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const getWeather = createAsyncThunk("wether/getWeather", async (coords) =>{
    const{lat,lon}=coords;
    return axios
    .get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=temperature_2m,relative_humidity_2m,wind_speed_10m,is_day,weather_code&timezone=auto`)
    .then((response) => response.data);
});

export const weatherSlice = createSlice({
    name: "weather",
    initialState:{
        citiesCoords:{
            "Fes": { lat: 34.0331, lon: -5.0003 },
            "Casablanca": { lat: 33.5731, lon: -7.5898 },
            "Marrakech": { lat: 31.6295, lon: -7.9811},
            "Agadir": { lat: 30.4278, lon: -9.5981},
            "Oujda": { lat: 34.6805, lon: -1.9076},
            "Meknes": { lat: 33.8935, lon: -5.5473},
            "Rabat": { lat: 34.0209, lon: -6.8416 },
            "Tangier": { lat: 35.7595, lon: -5.8340 }
        },
        weather: null,
        city:"Fes",
        error:null,
        loading: false,
        isNightMode:false,
    },
    reducers: {
        changeCity: (state, action)=>{
            state.city=action.payload;
        },
        swichtheme: (state)=>{
            state.isNightMode=!state.isNightMode;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getWeather.pending, (state, action) => {
                state.loading=true;
            })
            .addCase(getWeather.fulfilled, (state, action) => {
                state.loading=false;
                state.weather=action.payload;
            })
            .addCase(getWeather.rejected, (state, action) => {
                state.loading=false;
                state.error="Error";
            })
    }
});
export default weatherSlice.reducer;
export const { changeCity, swichtheme } = weatherSlice.actions;
export { getWeather };