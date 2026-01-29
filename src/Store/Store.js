import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from './Slice'

export default configureStore({
    reducer:{
        meteo: weatherReducer
    }
})