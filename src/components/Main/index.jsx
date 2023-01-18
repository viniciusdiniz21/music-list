import React, { useEffect, useState } from "react";
import Lista from "../Lista";

import DrawerAppBar from "../Header";
import api from "../../services/api";
import { MusicsContext } from "../../contexts/MusicsContext";
import { SearchContext } from "../../contexts/SearchContext";

function index() {
  const [loading, setLoading] = React.useState(true);

  const {
    music,
    setMusic,
    currentItem,
    setCurrentItem,
    currentPlay,
    setCurrentPlay,
  } = React.useContext(MusicsContext);
  const { search, setSearch, isSearched, setIsSearched } =
    React.useContext(SearchContext);

  const limit = 10;

  useEffect(() => {
    setLoading(true);
    setCurrentItem(0);
    setMusic([]);
  }, [isSearched]);

  useEffect(() => {
    isSearched ? getSearchMusics() : getMusics();
  }, [currentItem, isSearched]);

  //USE EFFECT PARA RESETAR CURRENT ITEM E MUSIC QUANDO ALTERAR PARA SEARCHED

  async function getMusics() {
    setIsSearched(false);
    try {
      const response = await api.get(
        `playlist/1001939451?index=${currentItem}&limit=${limit}`
      );
      let newMusics = response.data.tracks.data;
      setMusic((prevMusics) => [...prevMusics, ...newMusics]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }
  async function getSearchMusics() {
    try {
      const response = await api.get(
        `search?q=${search}&index=${currentItem}&limit=${limit}`
      );
      let newMusics = response.data.data;
      setMusic((prevMusics) => [...prevMusics, ...newMusics]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <DrawerAppBar>
      {/*Resolver problema da primeira busca duplicada*/}
      {loading ? (
        <h4 style={{ color: "white", fontWheight: 500 }}>Carregando . . .</h4>
      ) : (
        <Lista
          list={music}
          currentPlay={currentPlay}
          setCurrentPlay={setCurrentPlay}
          currentItem={currentItem}
          setCurrentItem={setCurrentItem}
          limit={limit}
          search={search}
        />
      )}
    </DrawerAppBar>
  );
}

export default index;
