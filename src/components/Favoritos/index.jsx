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
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import { useSelector, useDispatch } from "react-redux";
import { tablestyles } from "../../themes";
import { removeItem } from "../../store/favoritos";
import Play from "../Lista/Play";
import { pink } from "@mui/material/colors";
import Empty from "../Empty";

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

function index() {
  const favoritos = useSelector((state) => state.favoritos);

  const dispatch = useDispatch();

  function removeFromFav(id) {
    dispatch(removeItem(id));
  }

  return (
    <>
      {favoritos.length > 0 ? (
        <TableContainer sx={tablestyles} component={Box}>
          <Table>
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
              {favoritos.map((musica) => {
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
                    <Tooltip title="Prévia">
                      <Play start={start} pause={pause} icon={icon} />
                    </Tooltip>
                    <Tooltip title="Remover">
                      <DeleteIcon
                        style={{ ...icon, color: pink[600] }}
                        onClick={() => {
                          removeFromFav(musica.id);
                        }}
                      />
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
                      {segundoDuracao < 10
                        ? "0" + segundoDuracao
                        : segundoDuracao}
                    </StyledTableCell>
                    <StyledTableCell>{icons}</StyledTableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Empty>Não tem nada aqui... Adicione músicas na aba 'Descubra'!</Empty>
      )}
    </>
  );
}

export default index;
