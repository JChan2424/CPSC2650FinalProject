import React, { useState,useEffect } from "react";

const Weather = props => {
    let langaraWeather = null;
    let userWeather = null;
    let url = `https://api.openweathermap.org/data/3.0/onecall?`
    let urlParams = '&exclude=minutely,hourly,daily,alerts&units=metric&appid='
    // lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&units=metric&appid=${APIKey}`
    let APIKey = '4dd47ed21e20bd1fa1893e2502ce3ef0';
    
    const testData =                 
    {
       "lat":33.44,
       "lon":-94.04,
       "timezone":"America/Chicago",
       "timezone_offset":-18000,
       "current":{
          "dt":1684929490,
          "sunrise":1684926645,
          "sunset":1684977332,
          "temp":292.55,
          "feels_like":292.87,
          "pressure":1014,
          "humidity":89,
          "dew_point":290.69,
          "uvi":0.16,
          "clouds":53,
          "visibility":10000,
          "wind_speed":3.13,
          "wind_deg":93,
          "wind_gust":6.71,
          "weather":[
             {
                "id":803,
                "main":"Clouds",
                "description":"broken clouds",
                "icon":"04d"
             }
          ]
       }
    }
    const suspendedTestData = { "cod": 429,
    "message": "Your account is temporary blocked due to exceeding of requests limitation of your subscription type. Please choose the proper subscription http://openweathermap.org/price"
    }
    langaraWeather = testData    
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
        let langaraURL = url + 'lat=' + lat + '&lon=' + lon + '&appid=' + APIKey
        console.log(langaraURL)
        // langaraWeather = await fetch(url);
        // langaraWeather = await langaraWeather.json().current.temp;
    }
    useEffect(() => {
        updateLangaraWeather();
        getLocation();
    }, [])
    return (
        <>
            <div id="weather">
                {langaraWeather == null ? <p>Weather for Langara Not Found</p> : <p>Weather for Langara: <strong>{langaraWeather.current.temp}</strong></p>}
                {userWeather == null ? <p>Weather for Your Location Not Found</p> : <p>Weather for Your Location: <strong>{userWeather.currrent.temp}</strong></p>}
            </div>
        </>
    );
}
export default Weather;