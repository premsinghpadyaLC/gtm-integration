// Google Tag Manager Data Layer Setup
window.dataLayer = window.dataLayer || [];

// Function to get query parameters from the URL and filter out GTM-related params
function getQueryParams() {
    let params = new URLSearchParams(window.location.search);
    let queryParams = {};

    // Exclude GTM-related parameters
    const excludedParams = ["gtm.start", "event", "gtm.uniqueEventId", "gtm_debug"];

    for (let [key, value] of params.entries()) {
        if (!excludedParams.includes(key)) {
            queryParams[key] = value;
            window.dataLayer.push({ [key]: value }); // Push to GTM Data Layer
        }
    }

    console.log("Filtered Query Parameters:", queryParams);

    // Display Discount Info if applicable
    if (queryParams.discount) {
        document.getElementById('discount-info').innerText = 
            `🎉 Special Offer: ${queryParams.discount} Discount!`;
    }
}

// Function to send API Request with only relevant key-value pairs
function fetchAPIData() {
    let queryData = {};

    // Extract key-value pairs from GTM Data Layer and filter out GTM-related parameters
    const excludedParams = ["gtm.start", "event", "gtm.uniqueEventId", "gtm_debug"];

    for (let obj of window.dataLayer) {
        for (let key in obj) {
            if (!excludedParams.includes(key)) {
                queryData[key] = obj[key];
            }
        }
    }

    if (Object.keys(queryData).length > 0) {
        let queryString = new URLSearchParams(queryData).toString();
        let apiUrl = `https://httpbin.org/get?${queryString}`;

        console.log(`Fetching API: ${apiUrl}`);

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log("API Response:", data);

                // Display response on webpage
                document.getElementById('discount-info').innerText = 
                    `✅ API Response: ${JSON.stringify(data.args, null, 2)}`;
            })
            .catch(error => console.error("❌ Error fetching API:", error));
    } else {
        alert("⚠️ No valid query parameters found!");
    }
}

// Run on Page Load
document.addEventListener("DOMContentLoaded", () => {
    getQueryParams();
    document.getElementById("fetch-api").addEventListener("click", fetchAPIData);
});
