import "../Styles/MainNavigation.scss";
import { elementHeight } from "../Resources/elementHeight";
import nav_figure from "../Media/nav_figure.svg";
import nav_bicycle from "../Media/nav_bicycle.svg";

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
      <div className="nav-figure">
        <div className="figure-image">
          <img src={nav_figure} alt="navigation figure" />
          <div className="bicycle-image">
            <img src={nav_bicycle} alt="bicycle image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNavigation;
