import "../Styles/MainNavigation.scss";
import { elementHeight } from "../Resources/elementHeight";
import nav_figure from "../Media/nav_figure.svg";
import nav_bicycle from "../Media/nav_bicycle.svg";
import info_icon from "../Media/info_icon.svg"
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
            <div className="primary">
              <div className="image"></div>
              <div className="text">DOK093</div>
            </div>
            <div className="station-data">
              <div className="status">
                Stat<div className="pseudo-label">Status</div>
              </div>
              <div className="type">
                Type <div className="pseudo-label">Type</div>
              </div>
              <div className="occupancy">
                3 <div className="pseudo-label">availability</div>
              </div>
            </div>
              <div className="payment-container">
                <div className="pricing">
                  <div className="price-title">Pay as you go</div>
                  <div className="price">0.12E/min</div>
                </div>
                <div className="info-icon"><img src={info_icon} /></div>
              </div>
          </div>
          <div className="buttons-container">
            <button className="lock-btn">Lock</button>
            <button className="reserve-btn">Reserve</button>
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
