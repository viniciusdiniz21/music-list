import { createBrowserRouter } from "react-router-dom";
import Favoritos from "../pages/Favoritos";
import MainPage from "../pages/Main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/favoritos",
    element: <Favoritos />,
  },
]);

export default router;
