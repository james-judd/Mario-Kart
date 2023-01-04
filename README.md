Introduction:

This web-based application, created using React (Javascript), is a Mario Kart simulator which races THG products and companies against one another using real-time sales data. The application was wrapped in a Docker container for ease of deployment, however external access to THG's data feed is prohibited so this repository simply contains the raw code for intellectual use.


Summary:

This application would open a websocket to THG's data stream and parse each packet (sale) for company/product/value. Each unique company/product is randomly assigned a Mario Kart character (with associated artwork), until 6 characters are present. A countdown begins, after which the characters race along the track, dynamically varying their speed based on continued sales data. Should any company/product fall too far behind, they may randomly transform into Bullet Bill, changing artwork and gaining a large temporary boost in speed. Each character's company/product appears in a bubble above their head, with their race position displayed in a table. At the end of the race, a podium is displayed with the 3 winners celebrating under live confetti. The track background is chosen randomly from a selection, and moves independently behind the characters. Classic Mario Kart music plays automatically, with a mute toggle button in the corner. I implemented a 10 minute timeout feature on the websocket, with the race reloading 30 seconds after each podium.

Should you wish to run my application:
1) Install node.js
2) Clone this repository
3) Within this repository, run on the command-line >npm install
4) Run >npm start

Localhost:3000 will load the webpage's start screen (start button, background, music, etc.) but pressing start will not load the characters due to the blocked data stream.

A screenshot of the start screen can be found in this repository.


Future Goals:

1) Change to an open data stream
2) Implement the mystery box item, containing one of a selection of other items. Artwork can already be found in src/assets.
