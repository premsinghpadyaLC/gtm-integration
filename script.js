// Function to get query parameters and filter out GTM-related ones
function getFilteredQueryParams() {
    let params = new URLSearchParams(window.location.search);
    let filteredParams = new URLSearchParams();

    // Exclude GTM-related parameters
    const excludedParams = ["gtm.start", "event", "gtm.uniqueEventId", "gtm_debug"];

    for (let [key, value] of params.entries()) {
        if (!excludedParams.includes(key)) {
            filteredParams.append(key, value);
        }
    }

    console.log("Filtered Query Parameters:", Object.fromEntries(filteredParams.entries()));

    return filteredParams.toString();
}

// Function to send API request with filtered query parameters
function fetchAPIData() {
    let queryString = getFilteredQueryParams();

    if (queryString) {
        let apiUrl = `https://httpbin.org/get?${queryString}`;

        console.log(`Fetching API: ${apiUrl}`);

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log("API Response:", data);
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
    fetchAPIData(); // Fetch API on page load
});
