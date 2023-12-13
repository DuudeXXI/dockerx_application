import "./Styles/App.scss";
import Intro from "./Components/Intro";
import MainMap from "./Components/MainMap";
import { useEffect, useState } from "react";

function App() {

  return (
    <div className="layout">
      {/* <Intro/> */}
      <MainMap/>
    </div>
  );
}

export default App;
