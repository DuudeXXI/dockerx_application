import "../Styles/MainNavigation.scss";
import { elementHeight } from "../Resources/elementHeight";
import { useEffect } from "react";

const MainNavigation = () => {


  return (
    <div
      className="nav-container"
      style={{ height: elementHeight.mapAndNav.nav }}
    >
      <div className="buttons-container">
        <button className="lock-btn">Atrakinti</button>
        <button className="reserve-btn">Užrakinti</button>
      </div>
    </div>
  );
};

export default MainNavigation;
