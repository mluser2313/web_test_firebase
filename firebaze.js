// Import the necessary Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDYwqi50DvsjFfldyJHBFcRCb27DoFH6N0",
    authDomain: "website-test-d1fc4.firebaseapp.com",
    databaseURL: "https://website-test-d1fc4-default-rtdb.firebaseio.com",
    projectId: "website-test-d1fc4",
    storageBucket: "website-test-d1fc4.appspot.com",
    messagingSenderId: "322934018306",
    appId: "1:322934018306:web:2b2468283dedabf95f721b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// AQI Information Database
const aqiInfo = {
    50: {
        title: "Good Air Quality",
        message: "Air quality is satisfactory. Enjoy normal outdoor activities.",
        class: "good"
    },
    100: {
        title: "Moderate Air Quality",
        message: "Unusually sensitive people should consider reducing prolonged/heavy exertion.",
        class: "moderate"
    },
    150: {
        title: "Unhealthy for Sensitive Groups",
        message: "People with heart/lung disease, older adults & children should reduce prolonged exertion.",
        class: "unhealthy-sensitive"
    },
    200: {
        title: "Unhealthy Air Quality",
        message: "Everyone may begin to experience health effects. Sensitive groups should avoid outdoor exertion.",
        class: "unhealthy"
    },
    300: {
        title: "Very Unhealthy",
        message: "Health alert - everyone may experience serious health effects. Avoid outdoor activities.",
        class: "very-unhealthy"
    },
    301: {
        title: "Hazardous Air Quality",
        message: "Health warning of emergency conditions - entire population affected. Stay indoors.",
        class: "hazardous"
    }
};

// Pollution threshold databases
const pollutionInfo = {
    pm25: {
        thresholds: [12, 35, 55, 150, 250, Infinity],
        categories: {
            12: { 
                title: "Good PM2.5", 
                message: "Air quality is satisfactory.",
                class: "good" 
            },
            35: { 
                title: "Moderate PM2.5", 
                message: "Unusually sensitive people should consider reducing exposure.",
                class: "moderate" 
            },
            55: { 
                title: "Unhealthy Sensitive", 
                message: "People with heart/lung disease should reduce exposure.",
                class: "unhealthy-sensitive" 
            },
            150: { 
                title: "Unhealthy PM2.5", 
                message: "Everyone may experience health effects.",
                class: "unhealthy" 
            },
            250: { 
                title: "Very Unhealthy", 
                message: "Health alert - avoid outdoor activities.",
                class: "very-unhealthy" 
            },
            Infinity: { 
                title: "Hazardous", 
                message: "Emergency conditions - stay indoors.",
                class: "hazardous" 
            }
        }
    },
    pm10: {
        thresholds: [54, 154, 254, 354, 424, Infinity],
        categories: {
            54: { 
                title: "Good PM10", 
                message: "Air quality is satisfactory.",
                class: "good" 
            },
            154: { 
                title: "Moderate PM10", 
                message: "Sensitive groups should take precautions.",
                class: "moderate" 
            },
            254: { 
                title: "Unhealthy Sensitive", 
                message: "Increased respiratory symptoms.",
                class: "unhealthy-sensitive" 
            },
            354: { 
                title: "Unhealthy PM10", 
                message: "Everyone may experience effects.",
                class: "unhealthy" 
            },
            424: { 
                title: "Very Unhealthy", 
                message: "Health warnings of emergency conditions.",
                class: "very-unhealthy" 
            },
            Infinity: { 
                title: "Hazardous", 
                message: "Emergency conditions - stay indoors.",
                class: "hazardous" 
            }
        }
    },
    co: {
        thresholds: [4.4, 9.4, 12.4, 15.4, 30.4, Infinity],
        categories: {
            4.4: { 
                title: "Good CO", 
                message: "Normal outdoor levels.",
                class: "good" 
            },
            9.4: { 
                title: "Moderate CO", 
                message: "Possible concern for sensitive groups.",
                class: "moderate" 
            },
            12.4: { 
                title: "Unhealthy Sensitive", 
                message: "Reduce prolonged exposure.",
                class: "unhealthy-sensitive" 
            },
            15.4: { 
                title: "Unhealthy CO", 
                message: "Avoid prolonged outdoor activity.",
                class: "unhealthy" 
            },
            30.4: { 
                title: "Very Unhealthy", 
                message: "Health alert - avoid exposure.",
                class: "very-unhealthy" 
            },
            Infinity: { 
                title: "Hazardous", 
                message: "Immediate health risk.",
                class: "hazardous" 
            }
        }
    },
    co2: {
        thresholds: [600, 1000, 1500, 2000, 5000, Infinity],
        categories: {
            600: { 
                title: "Excellent", 
                message: "Ideal indoor air quality.",
                class: "good" 
            },
            1000: { 
                title: "Good", 
                message: "Adequate ventilation.",
                class: "moderate" 
            },
            1500: { 
                title: "Moderate", 
                message: "Consider increasing ventilation.",
                class: "unhealthy-sensitive" 
            },
            2000: { 
                title: "Poor", 
                message: "Potential comfort issues.",
                class: "unhealthy" 
            },
            5000: { 
                title: "Very Poor", 
                message: "Health risk - improve ventilation.",
                class: "very-unhealthy" 
            },
            Infinity: { 
                title: "Dangerous", 
                message: "Immediate ventilation required.",
                class: "hazardous" 
            }
        }
    },
    o3: {
        thresholds: [54, 70, 85, 105, 200, Infinity],
        categories: {
            54: { 
                title: "Good Ozone", 
                message: "Air quality is satisfactory.",
                class: "good" 
            },
            70: { 
                title: "Moderate O3", 
                message: "Unusually sensitive people may be affected.",
                class: "moderate" 
            },
            85: { 
                title: "Unhealthy Sensitive", 
                message: "People with lung disease should reduce exposure.",
                class: "unhealthy-sensitive" 
            },
            105: { 
                title: "Unhealthy O3", 
                message: "Everyone may experience effects.",
                class: "unhealthy" 
            },
            200: { 
                title: "Very Unhealthy", 
                message: "Health alert - avoid outdoor activities.",
                class: "very-unhealthy" 
            },
            Infinity: { 
                title: "Hazardous", 
                message: "Emergency conditions - stay indoors.",
                class: "hazardous" 
            }
        }
    }
};

// References to AQI and pollutant data in the Realtime Database
const aqiRef = ref(database, "sensor1/aqi");
const pm25Ref = ref(database, "sensor1/pm25");
const pm10Ref = ref(database, "sensor1/pm10");
const coRef = ref(database, "sensor1/co");
const co2Ref = ref(database, "sensor1/co2");  // Replaced SO2 with CO2

// Add these references
const predictionRefs = [
    ref(database, "predictions1/avg1"),
    ref(database, "predictions1/avg2"),
    ref(database, "predictions1/avg3"),
    ref(database, "predictions1/avg4"),
    ref(database, "predictions1/avg5"),
    ref(database, "predictions1/avg6"),
	ref(database, "predictions1/avg7"),
	ref(database, "predictions1/avg8"),
	ref(database, "predictions1/avg9"),
	ref(database, "predictions1/avg10"),
	ref(database, "predictions1/avg11"),
	ref(database, "predictions1/avg12")
];

// Add chart initialization
let predictionChart;
const chartConfig = {
    type: 'line',
    data: {
        labels: ['DAY 1:12 AM - 4 AM', 'DAY 1:4 AM - 8 AM', 'DAY 1:8 AM - 12 PM', 
                'DAY 1:12 PM - 4 PM', 'DAY 1:4 PM - 8 PM', 'DAY 1:8 PM - 12 AM','DAY 2:12 AM - 4 AM', 'DAY 2:4 AM - 8 AM', 'DAY 2:8 AM - 12 PM', 
                'DAY 2:12 PM - 4 PM', 'DAY 2:4 PM - 8 PM', 'DAY 2:8 PM - 12 AM'],
        datasets: [{
            label: '48-hour AQI Forecast',
            data: Array(12).fill(0),
            borderColor: '#ff5722',
            backgroundColor: 'rgba(255, 87, 34, 0.2)',
            tension: 0.4,
            fill: true,
            pointRadius: 5,
            pointHoverRadius: 8
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: 'white',
                    font: {
                        size: 14
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(0,0,0,0.1)'
                },
                ticks: {
                    color: 'white'
                }
            },
            y: {
                grid: {
                    color: 'rgba(0,0,0,0.1)'
                },
                ticks: {
                    color: 'white'
                },
                title: {
                    display: true,
                    text: 'AQI Level',
                    color: 'white'
                }
            }
        }
    }
};

// Initialize chart
document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('predictionChart').getContext('2d');
    predictionChart = new Chart(ctx, chartConfig);
});

// Add prediction updates
predictionRefs.forEach((ref, index) => {
    onValue(ref, (snapshot) => {
        const value = snapshot.val() || 0;
        predictionChart.data.datasets[0].data[index] = value;
        predictionChart.update();
    });
});

// Update AQI status display
function updateAqiStatus(aqiValue) {
    const statusBox = document.getElementById('aqiStatus');
    const title = document.getElementById('aqiTitle');
    const message = document.getElementById('aqiMessage');
    
    // Remove all classes
    statusBox.className = 'aqi-status';
    
    // Find appropriate status
    const thresholds = [50, 100, 150, 200, 300, 301];
    const threshold = thresholds.find(t => aqiValue <= t) || 301;
    const info = aqiInfo[threshold];

    // Update display
    statusBox.classList.add(info.class);
    title.textContent = info.title;
    message.textContent = `${info.message} Current AQI: ${aqiValue}`;
}

// Generic status update function
function updatePollutionStatus(pollutant, value, elementId) {
    const info = pollutionInfo[pollutant];
    const numericValue = Number(value) || 0;
    
    const threshold = info.thresholds.find(t => numericValue <= t) || Infinity;
    const category = info.categories[threshold];
    
    const statusBox = document.getElementById(elementId);

    statusBox.className = `aqi-status ${category.class}`;
    statusBox.querySelector('.status-title').textContent = category.title;
    statusBox.querySelector('.status-message').textContent = 
        `${category.message} Current ${pollutant.toUpperCase()}: ${numericValue.toFixed(1)}`;
}

function updateTimestamp() {
    document.getElementById('lastUpdated').textContent = 
        `Last Updated: ${new Date().toLocaleTimeString()}`;
}
// Function to update UI elements
// Modify the AQI update function
function updateUI(ref, elementId) {
    onValue(ref, (snapshot) => {
        const value = snapshot.val();
		const pollutant = elementId.toLowerCase();
        
        if(pollutionInfo[pollutant]) {
            updatePollutionStatus(pollutant, value, `${pollutant}Status`);
        }
        if(elementId === 'aqi' && value !== null) {
            updateAqiStatus(value);
        }
        document.getElementById(elementId).textContent = value !== null ? value : "No Data";
		updateTimestamp();
    });
}


// Call updateTimestamp() inside each onValue callback

// Update UI for each pollutant
updateUI(aqiRef, "aqi");
updateUI(pm25Ref, "pm25");
updateUI(pm10Ref, "pm10");
updateUI(coRef, "co");
updateUI(co2Ref, "co2");  // Updated to CO2



// Reference to location data
const locationRef = ref(database, "location1");

onValue(locationRef, (snapshot) => {
    const data = snapshot.val();
    if (!data || !data.latitude || !data.longitude) return;

    const lat = parseFloat(data.latitude);
    const lon = parseFloat(data.longitude);

    // Check if 'map' container exists
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;

    // Prevent reinitializing if map already exists
    if (mapContainer._leaflet_id) return;

    const map = L.map('map').setView([lat, lon], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.marker([lat, lon]).addTo(map)
        .bindPopup('Sensor Location')
        .openPopup();
});

