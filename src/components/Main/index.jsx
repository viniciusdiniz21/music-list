import React, { useEffect, useState } from "react";
import Lista from "../Lista";

import DrawerAppBar from "../Header";
import api from "../../services/api";

function index() {
  const [musics, setMusics] = useState([]);
  const [currentItem, setCurrentItem] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  const limit = 10;

  useEffect(() => {
    getMusics();
  }, [currentItem]);

  async function getMusics() {
    setLoading(true);
    try {
      const response = await api.get(
        `playlist/1001939451?index=${currentItem}&limit=${limit}`
      );
      let newMusics = response.data.tracks.data;
      setMusics((prevMusics) => [...prevMusics, ...newMusics]);
    } catch (error) {
      setLoading(false);
    }
    setLoading(false);
  }

  return (
    <DrawerAppBar>
      {/*Resolver problema da primeira busca duplicada*/}
      <Lista
        list={musics}
        currentItem={currentItem}
        setCurrentItem={setCurrentItem}
        limit={limit}
        loading={loading}
      />
    </DrawerAppBar>
  );
}

export default index;
