document.addEventListener('DOMContentLoaded', function () {
    const inputBox = document.querySelector('#input-box');
    const searchBtn = document.getElementById('searchBtn');
    const weather_img = document.querySelector('.weather-img');
    const temperature = document.querySelector('.temperature');
    const description = document.querySelector('.description');
    const humidity = document.getElementById('humidity');
    const wind_speed = document.getElementById('wind-speed');
    const location_not_found = document.querySelector('.location-not-found');
    const weather_body = document.querySelector('.weather-body');

    async function checkWeather(city, countryCode) {
        const api_key = `e8d087098facb7f99c865167a4da093d`;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${api_key}`;
        const weather_data = await fetch(url).then(response => response.json());
        if (weather_data.cod === '404') {
            location_not_found.style.display = "flex";
            weather_body.style.display = "none";
            console.log("error");
            return;
        }
        location_not_found.style.display = "none";
        weather_body.style.display = "flex";
        temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
        description.innerHTML = `${weather_data.weather[0].description}`;
        humidity.innerHTML = `${weather_data.main.humidity}%`;
        wind_speed.innerHTML = `${weather_data.wind.speed} Km/H`; // Changed from weather_data.wind.wind_speed

        switch (weather_data.weather[0].main) {
            case 'Cloud':
                weather_img.src = "https://img.freepik.com/premium-vector/cloud-with-sun-3d-realistic-weather-icon-isolated-vector-illustration-realistic-3d-icon-design-mobile-app-website_558965-127.jpg?w=1060";
                break;

            case 'Clear':
                weather_img.src = "https://clipartix.com/wp-content/uploads/2016/05/Clip-art-weather-on-clip-art-graphics-and-winter-sport.jpg";
                break;

            case 'Rain':
                weather_img.src = "https://th.bing.com/th/id/OIP.cJBRyBJmrATjnEv4qCFIuAHaHa?rs=1&pid=ImgDetMain";
                break;

            case 'Mist':
                weather_img.src = "https://wallpaperaccess.com/full/2571125.jpg";
                break;

            case 'Snow':
                weather_img.src = "https://thumbs.dreamstime.com/b/d-rendering-snowfall-icon-render-snow-cloud-snowy-weather-268223336.jpg";
                break;
        }
        console.log(weather_data);
    }

    searchBtn.addEventListener('click', () => {
        console.log(inputBox.value)
        checkWeather(inputBox.value);
    });
});
