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

// Function to send API Request
function fetchAPIData() {
    let key = window.dataLayer.length > 0 ? Object.keys(window.dataLayer[0])[0] : null;
    let value = key ? window.dataLayer[0][key] : null;

    if (key && value) {
        let apiUrl = `https://httpbin.org/get?${key}=${value}`;
        console.log(`Fetching API: ${apiUrl}`);

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log("API Response:", data);
                alert("API Response Logged in Console");
            })
            .catch(error => console.error("Error fetching API:", error));
    } else {
        alert("No query parameters found in GTM Data Layer!");
    }
}

// Run on Page Load
document.addEventListener("DOMContentLoaded", () => {
    getQueryParams();
    document.getElementById("fetch-api").addEventListener("click", fetchAPIData);
});
