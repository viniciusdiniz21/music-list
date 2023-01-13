import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "../../themes";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { FaDeezer } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, addItem } from "../../store/favoritos";
import Play from "./Play";

const TableRow = styled.tr`
  text-align: left;
  height: 50px;

  &:hover {
    background-color: ${colors.primary};
  }
`;
const TableBody = styled.tbody`
  background-color: ${colors.secondary};
  margin: 0;
  border: none;
  font-size: 0.8rem;
`;

const TableHead = styled.thead`
  background-color: ${colors.primary};
  margin: 0;
  border: none;
`;

const Table = styled.table`
  margin-top: 15px;
  width: 100%;
  text-align: center;
  overflow: hidden;
  border-collapse: collapse;
  border: 3px solid red;
  border-radius: 15px;
`;

const TableCell = styled.td`
  color: ${colors.paper};
  padding: 5px 10px;

  border-bottom: 1px solid #5f5b5b;
`;

const AvatarPic = styled.img`
  margin: auto 0;
  border-radius: 50%;
  width: 35px;
  height: 35px;
`;

const icon = { fontSize: "1.4rem", cursor: "pointer" };

function index({ list }) {
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
      foto: musica.album.cover,
      audio: musica.preview,
      fav: isFav,
      link: musica.link,
    };
  });

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          <TableCell>NOME</TableCell>
          <TableCell>ALBÚM</TableCell>
          <TableCell></TableCell>
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

          return (
            <TableRow key={musica.id}>
              <TableCell>
                <AvatarPic src={musica.foto} />
              </TableCell>
              <TableCell>
                <p>{musica.titulo}</p>
              </TableCell>
              <TableCell>
                <p>{musica.album}</p>
              </TableCell>
              <TableCell>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <a
                    style={{
                      textDecoration: "none",
                      color: "white",
                      marginTop: "7px",
                      marginRight: "5px",
                    }}
                    href={musica.link}
                    target="_blank"
                  >
                    <FaDeezer style={icon} />
                  </a>
                  <Play start={start} pause={pause} icon={icon} />
                  {musica.fav ? (
                    <AiFillStar
                      style={{ ...icon, color: colors.warning }}
                      onClick={() => {
                        removeFromFav(musica.id);
                      }}
                    />
                  ) : (
                    <AiOutlineStar
                      style={{ ...icon, color: colors.warning }}
                      onClick={() => {
                        addFav(musica);
                      }}
                    />
                  )}
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default index;
