import useSound from "use-sound";
import { useState, useEffect } from "react";
import music from "./assets/mario_kart/music/pixelmusic.mp3";
import "./App.css";

export const MusicPlayer = () => {
  const [playing, setPlaying] = useState(false);
  const [song] = useState(music);
  const [play, { stop }] = useSound(song);

  const handleClick = () => {
    setPlaying((playing) => !playing);
  };

  useEffect(() => {
    playing ? play() : stop();
  }, [playing, play, stop]);

  useEffect(() => {
    setTimeout(() => {
      setPlaying(true);
    });
  }, []);

  return (
    <div className="musicContainer">
      <div
        onClick={() => {
          handleClick();
        }}
      >
        {playing ? (
          <button className="musicButton"> ⏸ </button>
        ) : (
          <button className="musicButton"> ▶️ </button>
        )}
      </div>
    </div>
  );
};
