import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Mapsius from "./Components/Mapsius";

const App = () => {
  const [count, setCount] = useState("");
  const [dec_lat, setDec_lat] = useState("");
  const [dec_lng, setDec_lng] = useState("");
  const [isValidLat, setIsValidLat] = useState(true);
  const [isValidLng, setIsValidLng] = useState(true);
  const [controllers, setControllers] = useState([]);
  // controllers update modal states
  const [controllerUpdate, setControllerUpdate] = useState({});
  const [isValidLatUpdate, setIsValidLatUpdate] = useState(true);
  const [isValidLngUpdate, setIsValidLngUpdate] = useState(true);
  let controllers_state = 0;
  let tempStorage = controllers;
  const serverURL = "http://100.101.71.38:3000/";

  // Page Controls
  const [currentPage, setCurrentPage] = useState(1);
  const controllersPerPage = 5;

  const indexOfLastController = currentPage * controllersPerPage;
  const indexOfFirstController = indexOfLastController - controllersPerPage;
  const currentControllers = controllers.slice(
    indexOfFirstController,
    indexOfLastController
  );


  const validateInput = (value) => {
    const regex = /^\d{0,2}(?:\.\d{0,15})?$/;
    return regex.test(value);
  };
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
  const handleUpdateLat = (event) => {
    let { value } = event.target;
    value = value.replace(/,/g, ".");
    setIsValidLatUpdate(validateInput(value));
    if (validateInput(value)) {
      setControllerUpdate((controller) => ({
        ...controller,
        dec_lat: value,
      }));
    }
  };
  const handleUpdateLng = (event) => {
    let { value } = event.target;
    value = value.replace(/,/g, ".");
    setIsValidLngUpdate(validateInput(value));
    if (validateInput(value)) {
      setControllerUpdate((controller) => ({
        ...controller,
        dec_lng: value,
      }));
    }
  };

  const renderPagination = () => {
    const pageNumbers = Math.ceil(controllers.length / controllersPerPage);

    return (
      <div className="page-nav-container">
        {currentPage > 1 && (
          <button onClick={() => setCurrentPage(currentPage - 1)}>
            Previous
          </button>
        )}

        {Array.from({ length: pageNumbers }, (_, index) => index + 1).map(
          (number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              style={{ fontWeight: number === currentPage ? "bold" : "normal" }}
            >
              {number}
            </button>
          )
        )}

        {currentPage < pageNumbers && (
          <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
        )}
      </div>
    );
  };
  // Page Controls end

  const renderControllersList = () => {
    return (
      <table className="controllers-list">
        <tbody>
          <tr className="controller-line head">
            <td className="controller-cell">Update</td>
            <td className="controller-cell">ID</td>
            <td className="controller-cell">dec_latitude</td>
            <td className="controller-cell">del_longitude</td>
            <td className="controller-cell">status</td>
          </tr>
          {currentControllers?.map((controller) => (
            <tr className="controller-line" key={controller.id}>
              <td className="controller-cell">
                <button
                  controller={controller}
                  onClick={(e) => {
                    setControllerUpdate(controller);
                  }}
                >
                  +
                </button>
              </td>
              <td className="controller-cell">{controller.id}</td>
              <td className="controller-cell">{controller.dec_lat}</td>
              <td className="controller-cell">{controller.dec_lng}</td>
              <td className="controller-cell">{controller.controler_status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  const renderHero = () => {
    return (
      <div className="wrapper">
        <h2>Tempo</h2>
        <p>
          Take it easy. We will take care of your ride <br />
          Already counting: <br />
          <b>{count.toString().length <= 0 ? "Nėra" : count}</b>
          <br /> Stations!
        </p>
        <div className="form-container">
          <div className="form">
            <input
              className="text-field"
              placeholder="latitude"
              value={dec_lat}
              onChange={handleInputLat}
            />
            {!isValidLat && (
              <p style={{ color: "red" }}>Use correct format: 00.000...</p>
            )}
            <input
              className="text-field"
              placeholder="longitude"
              value={dec_lng}
              onChange={handleInputLng}
            />
            {!isValidLng && (
              <p style={{ color: "red" }}>Use correct format: 00.000...</p>
            )}
            <button onClick={sendPost}>Add controller</button>
          </div>
        </div>
      </div>
    );
  };

  const sendPost = () => {
    console.log("hello world");
    axios
      .post(serverURL + "register", {
        dec_lat,
        dec_lng,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    controllers_state = 0;
  };
  const sendUpdate = () => {
    controllers_state = 0;
    const tempController = {
      ...controllerUpdate,
      controler_status: controllerUpdate.controler_status ? 0 : 1,
    };

    axios
      .put(serverURL + tempController.id, tempController)
      .then((res) => {
        console.log("Update request sent successfully:", res.data);
      })
      .catch((error) => {
        console.error("Error sending update request:", error);
      });

    if (!controllers_state) {
      axios
        .get(serverURL)
        .then((res) => {
          setCount(res.data[0][0].count);
          setControllers(res.data[1].map((controller) => controller));
        })
        .catch((err) => {
          console.log(err);
        });
      controllers_state = 1;
    } else {
      return;
    }

    setControllerUpdate(tempController);
  };
  const exitUpdateModal = () => {
    setControllerUpdate({});
  }
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(serverURL)
      setCount(response.data[0][0].count);
      tempStorage = response.data[1].map((controller) => controller);
      setControllers(tempStorage);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };
  
  return (
    <div>
      <div className="main-container">
        {renderHero()}
        {renderControllersList()}
        {renderPagination()}
        <Mapsius></Mapsius>
        {Object.keys(controllerUpdate).length !== 0 ? (
          <div className="update-container">
            <div className="container-column">
              <div className="exit-modal" onClick={exitUpdateModal}>X</div>
              <div className="controller-id">{controllerUpdate.id}</div>
              <input
                type="text"
                placeholder="Latitude"
                value={controllerUpdate.dec_lat}
                onChange={handleUpdateLat}
              />
              {!isValidLatUpdate && (
                <p style={{ color: "red" }}>Use correct format: 00.000...</p>
                )}
              <input
                type="text"
                placeholder="Longitude"
                value={controllerUpdate.dec_lng}
                onChange={handleUpdateLng}
                />
              {!isValidLngUpdate && (
                <p style={{ color: "red" }}>Use correct format: 00.000...</p>
                )}
              <div className="status">
                {controllerUpdate.controler_status ? "Locked" : "Unlocked"}
              </div>
              <button onClick={sendUpdate}>
                {controllerUpdate.controler_status ? "Unlock" : "Lock"}
              </button>
            </div>
          </div>
        ) : (
          ""
          )}
      </div>
    </div>
  );
};

export default App;
