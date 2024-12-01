
const map = L.map('map').setView([39.9334, 32.8597], 6);

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}@2x.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
}).addTo(map);

// Cities categorized by regions
const regions = {
    akdeniz: [
        { name: "Adana", lat: 37.0, lon: 35.3213 },
        { name: "Antalya", lat: 36.8949, lon: 30.7133 },
        { name: "Hatay", lat: 36.2, lon: 36.1667 },
        { name: "Isparta", lat: 37.7667, lon: 30.55 },
        { name: "Kahramanmaraş", lat: 37.5858, lon: 36.9371 },
        { name: "Mersin", lat: 36.8121, lon: 34.6415 },
        { name: "Osmaniye", lat: 37.0742, lon: 36.2474 },
        { name: "Burdur", lat: 37.7203, lon: 30.2908 }
    ],
    doguAnadolu: [
        { name: "Ağrı", lat: 39.7191, lon: 43.0503 },
        { name: "Erzurum", lat: 39.9, lon: 41.2769 },
        { name: "Kars", lat: 40.6074, lon: 43.0979 },
        { name: "Malatya", lat: 38.3552, lon: 38.3095 },
        { name: "Van", lat: 38.4946, lon: 43.3832 },
        { name: "Tunceli", lat: 39.1069, lon: 39.5481 },
        { name: "Elazığ", lat: 38.681, lon: 39.2264 },
        { name: "Bingöl", lat: 38.8845, lon: 40.4965 }
    ],
    ege: [
        { name: "Afyonkarahisar", lat: 38.7638, lon: 30.5405 },
        { name: "İzmir", lat: 38.4237, lon: 27.1428 },
        { name: "Manisa", lat: 38.6191, lon: 27.4289 },
        { name: "Muğla", lat: 37.2153, lon: 28.3636 },
        { name: "Denizli", lat: 37.7765, lon: 29.0864 },
        { name: "Aydın", lat: 37.8444, lon: 27.8458 },
        { name: "Kütahya", lat: 39.4242, lon: 29.9833 },
        { name: "Uşak", lat: 38.6833, lon: 29.4167 }
    ],
    guneydoguAnadolu: [
        { name: "Adıyaman", lat: 37.7648, lon: 38.276 },
        { name: "Diyarbakır", lat: 37.9158, lon: 40.2189 },
        { name: "Gaziantep", lat: 37.0662, lon: 37.3833 },
        { name: "Mardin", lat: 37.3132, lon: 40.735 },
        { name: "Siirt", lat: 37.9346, lon: 41.9463 },
        { name: "Şanlıurfa", lat: 37.1674, lon: 38.7955 },
        { name: "Batman", lat: 37.8812, lon: 41.1321 },
        { name: "Kilis", lat: 36.7167, lon: 37.1167 }
    ],
    icAnadolu: [
        { name: "Ankara", lat: 39.9334, lon: 32.8597 },
        { name: "Eskişehir", lat: 39.7667, lon: 30.5256 },
        { name: "Konya", lat: 37.8667, lon: 32.4833 },
        { name: "Nevşehir", lat: 38.625, lon: 34.7122 },
        { name: "Kayseri", lat: 38.7333, lon: 35.491 },
        { name: "Aksaray", lat: 38.3687, lon: 34.0362 },
        { name: "Niğde", lat: 37.9667, lon: 34.6833 }
    ],
    karadeniz: [
        { name: "Artvin", lat: 41.1831, lon: 41.8203 },
        { name: "Samsun", lat: 41.2797, lon: 36.3361 },
        { name: "Trabzon", lat: 41.0015, lon: 39.7178 },
        { name: "Rize", lat: 41.0201, lon: 40.5234 },
        { name: "Ordu", lat: 40.9847, lon: 37.8785 },
        { name: "Giresun", lat: 40.918, lon: 38.3895 },
        { name: "Zonguldak", lat: 41.4564, lon: 31.7987 }
    ],
    marmara: [
        { name: "İstanbul", lat: 41.0082, lon: 28.9784 },
        { name: "Edirne", lat: 41.6772, lon: 26.555 },
        { name: "Tekirdağ", lat: 40.978, lon: 27.511 },
        { name: "Kocaeli", lat: 40.7667, lon: 29.9167 },
        { name: "Sakarya", lat: 40.6936, lon: 30.4358 },
        { name: "Bursa", lat: 40.1826, lon: 29.0664 },
        { name: "Balıkesir", lat: 39.6484, lon: 27.8826 }
    ]
};


let regionOrder = Object.keys(regions); // Bölge sıralaması
let currentRegionIndex = 0;
let currentRegion = regionOrder[currentRegionIndex];
let availableCities = [...regions[currentRegion]];
let currentCityIndex = 0;
let marker;
let score = 0;
let totalScore = 0;
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
    currentCityIndex = Math.floor(Math.random() * availableCities.length);
    placeMarker(availableCities[currentCityIndex]);
    cityInput.value = "";
    messageDisplay.textContent = "";
}

function updateScore() {
    score += 10;
    scoreDisplay.textContent = score;
}

function updateSkipped() {
    skipped++;
    score -= 2;
    skippedDisplay.textContent = skipped;
}

function updateTimer() {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
        endGame();
    }
}

function checkIfRegionCompleted() {
    if (availableCities.length === 0) { // Tüm şehirler doğru bilindiğinde
        messageDisplay.textContent = `Congratulations! You've completed the ${currentRegion} region! Another minute will be added!`;
        timeLeft += 60; // 1 dakika ekleniyor
        currentRegionIndex++; // Bir sonraki bölgeye geç
        if (currentRegionIndex < regionOrder.length) {
            currentRegion = regionOrder[currentRegionIndex];
            availableCities = [...regions[currentRegion]]; // Yeni bölgenin şehirlerini yükle
            startGame(); // Yeni bölge için oyunu başlat
        } else {
            // Eğer tüm bölgeler tamamlanmışsa oyunu bitir
            messageDisplay.textContent = "Congratulations! You've completed all regions! You won the game!";
            endGame(); // Oyunu bitir
        }
    }
}


function endGame() {
    totalScore = score - (skipped * 2);
    clearInterval(timer);
    messageDisplay.textContent = `Time's up! Your total score is: ${totalScore}`;
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
    const currentCity = availableCities[currentCityIndex].name.toLowerCase();

    if (guess === currentCity) {
        updateScore();
        addGreenMarker(availableCities[currentCityIndex]);
        correctGuess();
        availableCities.splice(currentCityIndex, 1); // Doğru tahmin edilen şehri kaldır
        if (availableCities.length > 0) {
            currentCityIndex = Math.floor(Math.random() * availableCities.length);
            placeMarker(availableCities[currentCityIndex]);
            cityInput.value = "";
            messageDisplay.textContent = "Correct! Keep going!";
        }
        checkIfRegionCompleted(); // Doğru tahminden sonra bölge kontrolü yap
    } else {
        wrongGuess();
        messageDisplay.textContent = "Wrong! Try again.";
    }
});

passBtn.addEventListener("click", function () {
    updateSkipped();
    availableCities.splice(currentCityIndex, 1); // remove skipped city
    if (availableCities.length > 0) {
        currentCityIndex = Math.floor(Math.random() * availableCities.length);
        placeMarker(availableCities[currentCityIndex]);
        cityInput.value = "";
        messageDisplay.textContent = "City skipped!";
    } else {
        endGame(); // No available cities left
    }
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
    currentRegion = "icAnadolu"; // Başlangıç bölgesi "İç Anadolu"
    availableCities = [...regions[currentRegion]]; // Bölgedeki şehirleri yükle
    startGame(); // Oyunu başlat
    timer = setInterval(updateTimer, 1000); // Zamanlayıcıyı başlat
});

// Rules modal functionality
const rulesBtn = document.getElementById("rules-btn");
const rulesModal = document.getElementById("rules-modal");
const closeBtn = document.querySelector(".close");

rulesBtn.addEventListener("click", () => {
    rulesModal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
    rulesModal.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target == rulesModal) {
        rulesModal.style.display = "none";
    }
});


const startBtn = document.getElementById("start-btn");
startBtn.addEventListener("click", function () {
    startBtn.style.display = "none"; 
    restartBtn.style.display = "none"; 
    cityInput.disabled = false;
    submitBtn.disabled = false;
    passBtn.disabled = false;
    currentRegion = "icAnadolu"; 
    availableCities = [...regions[currentRegion]]; 
    startGame(); 
    timer = setInterval(updateTimer, 1000); 
});
