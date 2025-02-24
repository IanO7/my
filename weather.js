const apiKey = '43b3d53ce9c0ea7dfa7bc96cee0e1bf2';  // Replace with your actual API key
const latitude = localStorage.getItem("latitude");  // Get latitude from localStorage
const longitude = localStorage.getItem("longitude");  // Get longitude from localStorage
const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;  // Use lat and lon instead of cityId

fetch(url)
    .then(response => response.json())  // Convert the response to JSON
    .then(data => {
        // Extract the temperature and weather condition from the data
        const temperature = data.list[0].main.temp;  // First forecast item temperature
        const weatherCondition = data.list[0].weather[0].description;  // First forecast item weather condition

        // Useful other values if needed to use next time!
        const pressure = data.list[0].main.pressure;
        const feels_like = data.list[0].main.feels_like;
        const humidity = data.list[0].main.humidity;
        const precipitation = data.list[0].rain ? data.list[0].rain['3h'] : 0; // 3h is a common key for precipitation in 3 hours

        // Extract sunrise & sunset time
        const sunrise = new Date(data.city.sunrise * 1000); // Convert UNIX timestamp to Date
        const sunset = new Date(data.city.sunset * 1000);   // Convert UNIX timestamp to Date
        // Format to 24-hour time (e.g., 05:48)
        const sunriseTime = sunrise.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
        const sunsetTime = sunset.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

        // Update the text content (innerHTML) of the weather elements
        const temp = document.querySelector(".weather-info p");
        temp.innerHTML = temperature + " °C";
        const condition = document.querySelector(".weather-info h3");
        // Capitalise first letter when updating weather "Loading..."
        document.querySelector('.weather-info h3:nth-child(2)').innerHTML = weatherCondition.replace(/\b\w/g, char => char.toUpperCase());

        // Update the text content (innerHTML) of the sunrise and sunset span elements
        document.querySelector("#sunrise").innerHTML = sunriseTime.slice(0,2) + ":" + sunriseTime.slice(3,5);
        document.querySelector("#sunset").innerHTML = sunsetTime.slice(0,2) + ":" + sunsetTime.slice(3,5);

        // Update the text content (innerHTML) of the humidity & precipitation
        document.querySelector("#humidity").innerHTML = humidity + "%";
        document.querySelector("#precipitation").innerHTML = precipitation + "%";
    })
    .catch(error => console.error('Error:', error));  // Log any errors