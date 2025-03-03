// Google Tag Manager Data Layer Setup
window.dataLayer = window.dataLayer || [];

// Function to get query parameters from the URL
function getQueryParams() {
    let params = new URLSearchParams(window.location.search);
    let queryParams = {};

    for (let [key, value] of params.entries()) {
        queryParams[key] = value;
        window.dataLayer.push({ [key]: value }); // Push each param to GTM Data Layer
    }

    console.log("Query Parameters:", queryParams);

    // Display Discount Info if applicable
    if (queryParams.discount) {
        document.getElementById('discount-info').innerText = 
            `🎉 Special Offer: ${queryParams.discount} Discount!`;
    }
}

// Function to send API Request with correct key-value pair
function fetchAPIData() {
    let queryData = {};

    // Extract key-value pairs from GTM Data Layer
    for (let obj of window.dataLayer) {
        Object.assign(queryData, obj);
    }

    if (Object.keys(queryData).length > 0) {
        let queryString = new URLSearchParams(queryData).toString();
        let apiUrl = `https://httpbin.org/get?${queryString}`;

        console.log(`Fetching API: ${apiUrl}`);

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log("API Response:", data);

                // Display response on webpage instead of console
                document.getElementById('discount-info').innerText = 
                    `✅ API Response: ${JSON.stringify(data.args, null, 2)}`;
            })
            .catch(error => console.error("❌ Error fetching API:", error));
    } else {
        alert("⚠️ No valid query parameters found in GTM Data Layer!");
    }
}

// Run on Page Load
document.addEventListener("DOMContentLoaded", () => {
    getQueryParams();
    document.getElementById("fetch-api").addEventListener("click", fetchAPIData);
});
