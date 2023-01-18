import * as React from "react";
export const MusicsContext = React.createContext();

export const MusicStorage = ({ children }) => {
  const [music, setMusic] = React.useState([]);
  return (
    <MusicsContext.Provider
      value={{
        music,
        setMusic,
      }}
    >
      {children}
    </MusicsContext.Provider>
  );
};
