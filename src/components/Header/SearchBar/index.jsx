import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import SearchIcon from "@mui/icons-material/Search";
import { SearchContext } from "../../../contexts/SearchContext";

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

function index() {
  const { search, setSearch, isSearched, setIsSearched } =
    React.useContext(SearchContext);

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Search>
        <StyledInputBase
          placeholder="Pesquisar..."
          inputProps={{ "aria-label": "search" }}
          onChange={(ev) => setSearch(ev.target.value)}
        />
      </Search>
      <Tooltip title="Fazer pesquisa">
        <SearchIcon sx={{ cursor: "pointer", ml: 1, mr: 2 }} />
      </Tooltip>
    </Box>
  );
}

export default index;
