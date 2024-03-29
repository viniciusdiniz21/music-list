import { useState } from "react";
import "./App.css";
import Main from "./components/Main";
import { store, persistor } from "./store/configureStore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ThemeOptions } from "./themes";
import { MusicStorage } from "./contexts/MusicsContext";
import { SearchStorage } from "./contexts/SearchContext";

const theme = createTheme(ThemeOptions);

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <PersistGate loading={null} persistor={persistor}>
          <MusicStorage>
            <SearchStorage>
              <RouterProvider router={router}>
                <CssBaseline />
                <Main />
              </RouterProvider>
            </SearchStorage>
          </MusicStorage>
        </PersistGate>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
