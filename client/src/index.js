import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

// reducer
import currLocationReducer from "./Reducers/currLocationReducer"
import selectedStationRecuder from "./Reducers/selectedStationRecuder";

const store = configureStore({
  reducer: {
    currentLocation: currLocationReducer,
    selectedStation: selectedStationRecuder,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
      <App />
    </Provider>
);
reportWebVitals();
