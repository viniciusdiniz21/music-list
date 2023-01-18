import React, { useEffect, useState } from "react";
import Lista from "../Lista";

import DrawerAppBar from "../Header";
import api from "../../services/api";
import { MusicsContext } from "../../contexts/MusicsContext";
import { SearchContext } from "../../contexts/SearchContext";

function index() {
  const [currentItem, setCurrentItem] = React.useState(0);

  const { music, setMusic } = React.useContext(MusicsContext);
  const { search, setSearch } = React.useContext(SearchContext);

  const limit = 10;

  useEffect(() => {
    getMusics();
  }, [currentItem]);

  //USE EFFECT PARA RESETAR CURRENT ITEM E MUSIC QUANDO ALTERAR PARA SEARCHED

  async function handleSearchMusics() {
    setCurrentItem(0);
    setMusic([]);
    try {
      const response = await api.get(
        `search/${search}?index=${currentItem}&limit=${limit}`
      );
      setMusic(response.data.tracks.data);
    } catch (error) {}
  }

  async function getMusics() {
    try {
      const response = await api.get(
        `playlist/1001939451?index=${currentItem}&limit=${limit}`
      );
      let newMusics = response.data.tracks.data;
      setMusic((prevMusics) => [...prevMusics, ...newMusics]);
    } catch (error) {}
  }
  async function getSearchMusics() {
    try {
      const response = await api.get(
        `search/${search}?index=${currentItem}&limit=${limit}`
      );
      let newMusics = response.data.tracks.data;
      setMusic((prevMusics) => [...prevMusics, ...newMusics]);
    } catch (error) {}
  }

  return (
    <DrawerAppBar>
      {/*Resolver problema da primeira busca duplicada*/}
      <Lista
        list={music}
        currentItem={currentItem}
        setCurrentItem={setCurrentItem}
        limit={limit}
      />
    </DrawerAppBar>
  );
}

export default index;
