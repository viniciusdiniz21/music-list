import React, { useEffect, useState } from "react";
import axios from "axios";
import Lista from "../Lista";
import Container from "@mui/material/Container";
import DrawerAppBar from "../Header";

function index() {
  const [musics, setMusics] = useState([]);

  useEffect(() => {
    getMusics();
  }, []);

  function getMusics() {
    const options = {
      method: "GET",
      url: "https://deezerdevs-deezer.p.rapidapi.com/playlist/1001939451&index=0&limit=10", //aplicar paginação com scroll infinito
      headers: {
        "X-RapidAPI-Key": "6d2c80091bmshb6d36c4fb8994f1p1e7544jsne12fc89f71d2",
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      },
    };
    axios
      .request(options)
      .then((response) => {
        setMusics(response.data.tracks.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <DrawerAppBar>
      <Lista list={musics} />;
    </DrawerAppBar>
  );
}

export default index;
