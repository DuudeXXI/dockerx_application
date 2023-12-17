import "./Styles/App.scss";
import Intro from "./Components/Intro";
import MainMap from "./Components/MainMap";
import { useEffect, useState } from "react";
import MainNavigation from "./Components/MainNavigation";

function App() {

  return (
    <div className="layout">
      {/* <Intro/> */}
      <MainMap/>
      <MainNavigation/>
    </div>
  );
}

export default App;
