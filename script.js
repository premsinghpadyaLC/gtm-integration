// Function to get query parameters from the URL
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        key: params.get("key") || null,  // Use null instead of default values
        value: params.get("value") || null
    };
}

// Push data to Google Tag Manager Data Layer (only if values exist)
window.dataLayer = window.dataLayer || [];
const queryParams = getQueryParams();

if (queryParams.key && queryParams.value) {  
    window.dataLayer.push({
        event: "queryCaptured",
        key: queryParams.key,
        value: queryParams.value
    });
}

// Display the extracted value on the page
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const modifiedValue = window.dataLayer.find(d => d.value)?.value || queryParams.value;
        document.getElementById("discount-text").innerText = `You have a special offer: ${modifiedValue}`;
    }, 1000);  // Ensure GTM has time to update
});

// API Call on Button Click
document.getElementById("fetch-data").addEventListener("click", () => {
    fetch(`https://httpbin.org/get?key=${queryParams.key}&value=${queryParams.value}`)
        .then(response => response.json())
        .then(data => console.log("API Response:", data))
        .catch(error => console.error("API Error:", error));
});
