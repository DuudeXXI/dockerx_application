import { useContext } from "react";
import MainContext from "../contexts/MainContext";
import axios from "axios";

const Hero = () => {
  const {
    count,
    dec_lat,
    setDec_lat,
    dec_lng,
    setDec_lng,
    isValidLat,
    setIsValidLat,
    isValidLng,
    setIsValidLng,
    ip,
    validateInput,
    server_port,
    setRefresh
  } = useContext(MainContext);

  // FUNCTIONS
  const handleInputLat = (event) => {
    let { value } = event.target;
    value = value.replace(/,/g, ".");
    setIsValidLat(validateInput(value));
    if (validateInput(value)) {
      setDec_lat(value);
    }
  };
  const handleInputLng = (event) => {
    let { value } = event.target;
    value = value.replace(/,/g, ".");
    setIsValidLng(validateInput(value));
    if (validateInput(value)) {
      setDec_lng(value);
    }
  };
  const sendPost = () => {
    axios
      .post(ip + server_port + "/register", {
        dec_lat,
        dec_lng,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
      setRefresh(true);
  };

  return (
    <div className="hero">
      <div className="hero-text-wrap">
      <h2>DockerX</h2>
      <p>Add Station to a Lattitude/Longitude location</p>
      </div>
      <div className="form-container">
        <div className="form">
          <div className="input-wrap">
          <div className="text-field-wrap">
          <input
            className="text-field"
            placeholder="latitude"
            value={dec_lat}
            onChange={handleInputLat}
          />
          {!isValidLat && (
            <p style={{ color: "red" }}>Use correct format: 00.000...</p>
          )}
          </div>
            <div className="text-field-wrap">
            <input
            className="text-field"
            placeholder="longitude"
            value={dec_lng}
            onChange={handleInputLng}
          />
          {!isValidLng && (
            <p style={{ color: "red" }}>Use correct format: 00.000...</p>
          )}
          </div>
            </div>
          <button onClick={sendPost}>Add controller</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
