import * as React from "react";
export const SearchContext = React.createContext();

export const SearchStorage = ({ children }) => {
  const [search, setSearch] = React.useState("");
  const [isSearched, setIsSearched] = React.useState(false);
  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,
        isSearched,
        setIsSearched,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
