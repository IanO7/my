document.addEventListener("DOMContentLoaded", function() {
    const apiKey = "43b3d53ce9c0ea7dfa7bc96cee0e1bf2";  // Replace with a secured API key
    const latitude = localStorage.getItem("latitude"); // Latitude
    const longitude = localStorage.getItem("longitude");; // Longitude
    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    // Fetch Air Quality Data
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const aqi = data.list[0].main.aqi; // AQI level (1-5)
            
            // Useful other values if needed to use next time!
            const ozone = data.list[0].components.o3;
            const carbon_monoxide = data.list[0].components.co;
            const particles = data.list[0].components.pm10;

            let aqiText = "";
            let aqiColor = "";
            let aqiWidth = 0;

            // Assign text, color, and progress bar width based on AQI value
            if (aqi === 1) {
                aqiText = "Good";
                aqiColor = "green";
                aqiWidth = 100; // 20% width for AQI 1
            } else if (aqi === 2) {
                aqiText = "Fair";
                aqiColor = "yellow";
                aqiWidth = 80; // 40% width for AQI 2
            } else if (aqi === 3) {
                aqiText = "Moderate";
                aqiColor = "orange";
                aqiWidth = 60; // 60% width for AQI 3
            } else if (aqi === 4) {
                aqiText = "Poor";
                aqiColor = "red";
                aqiWidth = 40; // 80% width for AQI 4
            } else if (aqi === 5) {
                aqiText = "Very Unhealthy";
                aqiColor = "purple";
                aqiWidth = 20; // 100% width for AQI 5
            }

            // Update AQI Display (text and color) straightaway, defines CSS here in terms of bar colour
            document.querySelector("#aqi-status").innerHTML = aqiText;
            document.querySelector("#aqi-status").style.color = aqiColor;

            // Update AQI Progress Bar Width and Color, defines CSS here in terms of bar colour
            const aqiProgressBar = document.querySelector("#aqi-progress");
            aqiProgressBar.style.width = aqiWidth + "%"; // Set width based on AQI level
            aqiProgressBar.style.backgroundColor = aqiColor; // Set background color based on AQI level
        })
        .catch(error => console.error("Error fetching AQI:", error));
});
