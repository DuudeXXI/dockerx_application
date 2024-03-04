import "../Styles/DisplayContainer.scss";
import Hero from "./Hero";
const DisplayContainer = () => {
  return (
    <div className="display-container">
      <div className="top-section"></div>
      <div className="center-section">
        <Hero />
      </div>
    </div>
  );
};

export default DisplayContainer;
