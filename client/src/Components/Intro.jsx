import intro_image from "../Media/dockerx_animation_1.png";
import "../Styles/Intro.scss";

// import { useSelector, useDispatch } from "react-redux";
// import { visibility } from '../Reducers/Intro'
const Intro = () => {
  
  //redux example
  // const intro = useSelector((state) => state.intro.value);
  // const payload = { timeSet: "5000" }
  // const dispatch = useDispatch()
  return (
    <div className={`intro-container`}>
      <div className="intro-image">
        <img src={intro_image} alt="biker on a bicycle in front of map" />
      </div>
      {/* <button onClick={() => {
        dispatch(visibility(payload))
      }}>labas</button> */}
      <h1 className="intro-title">DOCKER<sup>x</sup>
      </h1>
    </div>
  );
};

export default Intro;
