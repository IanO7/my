const apiKey = '43b3d53ce9c0ea7dfa7bc96cee0e1bf2';  // Replace with your actual API key
const latitude = localStorage.getItem("latitude");  // Get latitude from localStorage
const longitude = localStorage.getItem("longitude");  // Get longitude from localStorage
const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,daily&appid=${apiKey}`;  // Use lat and lon instead of cityId

fetch(url)
    .then(response => response.json())  // Convert the response to JSON
    .then(data => {
        // Check if there are alerts
        if (data.alerts && data.alerts.length > 0) {
            const alert = data.alerts[0]; // Get the first alert
            const alertTitle = alert.event;
            const alertDescription = alert.description;
            const alertStart = new Date(alert.start * 1000).toLocaleTimeString(); // Convert UNIX timestamp to readable time
            const alertEnd = new Date(alert.end * 1000).toLocaleTimeString();

            // Update the emergency alert section with the alert details
            document.querySelector("#alert-text").innerHTML = `
                <strong>${alertTitle}</strong><br>
                ${alertDescription}<br>
                <em>Start: ${alertStart} | End: ${alertEnd}</em>
            `;
        } else {
            document.querySelector("#alert-text").innerHTML = "No current emergency alerts.";
        }
    })
    .catch(error => console.error('Error:', error));  // Log any errors
