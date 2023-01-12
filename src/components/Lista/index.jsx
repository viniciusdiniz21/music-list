import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "../../themes";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { CiPlay1 } from "react-icons/ci";

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
  border-radius: 8px;
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
        {list.map((musica) => {
          console.log(musica);
          return (
            <TableRow>
              <TableCell>
                <AvatarPic src={musica.album.cover} />
              </TableCell>
              <TableCell>
                <p>{musica.title}</p>
              </TableCell>
              <TableCell>
                <p>{musica.album.title}</p>
              </TableCell>
              <TableCell>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <CiPlay1 style={icon} />

                  <AiOutlineStar style={icon} />
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
