
import React, { useState,useEffect } from "react";

const Weather = props => {
    let langaraWeather = null;
    let userWeather = null;
    let url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&units=metric&appid=${APIKey}`
    let APIKey = null; // change once API key obtained
    const getLocation = () => { 
        if(navigator.geolocation) {
            return navigator.geolocation.getCurrentPosition(updateWeather);
        }
    }

    const updateWeather = async (position) => {
        let lat = position.latitude;
        let lon = position.longitude;
        userWeather = await fetch(url);
        userWeather = await userWeather.json().current.temp;
        console.log(userWeather)
    };

    const updateLangaraWeather = async () => {
        // Source: Google Maps
        let lat = 49.224513067167614;
        let lon = -123.10875555163102;
        langaraWeather = await fetch(url);
        langaraWeather = await langaraWeather.json().current.temp;
    }
    return (
        <>
            <div id="weather">
                {langaraWeather == null ? <p>Weather for Langara Not Found</p> : <p>Weather for Langara: <strong>{langaraWeather}</strong></p>}
                {userWeather == null ? <p>Weather for Your Location Not Found</p> : <p>Weather for Your Location: <strong>{userWeather}</strong></p>}
            </div>
        </>
    );
}
export default Weather;