// Function to get query parameters from URL
function getQueryParams() {
    let params = new URLSearchParams(window.location.search);
    let key = params.get("key");
    let value = params.get("value");

    if (key && value) {
        // Push to Google Tag Manager Data Layer
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'event': 'queryCaptured',
            'discountType': key,
            'discountValue': value
        });

        // Update UI Discount
        document.getElementById("discount").textContent = value;
        
        // Apply Discount to Final Price
        let originalPrice = 1000;
        let discountAmount = parseInt(value.replace(/\D/g, ""), 10) || 0; // Extract number
        let newPrice = originalPrice - (originalPrice * discountAmount / 100);
        document.getElementById("final-price").textContent = "$" + newPrice;
    }
}

// Function to verify discount via API call
function verifyDiscount() {
    let params = new URLSearchParams(window.location.search);
    let apiURL = "https://httpbin.org/get?" + params.toString();

    fetch(apiURL)
        .then(response => response.json())
        .then(data => console.log("API Response:", data))
        .catch(error => console.error("Error:", error));
}

// Event Listeners
document.addEventListener("DOMContentLoaded", getQueryParams);
document.getElementById("verify-discount").addEventListener("click", verifyDiscount);
