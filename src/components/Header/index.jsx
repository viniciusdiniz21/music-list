import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import { useLocation, useNavigate } from "react-router-dom";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSelector } from "react-redux";
import { ListItemIcon } from "@mui/material";
import SearchBar from "./SearchBar";

const drawerWidth = 240;

function DrawerAppBar({ window, children }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const favoritos = useSelector((state) => state.favoritos);

  const location = useLocation();

  let qtdFav = favoritos.length;

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const navigate = useNavigate();

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Fake-Deezer
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          {location.pathname != "/favoritos" && <SearchBar />}
        </ListItem>
        <ListItem
          onClick={() => {
            navigate("../");
          }}
          disablePadding
        >
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemIcon>
              <MusicNoteIcon />
            </ListItemIcon>
            <ListItemText primary={"Descubra"} />
          </ListItemButton>
        </ListItem>
        <ListItem
          onClick={() => {
            navigate("/favoritos");
          }}
          disablePadding
        >
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemIcon>
              <FavoriteIcon />
            </ListItemIcon>
            <ListItemText primary={"Favoritos"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Fake-Deezer
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            {location.pathname != "/favoritos" && <SearchBar />}
            <Button
              onClick={() => {
                navigate("../");
              }}
              color="secondary"
              startIcon={<MusicNoteIcon />}
              sx={{ color: "#fff" }}
            >
              Descubra
            </Button>
            <Badge badgeContent={qtdFav} color="secondary">
              <Button
                onClick={() => {
                  navigate("/favoritos");
                }}
                color="secondary"
                startIcon={<FavoriteIcon />}
                sx={{ color: "#fff" }}
              >
                Favoritos
              </Button>
            </Badge>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Container
          maxWidth="lg"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {children}
        </Container>
      </Box>
    </Box>
  );
}

export default DrawerAppBar;
