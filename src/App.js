import logo from "./MarioKartLogo.png";
import "./App.css";
import { Race } from "./Race.js";
import images from "./assets/christmas/backgrounds/images.js";
import { getRandomInt } from "./randomInt";
import { useState } from "react";
import { TopPage } from "./TopPage";
import { MusicPlayer } from "./MusicPlayer";
import { Road } from "./Road";
import { Podium } from "./Podium";

function App() {
  console.log("app was re rendered");
  const [raceInProgress, setRaceInProgress] = useState(false);
  const [results, setResults] = useState(null);

  const renderStartPage = () => (
    <div className="start-button">
      <TopPage logo={logo} changePage={() => setRaceInProgress(true)} />
    </div>
  );

  const renderCorrectScreen = () => {
    if (results) {
      return (
        <Podium
          results={results}
          onRestart={() => {
            setResults(null);
            setRaceInProgress(false);
          }}
        />
      );
    }

    return raceInProgress ? (
      <Race setResults={setResults} />
    ) : (
      renderStartPage()
    );
  };

  // useEffect(() => {
  //   console.log({ results });
  // }, [results]);

  return (
    <div className="App">
      <div className="background-container">
        <div
          style={{
            backgroundImage: `url(${
              images[getRandomInt(0, images.length - 1)]
            })`,
          }}
          className="background"
        />
      </div>
      <div className="content-container">
        <div className="header">
          <div className="logo-png">
            <MusicPlayer />
            <img src={logo} className="App-logo" alt="logo" />
          </div>
        </div>
        <div>
          {renderCorrectScreen()}
          <Road />
        </div>
      </div>
    </div>
  );
}

export default App;
