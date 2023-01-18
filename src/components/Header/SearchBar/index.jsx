import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { SearchContext } from "../../../contexts/SearchContext";
import { MusicsContext } from "../../../contexts/MusicsContext";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const icon = { cursor: "pointer", ml: 1, mr: 2 };

function index() {
  const { search, setSearch, isSearched, setIsSearched } =
    React.useContext(SearchContext);
  const { music, setMusic, currentItem, setCurrentItem } =
    React.useContext(MusicsContext);

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Search>
        <StyledInputBase
          placeholder="Pesquisar..."
          inputProps={{ "aria-label": "search" }}
          value={search}
          onChange={(ev) => setSearch(ev.target.value)}
        />
      </Search>
      {isSearched ? (
        <Tooltip title="Cancelar pesquisa">
          <ClearIcon
            sx={icon}
            onClick={() => {
              setCurrentItem(0);
              setIsSearched(false);
              setSearch("");
              setMusic([]);
            }}
          />
        </Tooltip>
      ) : (
        <Tooltip title="Fazer pesquisa">
          <SearchIcon
            sx={icon}
            onClick={() => {
              if (search.length > 0) {
                setCurrentItem(0);
                setIsSearched(true);
              }
            }}
          />
        </Tooltip>
      )}
    </Box>
  );
}

export default index;
