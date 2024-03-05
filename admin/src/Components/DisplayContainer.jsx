import "../Styles/DisplayContainer.scss";
import Hero from "./Hero";
import ControllersList from "./ControllersList";
const DisplayContainer = () => {
  return (
    <div className="display-container">
      <div className="top-section"></div>
      <div className="center-section">
        <Hero />
        <ControllersList/>
      </div>
    </div>
  );
};

export default DisplayContainer;
