import "./Race.css";
import {
  charactersRight,
  charactersFront,
} from "./assets/mario_kart/characters/charactersStates";
import { BrandData } from "./brandData";

export const RaceUI = (props) => {
  let name = "";
  return (
    <div>
      <div className="standing-board-container">
        <div className="standing-board">
          <div className="board-title">Standings</div>
          {props.array.map((e, i) => {
            const characterObject = charactersFront[e.characterName];
            return (
              <div key={characterObject} className="board-row">
                <div className="board-item">{i + 1}</div>
                <div className="board-item">
                  <img
                    className="board-character-image"
                    src={characterObject}
                    alt={e.characterName}
                  />
                </div>
                <div className="board-item">
                  {BrandData.forEach((brandObj) => {
                    if (brandObj.siteID === e.siteID) {
                      name = brandObj.siteName;
                    }
                  })}
                  {name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        {props.array.map((element, index) => {
          const characterObject = charactersRight[element.characterName];
          return (
            <div
              key={characterObject}
              className="wrapper"
              style={{
                marginLeft: element.totalValue + props.raceProgress,
              }}
            >
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
