const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById("searchBtn");
const weather_img = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const wind_speed = document.getElementById("wind-speed");
const location_not_found = document.querySelector(".location-not-found");
const weather_body = document.querySelector(".weather-body");

const checkWeather = async (city) => {
    const api_key = "54ab5eb9350199622eaa60aba2b165ae";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    
    const weather_data = await fetch(`${url}`).then(res => res.json());

    location_not_found.style.display = "none";
    if(weather_data.cod === `404`){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        // console.log("error");
        return;
    }

    // console.log(weather_data);
    weather_body.style.display = "flex";
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}<sup>°C</sup>`;
    description.innerHTML = `${weather_data.weather[0].main}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/h`;

    switch (weather_data.weather[0].main) {
        case "Clouds":
            weather_img.src = "./assets/cloud.png";
            break;
        case "Clear":
            weather_img.src = "./assets/clear.png";
            break;
        case "Rain":
            weather_img.src = "./assets/rain.png";
            break;
        case "Mist":
            weather_img.src = "./assets/mist.png";
            break;
        case "Snow":
            weather_img.src = "./assets/snow.png";
            break;
    
        default:
            break;
    }
}

searchBtn.addEventListener('click',()=>{
    checkWeather(inputBox.value);
})