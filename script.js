// ✅ Function to get query parameters from URL
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        key: params.get("key") || "defaultKey",
        value: params.get("value") || "defaultValue"
    };
}

// ✅ Push query params to GTM's dataLayer
window.dataLayer = window.dataLayer || [];
const queryParams = getQueryParams();
window.dataLayer.push({
    event: "queryCaptured",
    key: queryParams.key,
    value: queryParams.value
});

// ✅ Dynamically update discount text
document.addEventListener("DOMContentLoaded", () => {
    const discountText = document.getElementById("discount-text");
    
    // Modify discount dynamically based on GTM (e.g., change "20off" to "10off")
    let modifiedDiscount = queryParams.value === "20off" ? "10off" : queryParams.value;
    
    // Push modified discount to GTM
    window.dataLayer.push({
        event: "discountModified",
        modifiedDiscountValue: modifiedDiscount
    });

    // Update UI
    discountText.innerText = `You have a special offer: ${modifiedDiscount}`;
});

// ✅ API Call on Button Click
document.getElementById("fetch-data").addEventListener("click", () => {
    fetch(`https://httpbin.org/get?key=${queryParams.key}&value=${queryParams.value}`)
        .then(response => response.json())
        .then(data => {
            console.log("API Response:", data);
        })
        .catch(error => console.error("API Error:", error));
});

// ✅ Debugging: Log query params and data layer
console.log("Current URL:", window.location.href);
console.log("Query Params:", new URLSearchParams(window.location.search).toString());
console.log("Current Data Layer:", window.dataLayer);
