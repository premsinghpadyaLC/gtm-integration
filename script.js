// Function to get the discount value from GTM
function applyDiscount() {
    let discountValue = window.dataLayer[0]['discountValue'] || "0%"; // Get from GTM

    document.getElementById("discount").textContent = discountValue;

    // Apply Discount to Final Price
    let originalPrice = 1000;
    let discountAmount = parseInt(discountValue.replace(/\D/g, ""), 10) || 0;
    let newPrice = originalPrice - (originalPrice * discountAmount / 100);
    document.getElementById("final-price").textContent = "$" + newPrice;
}

// Function to add product to cart
function addToCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let product = {
        name: "Dell XPS 15",
        price: document.getElementById("final-price").textContent
    };
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to Cart!");
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
document.addEventListener("DOMContentLoaded", applyDiscount);
document.getElementById("add-to-cart").addEventListener("click", addToCart);
document.getElementById("verify-discount").addEventListener("click", verifyDiscount);
