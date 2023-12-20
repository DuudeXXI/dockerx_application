import intro_image from "../Media/dockerx_animation_1.png";
import "../Styles/Intro.scss";

const Intro = () => {
  
  return (
    <div className={`intro-container`}>
      <div className="intro-image">
        <img src={intro_image} alt="biker on a bicycle in front of map" />
      </div>
      <h1 className="intro-title">DOCKER<sup>x</sup>
      </h1>
    </div>
  );
};

export default Intro;
