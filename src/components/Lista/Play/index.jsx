import React, { useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { Tooltip } from "@mui/material";

function TooltipParent({ children }) {
  return <Tooltip title="Prévia">{children}</Tooltip>;
}

function index({ start, pause, icon }) {
  const [playing, setPlaying] = useState(false);
  return (
    <>
      {playing ? (
        <TooltipParent>
          <PauseIcon
            style={{ ...icon, color: "#00000" }}
            onClick={() => {
              setPlaying(false);
              pause();
            }}
          ></PauseIcon>
        </TooltipParent>
      ) : (
        <TooltipParent>
          <PlayArrowIcon
            style={{ ...icon, color: "#00000" }}
            onClick={() => {
              setPlaying(true);
              start();
              setTimeout(() => pause(), 29000);
            }}
          ></PlayArrowIcon>
        </TooltipParent>
      )}
    </>
  );
}

export default index;
