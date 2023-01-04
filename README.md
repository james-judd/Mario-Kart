Introduction:

This Mario Kart-themed web-based application, created using the React framework (Javascript), uses real-time sales data to "race" THG companies and products against each other. The application is wrapped in a Docker container for ease of deployment, however external access to THG's data feed is prohibited so this repository contains the raw code for intellectual use.


Summary:

This application would open a websocket to THG's data stream and parse each packet (sale) for company/product/value. Each unique company/product is randomly assigned a Mario Kart character (with associated artwork), until 6 characters are present. A countdown begins, after which the characters race along the track, dynamically varying their speed based on live sales data. Should any company/product fall too far behind, they may randomly transform into Bullet Bill, temporarily changing artwork and gaining a large boost in speed. Each character's company/product appears in a bubble above their head, with their race position displayed in a table. At the end of the race, a podium is displayed with the 3 winners celebrating under falling confetti. The track background is chosen randomly from a selection, and moves independently behind the characters. Classic Mario Kart music plays automatically, with a mute toggle button in the corner. I implemented a 10 minute timeout feature on the websocket, with the race reloading 30 seconds after each podium.

Should you wish to run my application:
1) Install node.js
2) Clone this repository
3) Within this repository, run on the command-line: >npm install
4) Run: >npm start

Localhost:3000 will load the webpage's start screen (start button, background, music, etc.) but pressing start will not load the characters due to the blocked data stream.

Screenshots of the start screen can be found in this repository.


Future Goals:

1) Change to an open data stream.
2) Add a selection screen for the background and characters.
3) Implement the mystery box item, containing one of a selection of other items. Artwork can already be found in src/assets.
