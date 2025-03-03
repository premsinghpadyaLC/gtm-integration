// Google Tag Manager Data Layer Setup
window.dataLayer = window.dataLayer || [];

// Function to get query parameters from the URL
function getQueryParams() {
    let params = new URLSearchParams(window.location.search);
    let key = params.get('key');
    let value = params.get('value');

    if (key && value) {
        console.log(`Query Params: ${key} = ${value}`);

        // Push data to GTM Data Layer
        window.dataLayer.push({ [key]: value });

        // Display Discount Info if applicable
        if (key === "discount") {
            document.getElementById('discount-info').innerText = `Special Offer: ${value} Discount!`;
        }
    }
}

// Function to send API Request with correct key-value pair
function fetchAPIData() {
    let key, value;

    // Extract key-value pairs from GTM Data Layer
    for (let obj of window.dataLayer) {
        let keys = Object.keys(obj);
        if (keys.length > 0) {
            key = keys[0];   // Get the first key
            value = obj[key]; // Get the corresponding value
            break;
        }
    }

    if (key && value) {
        let apiUrl = `https://httpbin.org/get?${key}=${encodeURIComponent(value)}`;
        console.log(`Fetching API: ${apiUrl}`);

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log("API Response:", data);

                // Display response on webpage instead of console
                document.getElementById('discount-info').innerText = 
                    `API Response: ${JSON.stringify(data.args)}`;
            })
            .catch(error => console.error("Error fetching API:", error));
    } else {
        alert("No valid query parameters found in GTM Data Layer!");
    }
}

// Run on Page Load
document.addEventListener("DOMContentLoaded", () => {
    getQueryParams();
    document.getElementById("fetch-api").addEventListener("click", fetchAPIData);
});
