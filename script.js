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

// Update the UI with the discount value
document.addEventListener("DOMContentLoaded", () => {
    const discountText = document.getElementById("discount-text");
    discountText.innerText = `You have a special offer: ${queryParams.value}`;
});

// API Call on Button Click
document.getElementById("fetch-data").addEventListener("click", () => {
    fetch(`https://httpbin.org/get?key=${queryParams.key}&value=${queryParams.value}`)
        .then(response => response.json())
        .then(data => console.log("API Response:", data))
        .catch(error => console.error("API Error:", error));
});
