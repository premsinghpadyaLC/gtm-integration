 GTM and API Integration Project

 Overview
This project demonstrates the implementation of Google Tag Manager (GTM) and an API integration that extracts query parameters from the URL and sends them to an external API.

 1. Google Tag Manager (GTM) Implementation

 Steps followed to Implement GTM on my Website

 Create a Website
- Used GitHub Pages, Vercel, or Surge for free hosting.
- Created a simple HTML page (index.html).

 Set Up GTM
- Opened (https://tagmanager.google.com/).
- Created an account and a new container for your website.
- Copied the GTM code snippet provided and paste it inside the <head> and <body> tags of my index.html.

 Pushed Query String Parameters to the GTM Data Layer
- Modified my index.html to extract key-value pairs from the URL and push them to the GTM Data Layer.

My Code for GTM Implementation

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GTM Demo</title>

    <!-- Google Tag Manager -->
    <script>
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-MX9RCJTX');
    </script>
    <!-- End Google Tag Manager -->

    <script>
        function getQueryParams() {
            const params = new URLSearchParams(window.location.search);
            const key = params.get('key');
            const value = params.get('value');
            if (key && value) {
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    'key': key,
                    'value': value,
                    'event': 'queryParamsCaptured'
                });
                console.log("Data Layer Updated:", window.dataLayer);
            }
        }
        window.onload = getQueryParams;
    </script>
</head>
<body>

    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MX9RCJTX"
        height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
    <h1>Google Tag Manager Implementation</h1>
</body>
</html>


 How to Test
1. Opened my site with a query string:
   Example: mysite?key=myKey&value=myValue
2. Opened the browser console (F12 → Console) to see the logged data.

---

 2. API Implementation

 Steps to Implement API Call
- Added a button to trigger a GET request to http://httpbin.org/get.
- Extracted key and value from the GTM Data Layer.
- Sent the extracted data as query parameters.
- Logged the API response in the console.

 Code for API Call


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GTM Integration</title>
    <script>
        // Initialize GTM Data Layer if not already defined
        window.dataLayer = window.dataLayer || [];

        // Function to extract query parameters from URL
        function getQueryParams() {
            const params = new URLSearchParams(window.location.search);
            const key = params.get("key");
            const value = params.get("value");

            if (key && value) {
                // Push key-value pair into GTM Data Layer
                window.dataLayer.push({
                    event: "queryParamsCaptured",
                    key: key,
                    value: value
                });

                console.log("Data Layer Updated:", window.dataLayer);
            } else {
                console.error("Key and value not found in dataLayer.");
            }
        }

        // Wait for GTM to load before extracting query params
        window.addEventListener("load", () => {
            setTimeout(getQueryParams, 500); // Delay to ensure GTM is ready
        });
    </script>

    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-MX9RCJTX');</script>
    <!-- End Google Tag Manager -->

</head>
<body>

    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MX9RCJTX"
        height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->

    <h1>GTM Data Layer Example</h1>
    <button onclick="sendApiRequest()">Send API Request</button>

    <!-- Section to display API response -->
    <h2>API Response:</h2>
    <pre id="apiResponse">No response yet.</pre>

    <script>
        // Function to send API request using query params from GTM Data Layer
        function sendApiRequest() {
            const keyValuePair = window.dataLayer.find(obj => obj.key && obj.value);
            
            if (!keyValuePair) {
                console.error("Key and value not found in dataLayer.");
                document.getElementById("apiResponse").textContent = "Error: Key and value not found in dataLayer.";
                return;
            }

            const apiUrl = `https://httpbin.org/get?key=${keyValuePair.key}&value=${keyValuePair.value}`;
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    console.log("API Response:", data);
                    // Display API response in the UI
                    document.getElementById("apiResponse").textContent = JSON.stringify(data, null, 2);
                })
                .catch(error => {
                    console.error("API Error:", error);
                    document.getElementById("apiResponse").textContent = "Error: Unable to fetch API response.";
                });
        }
    </script>

</body>
</html>



 How to Test
1. Opened the site with query parameters:
   Example: mysite?key=myKey&value=myValue
2. Clicked the "Send API Request" button.
3. Opened the Console (F12 → Console) to view the API response.

 Conclusion
This project successfully integrates Google Tag Manager (GTM) and API calls using JavaScript. The GTM Data Layer stores query parameters, and these parameters are later sent to an API for processing.