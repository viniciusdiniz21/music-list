import React, { useState, useContext, useEffect } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { Tooltip } from "@mui/material";
import { MusicsContext } from "../../../contexts/MusicsContext";

function TooltipParent({ children }) {
  return <Tooltip title="Prévia">{children}</Tooltip>;
}

function index({ icon, id, audioUrl }) {
  const [playing, setPlaying] = useState(false);
  const [audio, setAudio] = useState(new Audio(audioUrl));
  const { currentPlay, setCurrentPlay } = useContext(MusicsContext);

  function start() {
    audio.play();
  }

  function pause() {
    audio.pause();
  }

  useEffect(() => {
    if (currentPlay != id) {
      stop();
    }
  }, [currentPlay]);

  function play() {
    setCurrentPlay(id);
    setPlaying(true);
    start();
    setTimeout(() => stop(), 20000);
  }

  function stop() {
    setPlaying(false);
    pause();
  }

  return (
    <>
      <audio src={audio} />
      {playing ? (
        <TooltipParent>
          <PauseIcon
            style={{ ...icon, color: "#00000" }}
            onClick={() => {
              stop();
            }}
          ></PauseIcon>
        </TooltipParent>
      ) : (
        <TooltipParent>
          <PlayArrowIcon
            style={{ ...icon, color: "#00000" }}
            onClick={() => {
              play();
            }}
          ></PlayArrowIcon>
        </TooltipParent>
      )}
    </>
  );
}

export default index;
