import "../Styles/DisplayContainer.scss";
import Hero from "./Hero";
import ControllersList from "./ControllersList";
const DisplayContainer = () => {
  return (
    <div className="display-container">
      <div className="top-section">
      <Hero />
      </div>
      <div className="center-section">
        <ControllersList/>
      </div>
    </div>
  );
};

export default DisplayContainer;
