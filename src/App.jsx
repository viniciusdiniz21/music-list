import { useState } from "react";
import "./App.css";
import Main from "./components/Main";
import { store, persistor } from "./store/configureStore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router}>
            <Main />
          </RouterProvider>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
