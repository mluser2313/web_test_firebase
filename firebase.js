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

// References to AQI and pollutant data in the Realtime Database
const aqiRef = ref(database, "sensor/aqi");
const pm25Ref = ref(database, "sensor/pm25");
const pm10Ref = ref(database, "sensor/pm10");
const coRef = ref(database, "sensor/co");
const co2Ref = ref(database, "sensor/co2");  // Replaced SO2 with CO2
const o3Ref = ref(database, "sensor/o3");    // Added O3 reference
// Add these references
const predictionRefs = [
    ref(database, "predictions/avg1"),
    ref(database, "predictions/avg2"),
    ref(database, "predictions/avg3"),
    ref(database, "predictions/avg4"),
    ref(database, "predictions/avg5"),
    ref(database, "predictions/avg6")
];

// Add chart initialization
let predictionChart;
const chartConfig = {
    type: 'line',
    data: {
        labels: ['12 AM - 4 AM', '4 AM - 8 AM', '8 AM - 12 PM', 
                '12 PM - 4 PM', '4 PM - 8 PM', '8 PM - 12 AM'],
        datasets: [{
            label: '24-hour AQI Forecast',
            data: Array(6).fill(0),
            borderColor: '#ff5722',
            backgroundColor: 'rgba(255, 87, 34, 0.2)',
            tension: 0.4,
            fill: true,
            pointRadius: 5,
            pointHoverRadius: 8
        }]
    },
    options: {
		plugins: {
        title: {
            display: true,
            text: '24-Hour AQI Forecast',
            font: { size: 18 },
            color: '#666'
        }
    }
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: '#666',
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
                    color: '#666'
                }
            },
            y: {
                grid: {
                    color: 'rgba(0,0,0,0.1)'
                },
                ticks: {
                    color: '#666'
                },
                title: {
                    display: true,
                    text: 'AQI Level',
                    color: '#666'
                }
            }
        }
    }
};

// Add prediction updates
predictionRefs.forEach((ref, index) => {
    onValue(ref, (snapshot) => {
        const value = snapshot.val() || 0;
        predictionChart.data.datasets[0].data[index] = value;
        predictionChart.update();
    });
});

// Function to update UI elements
function updateUI(ref, elementId) {
    onValue(ref, (snapshot) => {
        const value = snapshot.val();
        document.getElementById(elementId).textContent = value !== null ? value : "No Data";
    });
}

// Update UI for each pollutant
updateUI(aqiRef, "aqi");
updateUI(pm25Ref, "pm25");
updateUI(pm10Ref, "pm10");
updateUI(coRef, "co");
updateUI(co2Ref, "co2");  // Updated to CO2
updateUI(o3Ref, "o3");    // Added O3

// Initialize chart
document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('predictionChart').getContext('2d');
    predictionChart = new Chart(ctx, chartConfig);
});