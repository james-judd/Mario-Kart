// import podium from "./podium.webp";
import podium from "./podium.png";
import "./App.css";
import Confetti from "react-confetti";
import { useEffect } from "react";
import { useState } from "react";
import { charactersWin } from "./assets/mario_kart/characters/charactersStates";

export const Podium = (props) => {
  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  };

  const handleClick = () => {
    window.location.reload();
  };

  useEffect(() => {
    setTimeout(() => {
      handleClick();
    }, 8000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [windowSize, setWindowSize] = useState(getWindowSize());
  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  console.log({ props });

  return (
    <div>
      <Confetti width={windowSize.innerWidth} height={windowSize.innerHeight} />
      <div className="img-container">
        <img className="podium-image" src={podium} alt={"podium"} />
        <div className="ranking">
          <div className="rank" id="second">
            <div className="logo-img-container">
              <img
                className="logo-img"
                src={props.results[1].logo}
                alt={props.results[1].logo}
              />
            </div>
            <div className="character-img-container" id="second-img-container">
              <img
                className="charPodium"
                src={charactersWin[props.results[1].characterName]}
                alt={props.results[1].characterName}
              />
            </div>
          </div>
          <div className="rank" id="first">
            <div className="logo-img-container">
              <img
                className="logo-img"
                src={props.results[0].logo}
                alt={props.results[0].logo}
              />
            </div>
            <div className="character-img-container" id="first-img-container">
              <img
                className="charPodium"
                src={charactersWin[props.results[0].characterName]}
                alt={props.results[0].characterName}
              />
            </div>
          </div>
          <div className="rank" id="third">
            <div className="logo-img-container">
              <img
                className="logo-img"
                src={props.results[2].logo}
                alt={props.results[2].logo}
              />
            </div>
            <div className="character-img-container" id="third-img-container">
              <img
                className="charPodium"
                src={charactersWin[props.results[2].characterName]}
                alt={props.results[2].characterName}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="back-button">
        <button onClick={() => window.location.reload()}>Start Again</button>
      </div>
    </div>
  );
};
