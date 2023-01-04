import "./App.css";
import { charactersFront } from "./assets/mario_kart/characters/charactersStates";

export const Sleep = (delay) => {
  let start = new Date().getTime();
  while (new Date().getTime() < start + delay);
};

export const Countdown = (props) => {
  return (
    <div>
      <div className="countdown" id="countdown">
        {props.text}
      </div>
      <div className="pending-brands">
        {props.array
          .sort((a, b) => a.addedTime - b.addedTime)
          .map((element, index) => {
            const characterObject = charactersFront[element.characterName];
            return (
              <div key={characterObject} className="wrapper-loading">
                <div className="image-container">
                  <img
                    className="brandLogo"
                    src={element.logo}
                    alt="brand logo"
                  />
                </div>
                <div className="image-container">
                  <img
                    className="character-icon"
                    src={characterObject}
                    alt={characterObject}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
