(()=>{
    const API_KEY = '0687055c6d006425ba035d353a1c3159'
    const baseAPI = `https://api.openweathermap.org/data/2.5/weather`
    const getJsonData = async (url) => {
        console.info('getJsonData', url)
        const response = await fetch(url)
        console.info(response)
        const data = await response.json()
        return data
    }
    
    const displayWeatherInfo = async (latitude, longitude) => {
        console.log(latitude, longitude)
        console.info("Display weather info")
        const header = document.querySelector('#info')
        const url = `${baseAPI}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
        console.info(url)
        console.info(`latitude:${latitude},longitude:${longitude}`)
        const data = await getJsonData(url)
        header.innerHTML = JSON.stringify(data)

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
    getGeolocation()
    
})()