const map = L.map('map').setView([39.9334, 32.8597], 6);

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}@2x.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
}).addTo(map);

const cities = [
    { name: "Adana", lat: 37.0, lon: 35.3213 },
    { name: "Adıyaman", lat: 37.7648, lon: 38.2786 },
    { name: "Afyonkarahisar", lat: 38.7638, lon: 30.5403 },
    { name: "Ağrı", lat: 39.7191, lon: 43.0503 },
    { name: "Aksaray", lat: 38.3687, lon: 34.0362 },
    { name: "Amasya", lat: 40.6499, lon: 35.8353 },
    { name: "Ankara", lat: 39.9334, lon: 32.8597 },
    { name: "Antalya", lat: 36.8969, lon: 30.7133 },
    { name: "Ardahan", lat: 41.1105, lon: 42.7022 },
    { name: "Artvin", lat: 41.1828, lon: 41.8183 },
    { name: "Aydın", lat: 37.8444, lon: 27.8456 },
    { name: "Balıkesir", lat: 39.6484, lon: 27.8826 },
    { name: "Bartın", lat: 41.6354, lon: 32.339 },
    { name: "Batman", lat: 37.8812, lon: 41.1351 },
    { name: "Bayburt", lat: 40.2563, lon: 40.2249 },
    { name: "Bilecik", lat: 40.1503, lon: 29.9807 },
    { name: "Bingöl", lat: 38.8846, lon: 40.4939 },
    { name: "Bitlis", lat: 38.4016, lon: 42.1078 },
    { name: "Bolu", lat: 40.735, lon: 31.6066 },
    { name: "Burdur", lat: 37.7269, lon: 30.2889 },
    { name: "Bursa", lat: 40.1828, lon: 29.0668 },
    { name: "Çanakkale", lat: 40.1467, lon: 26.4064 },
    { name: "Çankırı", lat: 40.6013, lon: 33.6134 },
    { name: "Çorum", lat: 40.5506, lon: 34.9556 },
    { name: "Denizli", lat: 37.7833, lon: 29.0947 },
    { name: "Diyarbakır", lat: 37.9136, lon: 40.2174 },
    { name: "Düzce", lat: 40.8389, lon: 31.1639 },
    { name: "Edirne", lat: 41.6772, lon: 26.5558 },
    { name: "Elazığ", lat: 38.6809, lon: 39.2264 },
    { name: "Erzincan", lat: 39.75, lon: 39.4926 },
    { name: "Erzurum", lat: 39.9043, lon: 41.2679 },
    { name: "Eskişehir", lat: 39.7667, lon: 30.5256 },
    { name: "Gaziantep", lat: 37.0662, lon: 37.3833 },
    { name: "Giresun", lat: 40.9128, lon: 38.3895 },
    { name: "Gümüşhane", lat: 40.4602, lon: 39.4673 },
    { name: "Hakkari", lat: 37.5744, lon: 43.7408 },
    { name: "Hatay", lat: 36.2, lon: 36.1603 },
    { name: "Iğdır", lat: 39.9237, lon: 44.045 },
    { name: "Isparta", lat: 37.7648, lon: 30.5561 },
    { name: "İstanbul", lat: 41.0082, lon: 28.9784 },
    { name: "İzmir", lat: 38.4237, lon: 27.1428 },
    { name: "Kahramanmaraş", lat: 37.5753, lon: 36.9371 },
    { name: "Karabük", lat: 41.204, lon: 32.625 },
    { name: "Karaman", lat: 37.1814, lon: 33.215 },
    { name: "Kars", lat: 40.6016, lon: 43.0944 },
    { name: "Kastamonu", lat: 41.3894, lon: 33.7831 },
    { name: "Kayseri", lat: 38.7333, lon: 35.491 },
    { name: "Kırıkkale", lat: 39.8468, lon: 33.5155 },
    { name: "Kırklareli", lat: 41.7351, lon: 27.2253 },
    { name: "Kırşehir", lat: 39.1458, lon:34.1638 },
    { name: "Kilis", lat: 36.7184, lon: 37.1212 },
    { name: "Kocaeli", lat: 40.8533, lon: 29.8815 },
    { name: "Konya", lat: 37.8667, lon: 32.4833 },
    { name: "Kütahya", lat: 39.4242, lon: 29.9833 },
    { name: "Malatya", lat: 38.3552, lon: 38.3095 },
    { name: "Manisa", lat: 38.6191, lon: 27.4289 },
    { name: "Mardin", lat: 37.3131, lon: 40.7436 },
    { name: "Mersin", lat: 36.8121, lon: 34.6415 },
    { name: "Muğla", lat: 37.2153, lon: 28.3636 },
    { name: "Muş", lat: 38.9462, lon: 41.7539 },
    { name: "Nevşehir", lat: 38.625, lon: 34.7122 },
    { name: "Niğde", lat: 37.9667, lon: 34.6833 },
    { name: "Ordu", lat: 40.9862, lon: 37.8797 },
    { name: "Osmaniye", lat: 37.0742, lon: 36.2474 },
    { name: "Rize", lat: 41.0201, lon: 40.5234 },
    { name: "Sakarya", lat: 40.7731, lon: 30.3948 },
    { name: "Samsun", lat: 41.2867, lon: 36.33 },
    { name: "Siirt", lat: 37.9333, lon: 41.95 },
    { name: "Sinop", lat: 42.0264, lon: 35.1551 },
    { name: "Sivas", lat: 39.7477, lon: 37.0179 },
    { name: "Şanlıurfa", lat: 37.1671, lon: 38.7939 },
    { name: "Şırnak", lat: 37.4187, lon: 42.4918 },
    { name: "Tekirdağ", lat: 40.978, lon: 27.5117 },
    { name: "Tokat", lat: 40.3133, lon: 36.5497 },
    { name: "Trabzon", lat: 41.0053, lon: 39.7338 },
    { name: "Tunceli", lat: 39.0667, lon: 39.1783 },
    { name: "Uşak", lat: 38.6781, lon: 29.4083 },
    { name: "Van", lat: 38.4237, lon: 43.3665 },
    { name: "Yalova", lat: 40.6333, lon: 29.2667 },
    { name: "Yozgat", lat: 39.8208, lon: 34.8125 },
    { name: "Zonguldak", lat: 41.4543, lon: 31.7987 },
];

let currentCityIndex = 0;
let marker;
let score = 0;
let skipped = 0;
let timeLeft = 60;
let timer;
let greenMarkers = [];

const cityInput = document.getElementById("city-input");
const submitBtn = document.getElementById("submit-btn");
const passBtn = document.getElementById("pass-btn");
const restartBtn = document.getElementById("restart-btn");
const scoreDisplay = document.getElementById("score");
const skippedDisplay = document.getElementById("skipped");
const timerDisplay = document.getElementById("timer");
const messageDisplay = document.getElementById("message");

function addGreenMarker(city) {
    const greenIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        shadowSize: [41, 41]
    });
    
    const greenMarker = L.marker([city.lat, city.lon], { icon: greenIcon }).addTo(map);
    greenMarkers.push(greenMarker); 
}

function placeMarker(city) {
    if (marker) {
        map.removeLayer(marker);
    }
    marker = L.marker([city.lat, city.lon]).addTo(map);
    map.setView([city.lat, city.lon], 7);
}

function startGame() {
    currentCityIndex = Math.floor(Math.random() * cities.length);
    placeMarker(cities[currentCityIndex]);
    cityInput.value = "";
    messageDisplay.textContent = "";
}

function updateScore() {
    score++;
    scoreDisplay.textContent = score;
}

function updateSkipped() {
    skipped++;
    skippedDisplay.textContent = skipped;
}

function updateTimer() {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
        endGame();
    }
}

function endGame() {
    clearInterval(timer);
    messageDisplay.textContent = `Time's up! Your final score is: ${score}, Skipped: ${skipped}`;

    greenMarkers.forEach(marker => {
        map.removeLayer(marker);
    });
    greenMarkers = []; 

    submitBtn.disabled = true;
    passBtn.disabled = true;
    cityInput.disabled = true;
    restartBtn.style.display = "inline-block";
}

function correctGuess() {
    document.body.style.backgroundColor = 'green'; 
    setTimeout(() => {
        document.body.style.backgroundColor = '#2c2c2c'; 
    }, 1000); 
}

function wrongGuess() {
    document.body.style.backgroundColor = 'red'; 
    setTimeout(() => {
        document.body.style.backgroundColor = '#2c2c2c'; 
    }, 1000); 
}

submitBtn.addEventListener("click", function () {
    const guess = cityInput.value.trim().toLowerCase();
    const currentCity = cities[currentCityIndex].name.toLowerCase();

    if (guess === currentCity) {
        updateScore();
        addGreenMarker(cities[currentCityIndex]); 
        correctGuess(); 
        currentCityIndex = Math.floor(Math.random() * cities.length);
        placeMarker(cities[currentCityIndex]);
        cityInput.value = "";
        messageDisplay.textContent = "Correct! Keep going!";
    } else {
        wrongGuess(); 
        messageDisplay.textContent = "Wrong! Try again.";
    }
});

passBtn.addEventListener("click", function () {
    updateSkipped();
    currentCityIndex = Math.floor(Math.random() * cities.length);
    placeMarker(cities[currentCityIndex]);
    cityInput.value = "";
    messageDisplay.textContent = "City skipped!";
});

restartBtn.addEventListener("click", function () {
    score = 0;
    skipped = 0;
    timeLeft = 60;
    scoreDisplay.textContent = score;
    skippedDisplay.textContent = skipped;
    timerDisplay.textContent = timeLeft;
    restartBtn.style.display = "none";
    cityInput.disabled = false;
    submitBtn.disabled = false;
    passBtn.disabled = false;
    startGame();
    timer = setInterval(updateTimer, 1000);
});

// Start the game initially
startGame();
timer = setInterval(updateTimer, 1000);

