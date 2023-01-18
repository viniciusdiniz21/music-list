import axios from "axios";

const api = axios.create({
  baseURL: "https://deezerdevs-deezer.p.rapidapi.com/",
  headers: {
    "X-RapidAPI-Key": "6d2c80091bmshb6d36c4fb8994f1p1e7544jsne12fc89f71d2",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
});

export default api;
