// Get references to buttons, message area, and body element
const sosButton = document.getElementById("sos-button");
const endButton = document.getElementById("end-button");
const sosMessage = document.getElementById("sos-message");
const body = document.body;

// Create an audio object for the alarm sound
const alarmSound = new Audio('sos.mp3');
alarmSound.loop = true; // Make the alarm sound loop

// Create a BroadcastChannel for communication between tabs
const channel = new BroadcastChannel("sos_alert_channel");

// Flag to prevent multiple stop actions
let isStoppingSOS = false;

// Function to activate SOS
sosButton.addEventListener("click", function() {
    // Start the alarm sound only if it's not already playing
    if (alarmSound.paused) {
        alarmSound.play();
    }

    // Change the message
    sosMessage.textContent = "🆘 Distress Signal Deployed 🆘";
    document.getElementById("overlay").style.display = "block";

    // Hide SOS button and show End button
    sosButton.style.display = "none";
    endButton.style.display = "inline";

    // Broadcast activation to all tabs
    channel.postMessage({ action: "activateSOS" });
});

// Function to stop SOS
endButton.addEventListener("click", function() {
    if (isStoppingSOS) return; // Prevent multiple stop actions

    isStoppingSOS = true; // Set flag to prevent multiple stops

    // Stop the alarm sound across all tabs
    alarmSound.pause();
    alarmSound.currentTime = 0; // Reset sound to the beginning
    
    // Reset the message
    sosMessage.textContent = "";
    document.getElementById("overlay").style.display = "none";

    // Show SOS button and hide End button
    sosButton.style.display = "inline";
    endButton.style.display = "none";

    // Broadcast stop signal to all tabs
    channel.postMessage({ action: "stopSOS" });

    // Ensure that we are not blocking future stop actions by resetting the flag
    setTimeout(() => {
        isStoppingSOS = false; // Reset flag after stopping
    }, 100); // Short delay to allow all tabs to process the stop action
});

// Listen for messages from other tabs
channel.onmessage = function(event) {
    if (event.data.action === "activateSOS") {
        // Trigger the same SOS activation on this tab
        if (alarmSound.paused) {
            sosButton.click(); // Only activate if the sound is paused
        }
    } else if (event.data.action === "stopSOS") {
        // Trigger the stop SOS on this tab
        if (!alarmSound.paused) {
            endButton.click(); // Only stop if the sound is playing
        }
    }
};
