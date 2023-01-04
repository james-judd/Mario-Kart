// import useSound from "use-sound";
// import music from "./assets/mario_kart/music/music";
import "./App.css";
import "./TopPage.css";
import { useEffect } from "react";

export const TopPage = (props) => {
  const handleClick = () => {
    props.changePage();
  };

  useEffect(() => {
    setTimeout(() => {
      handleClick();
    }, 10000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <button
        className="button-style"
        onClick={() => {
          props.changePage();
        }}
      >
        Click to Start
      </button>
    </div>
  );
};
