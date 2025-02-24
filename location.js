// Gets latitude & longitude => Saves as local variable to access across JS files
document.addEventListener("DOMContentLoaded", function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    }

    function success(position) {
        localStorage.setItem("latitude", position.coords.latitude);
        localStorage.setItem("longitude", position.coords.longitude);
    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }
});

// Function to retrieve saved coordinates
function getSavedLocation() {
    return {
        latitude: localStorage.getItem("latitude"),
        longitude: localStorage.getItem("longitude")
    };
}