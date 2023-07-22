// using IIFE
(() => {
    // add your openWeather API key
    const API_KEY = 'api_key';
    const baseAPI = `https://api.openweathermap.org/data/2.5/weather`
    /**----------------------------------------------------
    Utility functions
    -----------------------------------------------------*/
    const getBlobData = async (url) => {
        const response = await fetch(url)
        const imageBlob = await response.blob()
        return imageBlob
    }
    const getJsonData = async (url) => {
        try {
            console.info('getJsonData', url)
            const response = await fetch(url)
            console.info(response)
            const data = await response.json()
            return data
        } catch (err) {
            console.error(err)
        }
    }
    const displayWeatherInfo = async (latitude, longitude) => {
        console.log(latitude, longitude)
        console.info("Display weather info")
        const url = `${baseAPI}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
        console.info(url)
        console.info(`latitude:${latitude},longitude:${longitude}`)
        const data = await getJsonData(url)
        console.info(data)
       console.info(JSON.stringify(data))
        document.querySelector('#city').innerHTML = data.name
        document.querySelector('#lat').innerHTML = data.coord.lat
        document.querySelector('#lon').innerHTML = data.coord.lon
        document.querySelector('#temp').innerHTML = `${data.main.temp} °C`
        document.querySelector('#feels').innerHTML = `${data.main.feels_like} °C`
        document.querySelector('#min').innerHTML = `${data.main.temp_min} °C`
        document.querySelector('#max').innerHTML = `${data.main.temp_max} °C`
        document.querySelector('#description').innerHTML = data.weather[0].description

    }
    const getGeolocation = () => {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                //latitude = Number(parseFloat(position.coords.latitude)).toFixed(2)
                latitude = position.coords.latitude
                longitude = position.coords.longitude
                console.log(latitude, longitude)
                displayWeatherInfo(latitude, longitude)

            })

        }
        else {
            console.log("Geolocation is not supported by the browser")
        }

    }

    /**----------------------------------------------------
    Utility functions
    -----------------------------------------------------*/


    window.onload = () => {
        const btn = document.querySelector('#getInfo')
        btn.addEventListener('click',getGeolocation)

    }
})()
