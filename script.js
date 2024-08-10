const weatherform = document.querySelector(".weatherform");
const cityinput = document.querySelector(".cityinput");
const card = document.querySelector(".card");
const apikey = "b742a55352fa07651dbe5008582e3157";

weatherform.addEventListener("submit", (event) => {
    event.preventDefault();
    const city = cityinput.value;
    if (city) {
        getweatherdata(city);
    } else {
        displayerror("Please enter a city");
    }
});

async function getweatherdata(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`);
        if (!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();
        displayweatherinfo(data);
    } catch (error) {
        displayerror(error.message);
    }
}

function displayweatherinfo(data) {
    card.textContent = "";  // Clear previous content
    card.style.display = "flex";

    const cityname = document.createElement("h2");
    cityname.textContent = `${data.name}, ${data.sys.country}`;
    cityname.classList.add("citydisplay"); // Added class
    card.appendChild(cityname);

    const temperature = document.createElement("p");
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    temperature.classList.add("tempdisplay"); // Added class
    card.appendChild(temperature);

    const humidity = document.createElement("p");
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    humidity.classList.add("humiditydisplay"); // Added class
    card.appendChild(humidity);

    const weatherdescription = document.createElement("p");
    weatherdescription.textContent = `Weather: ${data.weather[0].description}`;
    weatherdescription.classList.add("descdisplay"); // Added class
    card.appendChild(weatherdescription);

    const weatheremoji = document.createElement("p");
    weatheremoji.textContent = getweatheremoji(data.weather[0].id);
    weatheremoji.classList.add("emojidisplay"); // Added class
    card.appendChild(weatheremoji);
}const backgrounds = {
    thunderstorm: 'linear-gradient(180deg, #2c3e50, #34495e)', /* Dark blue-gray to gray */
    drizzle: 'linear-gradient(180deg, #aabbd5, #dde6f1)', /* Light grayish blue to very light blue */
    snow: 'linear-gradient(180deg, #f8f9fa, #e0e4e7)', /* Very light gray to slightly darker gray */
    fog: 'linear-gradient(180deg, #b0b0b0, #dcdcdc)', /* Light gray to off-white */
    clearSky: 'linear-gradient(180deg, #87CEEB, #B0E0E6)', /* Sky blue to light blue */
    cloudy: 'linear-gradient(180deg, #d0d0d0, #e0e0e0)' /* Light gray to lighter gray */
};

function getweatheremoji(weatherid) {
    const card = document.querySelector(".card"); // Ensure card is selected

    if (weatherid >= 200 && weatherid < 300) {
        card.style.background = backgrounds.thunderstorm;
        return "⛈️"; // Thunderstorm
    } else if (weatherid >= 300 && weatherid < 600) {
        card.style.background = backgrounds.drizzle;
        return "🌧️"; // Drizzle or Rain
    } else if (weatherid >= 600 && weatherid < 700) {
        card.style.background = backgrounds.snow;
        return "❄️"; // Snow
    } else if (weatherid >= 700 && weatherid < 800) {
        card.style.background = backgrounds.fog;
        return "🌫️"; // Atmosphere (fog, mist, etc.)
    } else if (weatherid === 800) {
        card.style.background = backgrounds.clearSky;
        return "☀️"; // Clear sky
    } else if (weatherid > 800 && weatherid < 900) {
        card.style.background = backgrounds.cloudy;
        return "☁️"; // Clouds
    } else {
        return "❓"; // Unknown weather
    }
}


function displayerror(message) {
    const errordisplay = document.createElement("p");
    errordisplay.textContent = message;
    errordisplay.classList.add("errordisplay");
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errordisplay);
}
