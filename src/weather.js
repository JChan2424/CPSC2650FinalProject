import React, { useState, useEffect } from "react";

const Weather = (props) => {
    let [langaraWeather, setLangaraWeather] = useState();
    let [userWeather, setUserWeather] = useState();
    let url = `https://api.openweathermap.org/data/2.5/weather`;
    let config = require("../models/config/config");

    const testData = {
        coord: { lon: -123.1088, lat: 49.2245 },
        weather: [
            { id: 801, main: "Clouds", description: "few clouds", icon: "02d" },
        ],
        base: "stations",
        main: {
            temp: 26.44,
            feels_like: 26.44,
            temp_min: 20.57,
            temp_max: 29.68,
            pressure: 1018,
            humidity: 47,
        },
        visibility: 10000,
        wind: { speed: 4.12, deg: 230 },
        clouds: { all: 20 },
        dt: 1691193235,
        sys: {
            type: 2,
            id: 2011597,
            country: "CA",
            sunrise: 1691153308,
            sunset: 1691207313,
        },
        timezone: -25200,
        id: 6173331,
        name: "Vancouver",
        cod: 200,
    };

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                updateWeather(position);
            });
        }
    };

    const updateWeather = async (position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        let userURL =
            url +
            "?lat=" +
            lat +
            "&lon=" +
            lon +
            "&units=metric&appid=" +
            config.API_KEY;
        setUserWeather(testData.main.temp);
        // Uncomment the following to use API data
        /*
        userWeather = await fetch(userURL);
        userWeather = await userWeather.json();
        setUserWeather(userWeather.main.temp);
        */
    };

    const updateLangaraWeather = async () => {
        // Source: Google Maps
        let lat = 49.224513067167614;
        let lon = -123.10875555163102;
        let langaraURL =
            url +
            "?lat=" +
            lat +
            "&lon=" +
            lon +
            "&units=metric&appid=" +
            config.API_KEY;
        setLangaraWeather(testData.main.temp);
        // Uncomment the following to use API data
        /*
        langaraWeather = await fetch(langaraURL);
        langaraWeather = await langaraWeather.json();
        setLangaraWeather(langaraWeather.main.temp);
        */
    };
    useEffect(() => {
        updateLangaraWeather();
        getLocation();
    }, []);
    return (
        <>
            <div id="weather">
                {langaraWeather == null ? (
                    <p>Weather for Langara Not Found</p>
                ) : (
                    <p>
                        Weather for Langara:{" "}
                        <strong>&deg;{langaraWeather}</strong>
                    </p>
                )}
                {userWeather == null ? (
                    <p>Weather for Your Location Not Found</p>
                ) : (
                    <p>
                        Weather for Your Location:{" "}
                        <strong>&deg;{userWeather}</strong>
                    </p>
                )}
            </div>
        </>
    );
};
export default Weather;
