// Function to get query parameters
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        key: params.get("key") || "defaultKey",
        value: params.get("value") || "defaultValue"
    };
}

// Push data to Google Tag Manager Data Layer
window.dataLayer = window.dataLayer || [];
const queryParams = getQueryParams();
window.dataLayer.push({
    event: "queryCaptured",
    key: queryParams.key,
    value: queryParams.value
});

// Fetch modified discount value from GTM
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const modifiedValue = window.dataLayer.find(d => d.value)?.value || queryParams.value;
        document.getElementById("discount-text").innerText = `You have a special offer: ${modifiedValue}`;
    }, 1000);  // Wait for GTM to update the dataLayer
});

// API Call on Button Click
document.getElementById("fetch-data").addEventListener("click", () => {
    fetch(`https://httpbin.org/get?key=${queryParams.key}&value=${queryParams.value}`)
        .then(response => response.json())
        .then(data => console.log("API Response:", data))
        .catch(error => console.error("API Error:", error));
});
