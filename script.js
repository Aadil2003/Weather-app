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
    card.appendChild(cityname);

    const temperature = document.createElement("p");
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    card.appendChild(temperature);

    const weatherdescription = document.createElement("p");
    weatherdescription.textContent = `Weather: ${data.weather[0].description}`;
    card.appendChild(weatherdescription);

    const weatheremoji = document.createElement("p");
    weatheremoji.textContent = getweatheremoji(data.weather[0].id);
    card.appendChild(weatheremoji);
}

function getweatheremoji(weatherid) {
    if (weatherid >= 200 && weatherid < 300) {
        return "⛈️"; // Thunderstorm
    } else if (weatherid >= 300 && weatherid < 600) {
        return "🌧️"; // Drizzle or Rain
    } else if (weatherid >= 600 && weatherid < 700) {
        return "❄️"; // Snow
    } else if (weatherid >= 700 && weatherid < 800) {
        return "🌫️"; // Atmosphere (fog, mist, etc.)
    } else if (weatherid === 800) {
        return "☀️"; // Clear sky
    } else if (weatherid > 800 && weatherid < 900) {
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
