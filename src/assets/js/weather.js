function weather() {
    const apiKey = '6f616f10417b8edef8f24cb8cf693897';
    const apiBase = 'https://api.openweathermap.org/data/2.5/weather';

    const getWeatherData = city => {
        const url = `${apiBase}?q=${city}&units=metric&appid=${apiKey}&&lang=DE`;
        fetch(url)
            .then(response => response.json())
            .then(data => updateUI(data))
    }

    const inputCityField = document.getElementById('city');
    inputCityField.addEventListener('change', () => {
        const inputCity = document.getElementById('city').value;
        getWeatherData(inputCity)
    })

    const updateUI = data => {
        console.log(data)
        document.getElementById('city').placeholder = data.name || "Unknown Location!";
        document.getElementById('city').ariaLabel = data.name || "Unknown Location!";
        document.getElementById('show_temperature').innerText = Math.round(data.main.temp);
        document.getElementById('show_temperature').ariaLabel = Math.round(data.main.temp) + " Grad Celsius";
        document.getElementById('weather_status').innerText = data.weather[0].description;
        document.getElementById('weather_status').ariaLabel = data.weather[0].description;
        document.getElementById('icon').setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
        document.getElementById('city').value = "";
    }

    if (navigator.geolocation) {
        // if geolocation supported, call function
        console.log("get browser location weather data")
        navigator.geolocation.getCurrentPosition(success);
    } else {
        // if not geolocation supported, get weather from Hamburg
        console.log("get default weather data")
        getWeatherData('Hamburg');
    }

    navigator.geolocation.watchPosition(function (position) {
        console.log("get browser location weather data")
        navigator.geolocation.getCurrentPosition(success);
    },
        function (error) {
            if (error.code == error.PERMISSION_DENIED)
                console.log("get default weather data")
            getWeatherData('Hamburg');
        });

    // function to get lat/long and plot on a google map
    function success(position) {
        var latitude = position.coords.latitude;						// set latitude variable
        var longitude = position.coords.longitude;						// set longitude variable

        getWeatherGeoData(latitude, longitude);							// get weather for the lat/long
    }


    // function to get weather for an address    
    // write temporary response while we get the weather

    const getWeatherGeoData = (latitude, longitude) => {
        const geourl = `${apiBase}?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}&&lang=DE`;
        fetch(geourl)
            .then(response => response.json())
            .then(data => updateGEOUI(data))
    }
    const updateGEOUI = data => {
        console.log(data)
        document.getElementById('city').placeholder = data.name || "Unknown Location!";
        document.getElementById('city').ariaLabel = data.name || "Unknown Location!";
        document.getElementById('show_temperature').innerText = Math.round(data.main.temp);
        document.getElementById('show_temperature').ariaLabel = Math.round(data.main.temp) + " Grad Celsius";
        document.getElementById('weather_status').innerText = data.weather[0].description;
        document.getElementById('weather_status').ariaLabel = data.weather[0].description;
        document.getElementById('icon').setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    }

}