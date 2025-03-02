// Function to get URL query parameters
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        key: params.get('key'),
        value: params.get('value')
    };
}

// Push parameters to GTM Data Layer
window.dataLayer = window.dataLayer || [];
const queryParams = getQueryParams();
if (queryParams.key && queryParams.value) {
    dataLayer.push({
        'event': 'customEvent',
        'key': queryParams.key,
        'value': queryParams.value
    });
    console.log("Pushed to GTM Data Layer:", queryParams);
}

// API Request using parameters from GTM Data Layer
document.getElementById("sendRequest").addEventListener("click", function() {
    if (queryParams.key && queryParams.value) {
        const apiUrl = `https://httpbin.org/get?key=${queryParams.key}&value=${queryParams.value}`;
        
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => console.log("API Response:", data))
            .catch(error => console.error("Error fetching API:", error));
    } else {
        console.warn("No valid query parameters found!");
    }
});
