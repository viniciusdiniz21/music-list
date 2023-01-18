import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Tooltip from "@mui/material/Tooltip";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, addItem } from "../../store/favoritos";
import Play from "./Play";
import { pink } from "@mui/material/colors";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#363636",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: theme.palette.common.white,
    backgroundColor: "#474747",
  },
}));

const icon = { fontSize: "1.4rem", cursor: "pointer" };
const td = {
  maxWidth: "220px",
};
const tp = {
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
};

function index({ list, currentItem, setCurrentItem, limit }) {
  const favoritos = useSelector((state) => state.favoritos);
  const dispatch = useDispatch();

  function addFav(id) {
    dispatch(addItem(id));
  }
  function removeFromFav(id) {
    dispatch(removeItem(id));
  }

  let isFav;
  const musicas = list.map((musica) => {
    const fav = favoritos.find((el) => el.id == musica.id);
    if (fav != undefined) isFav = true;
    else isFav = false;
    return {
      id: musica.id,
      titulo: musica.title,
      album: musica.album.title,
      autor: musica.artist.name,
      duracao: musica.duration,
      foto: musica.album.cover,
      audio: musica.preview,
      fav: isFav,
      link: musica.link,
    };
  });

  React.useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setCurrentItem((currentItem) => currentItem + limit);
      }
    });
    intersectionObserver.observe(document.querySelector("#sentinela"));
    return () => intersectionObserver.disconnect();
  }, []);

  return (
    <TableContainer sx={{ width: "80vw" }} component={Box}>
      <Table
        sx={{
          width: "100%",
          overflow: "hidden",
          borderCollapse: "collapse",
          borderRadius: "15px",
        }}
      >
        <TableHead>
          <TableRow>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell>NOME</StyledTableCell>
            <StyledTableCell>ALBÚM</StyledTableCell>
            <StyledTableCell>CANTOR</StyledTableCell>
            <StyledTableCell>DURAÇÃO</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {musicas.map((musica) => {
            let audio = new Audio(`${musica.audio}`);

            const start = () => {
              audio.play();
            };

            const pause = () => {
              audio.pause();
            };

            let minutoDuracao = Math.trunc(musica.duracao / 60);
            let segundoDuracao = musica.duracao % 60;

            const icons = (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <Tooltip title="Música completa">
                  <MusicNoteIcon sx={icon}>
                    <a
                      style={{
                        textDecoration: "none",
                        color: "white",
                      }}
                      href={musica.link}
                      target="_blank"
                    ></a>
                  </MusicNoteIcon>
                </Tooltip>
                <Play start={start} pause={pause} icon={icon} />

                <Tooltip title="Favoritar">
                  {musica.fav ? (
                    <FavoriteIcon
                      style={{ ...icon, color: pink[600] }}
                      onClick={() => {
                        removeFromFav(musica.id);
                      }}
                    />
                  ) : (
                    <FavoriteBorderIcon
                      style={{ ...icon, color: pink[600] }}
                      onClick={() => {
                        addFav(musica);
                      }}
                    />
                  )}
                </Tooltip>
              </div>
            );
            return (
              <TableRow
                key={musica.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell>
                  <Tooltip title={musica.titulo}>
                    <Avatar src={musica.foto} variant="rounded" />
                  </Tooltip>
                </StyledTableCell>
                <StyledTableCell sx={td}>
                  <p style={tp}>{musica.titulo}</p>
                </StyledTableCell>
                <StyledTableCell>{musica.autor}</StyledTableCell>
                <StyledTableCell sx={td}>
                  <p style={tp}>{musica.titulo}</p>
                </StyledTableCell>
                <StyledTableCell>
                  {minutoDuracao}:
                  {segundoDuracao < 10 ? "0" + segundoDuracao : segundoDuracao}
                </StyledTableCell>
                <StyledTableCell>{icons}</StyledTableCell>
              </TableRow>
            );
          })}
          <TableRow
            sx={{ backgroundColor: "green", height: "10px" }}
            id="sentinela"
          ></TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default index;
