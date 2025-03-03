document.getElementById('fetchData').addEventListener('click', function() {
    if (window.dataLayer.length > 0) {
        let data = window.dataLayer[0];
        let apiUrl = `https://httpbin.org/get?key=${data.key}&value=${data.value}`;
        
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log('API Response:', data);
                document.getElementById('apiResponse').innerText = JSON.stringify(data, null, 2);
            })
            .catch(error => console.error('Error fetching API:', error));
    } else {
        console.log('No query parameters found in GTM data layer.');
    }
});
