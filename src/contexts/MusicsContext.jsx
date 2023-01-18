import * as React from "react";
export const MusicsContext = React.createContext();

export const MusicStorage = ({ children }) => {
  const [music, setMusic] = React.useState([]);
  const [currentItem, setCurrentItem] = React.useState(0);
  const [currentPlay, setCurrentPlay] = React.useState(0);
  return (
    <MusicsContext.Provider
      value={{
        music,
        setMusic,
        currentItem,
        setCurrentItem,
        currentPlay,
        setCurrentPlay,
      }}
    >
      {children}
    </MusicsContext.Provider>
  );
};
