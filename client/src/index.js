import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { configureStore } from "@reduxjs/toolkit";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider } from "react-redux";

// reducer
import currLocationReducer from "./Reducers/currLocationReducer";
import selectedStationRecuder from "./Reducers/selectedStationRecuder";

const store = configureStore({
  reducer: {
    currentLocation: currLocationReducer,
    selectedStation: selectedStationRecuder,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain={"dev-cwx46julrq20k2w5.eu.auth0.com"}
    clientId={"a9Niv2CIC9j1V7HodHM0wvtpfPL9zRdm"}
    authorizationParams={{
      redirect_uri: "http://localhost:5005",
    }}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </Auth0Provider>
);
reportWebVitals();
