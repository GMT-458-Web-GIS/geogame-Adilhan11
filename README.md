[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/ATV5e7Id)

# GeoGame

## Live Demo
- Play the GeoGame here: [Click here for playing](https://gmt-458-web-gis.github.io/geogame-Adilhan11/)

Here is my layout of the GeoGame Project.

![GeoGame Layout](layout_frontend.png)

## Requirements
- I will only use Leaflet for the main library.
- HTML files for views.
- CSS files for design.
- JS files for effect, time, and marker detail.

## Layout Elements
- Title of the game.
- Map from Leaflet.js.
- Time Tracker.
- Score Tracker.
- City input area with submit, pass, and restart button.
- Game Rules, Start Game button.

## Features
- Case-compatible input.
- Incorrect and correct answer coloring.
- Marker change depending on the correct answer.
- Flexible map.
- Total score tracker.
- If completed the one region get +1 minutes

## Advanced JavaScript Library
- **Leaflet.js** enables interactive, web-based maps that integrate with OpenStreetMap and CARTO. Its lightweight design allows quick feature integration, including dynamic city markers and user interactions.


## Event Handlers
1. **Input Submission Handler:** This event listens for the submission of city names and checks if the input matches the correct city. It updates the score and visual feedback (green/red background flash) accordingly.
```javascript
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
            checkIfRegionCompleted(); // Tüm şehirler doğru tahmin edildiyse kontrol eder
        } else {
            wrongGuess();
            messageDisplay.textContent = "Wrong! Try again.";
        }
    });
```
2. **Time Tracker Handler:** Starts and updates the countdown timer when the game begins. Stops the game when the timer reaches zero.
```javascript
function updateTimer() {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
        endGame();
    }
}

// Oyun başladıktan sonra zaman sayacını başlatmak için:
timer = setInterval(updateTimer, 1000);
```
3. **Button Click Handler:** Handles button clicks for "Pass" and "Restart" functionalities, allowing users to skip to the next city or restart the game.
```javascript
passBtn.addEventListener("click", function () {
    updateSkipped();
    availableCities.splice(currentCityIndex, 1); // Atlanan şehri listeden çıkar
    if (availableCities.length > 0) {
        currentCityIndex = Math.floor(Math.random() * availableCities.length);
        placeMarker(availableCities[currentCityIndex]);
        cityInput.value = "";
        messageDisplay.textContent = "City skipped!";
    } else {
        endGame(); // Liste boşaldıysa oyunu bitir
    }
});
```
```javascript
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
    currentRegion = "icAnadolu"; 
    availableCities = [...regions[currentRegion]];
    startGame(); 
    timer = setInterval(updateTimer, 1000);
});
```
## Use of Closures
- Closures are utilized to maintain the state of the game (e.g., score, current city, and remaining time). For instance, the timer function retains access to the time variable, even after the game starts, ensuring accurate countdown functionality.
```javascript
let timeLeft = 60;

function updateTimer() {
    // updateTimer fonksiyonu timeLeft değişkenine direkt olarak erişebilir.
    // Bu, fonksiyonun "timeLeft" değişkenini bir kapanış (closure) yoluyla tutmasını sağlar.
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
        endGame();
    }
}
timer = setInterval(updateTimer, 1000);                            
```
## Lessons Learned from AI
- I consulted AI tools such as ChatGPT and Gemini to refine my JavaScript knowledge. Specifically, I learned:
  - How to efficiently manage event listeners.
  - Techniques to simplify the DOM interaction.
  - Best for using closures in game logic.
- Interaction URL: https://chatgpt.com/share/6755d547-31b8-8004-b6c0-29bcde8f40cd 

## DOM Interaction
- The DOM is manipulated to dynamically update game elements such as:
  - Displaying the score and remaining time.
  ```javascript
  function updateScore() {
    score += 10;
    scoreDisplay.textContent = score; // DOM'daki skor alanını günceller
  } 
  ```
   ```javascript
  function updateTimer() {
    timeLeft--;
    timerDisplay.textContent = timeLeft; // DOM'daki zaman alanını günceller
    if (timeLeft <= 0) {
        endGame();
    }
   }
  ```
   ```javascript
   timerDisplay.textContent = timeLeft; // Başlangıçta DOM'daki zaman alanını ayarla
   ```
  - Changing the background color based on user answers.
  ```javascript
  function correctGuess() {
    document.body.style.backgroundColor = 'green'; // Arka planı yeşile boyar
    setTimeout(() => {
        document.body.style.backgroundColor = '#2c2c2c'; // 1 saniye sonra geri döndürür
    }, 1000);
  }
  ```
  ```javascript
  function wrongGuess() {
    document.body.style.backgroundColor = 'red'; // Arka planı kırmızıya boyar
    setTimeout(() => {
        document.body.style.backgroundColor = '#2c2c2c'; // 1 saniye sonra geri döndürür
    }, 1000);
  }
  ```
  - Updating the map marker positions.
  ```javascript
  function placeMarker(city) {
    if (marker) {
        map.removeLayer(marker); // Eski marker'ı haritadan kaldır
    }
    marker = L.marker([city.lat, city.lon]).addTo(map); // Yeni marker ekle
    map.setView([city.lat, city.lon], 7); // Harita konumunu yeni marker'a odakla
  }
  ```
  - If the users can completed the one region get +1 minutes
  ```javascript
  function checkIfRegionCompleted() {
    if (availableCities.length === 0) { // Tüm şehirler doğru bilindi
        messageDisplay.textContent = `Congratulations! You've completed the ${currentRegion} region! Another minute will be added!`;
        timeLeft += 60; // 1 dakika ekleniyor
        // Sonraki bölgeye geçiş veya oyunu tamamlama işlemleri...
    }
  }
  ```
## Interactivity and Complexity
- The game incorporates:
  - A fully interactive map.
  - Real-time feedback for user input.
  - Time-constrained gameplay to enhance challenge and excitement.
