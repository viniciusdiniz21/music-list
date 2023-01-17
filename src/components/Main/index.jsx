import React, { useEffect, useState } from "react";
import axios from "axios";
import Lista from "../Lista";
import Container from "@mui/material/Container";
import DrawerAppBar from "../Header";

function index() {
  const [musics, setMusics] = useState([]);
  const [currentItem, setCurrentItem] = React.useState(0);
  const limit = 10;

  useEffect(() => {
    getMusics();
  }, [currentItem]);

  function getMusics() {
    const options = {
      method: "GET",
      url: `https://deezerdevs-deezer.p.rapidapi.com/playlist/1001939451?index=${currentItem}&limit=${limit}`, //aplicar paginação com scroll infinito
      headers: {
        "X-RapidAPI-Key": "6d2c80091bmshb6d36c4fb8994f1p1e7544jsne12fc89f71d2",
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      },
    };
    axios
      .request(options)
      .then((response) => response.data.tracks.data)
      .then((newMusics) => {
        console.log(newMusics);
        return setMusics((prevMusics) => [...prevMusics, ...newMusics]);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <DrawerAppBar>
      {/*Resolver problema da primeira busca duplicada*/}
      <Lista
        list={musics}
        currentItem={currentItem}
        setCurrentItem={setCurrentItem}
        limit={limit}
      />
      ;
    </DrawerAppBar>
  );
}

export default index;
