import "../Styles/MainNavigation.scss";
import { elementHeight } from "../Resources/elementHeight";
import nav_figure from "../Media/nav_figure.svg";
import nav_bicycle from "../Media/nav_bicycle.svg";
// redux
import { useSelector } from "react-redux";
import { selectStation } from "../Reducers/selectedStationRecuder";
// redux
const MainNavigation = () => {
  const station = useSelector(selectStation);

  return (
    <div
      className="nav-container"
      style={{
        height: !station
          ? elementHeight.mapAndNav.nav
          : elementHeight.mapAndNav.navWData,
      }}
    >
      {Boolean(station) ? (
        <>
          <div className="station-data-container">
            content
          </div>
          <div className="line"></div>
          <div className="buttons-container">
            <button className="lock-btn">Atrakinti</button>
            <button className="reserve-btn">Užrakinti</button>
          </div>
        </>
      ) : null}
      <div className="figure-image" data-station={Boolean(station)}>
        <img src={nav_figure} alt="navigation figure" />
        <div className="bicycle-image">
          <img src={nav_bicycle} alt="bicycle image" />
        </div>
      </div>
    </div>
  );
};

export default MainNavigation;
