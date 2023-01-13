import React, { useState } from "react";
import { ImPlay3, ImPause2 } from "react-icons/im";

function index({ start, pause, icon }) {
  const [playing, setPlaying] = useState(false);
  return (
    <>
      {playing ? (
        <ImPause2
          style={icon}
          onClick={() => {
            setPlaying(false);
            pause();
          }}
        ></ImPause2>
      ) : (
        <ImPlay3
          style={icon}
          onClick={() => {
            setPlaying(true);
            start();
            setTimeout(() => pause(), 29000);
          }}
        ></ImPlay3>
      )}
    </>
  );
}

export default index;
