[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/ATV5e7Id)

# GeoGame

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
- **Leaflet.js** is used to provide interactive maps and manage city markers. It allows dynamic map rendering and user interaction in real-time.

## Event Handlers
1. **Input Submission Handler:** This event listens for the submission of city names and checks if the input matches the correct city. It updates the score and visual feedback (green/red background flash) accordingly.
2. **Time Tracker Handler:** Starts and updates the countdown timer when the game begins. Stops the game when the timer reaches zero.
3. **Button Click Handler:** Handles button clicks for "Pass" and "Restart" functionalities, allowing users to skip to the next city or restart the game.

## Use of Closures
- Closures are utilized to maintain the state of the game (e.g., score, current city, and remaining time). For instance, the timer function retains access to the time variable, even after the game starts, ensuring accurate countdown functionality.

## Lessons Learned from AI
- I consulted AI tools such as ChatGPT and Gemini to refine my JavaScript knowledge. Specifically, I learned:
  - How to efficiently manage event listeners.
  - Techniques to simplify the DOM interaction.
  - Best practices for using closures in game logic.
- Interaction URL: ... 

## DOM Interaction
- The DOM is manipulated to dynamically update game elements such as:
  - Displaying the score and remaining time.
  - Changing the background color based on user answers.
  - Updating the map marker positions.
  - If the users can completed the one region get +1 minutes

## Interactivity and Complexity
- The game incorporates:
  - A fully interactive map.
  - Real-time feedback for user input.
  - Time-constrained gameplay to enhance challenge and excitement.
 
## Live Demo
- Play the GeoGame here: [Click here for playing](https://gmt-458-web-gis.github.io/geogame-Adilhan11/)
