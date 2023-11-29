import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import io from "socket.io-client";
import MainContext from "./contexts/MainContext";
import Hero from "./Components/Hero";
import ControllersList from "./Components/ControllersList";

const App = () => {
  const [count, setCount] = useState("");
  const [dec_lat, setDec_lat] = useState("");
  const [dec_lng, setDec_lng] = useState("");
  const [isValidLat, setIsValidLat] = useState(true);
  const [isValidLng, setIsValidLng] = useState(true);
  const [controllers, setControllers] = useState([]);
  const [socketData, setSocketData] = useState({});

  // controllers update modal states
  const [controllerUpdate, setControllerUpdate] = useState({});
  const [isValidLatUpdate, setIsValidLatUpdate] = useState(true);
  const [isValidLngUpdate, setIsValidLngUpdate] = useState(true);
  let tempStorage = controllers;
  const ip = "http://172.20.10.10";
  const client_port = ":5000";
  const server_port = ":3000";

  // Page Controls

  useEffect(() => {
    const socket = io.connect("http://172.20.10.10:3000");
    socket.on("statusUpdate", (data) => {
      console.log("Received real-time update:", data);
      setSocketData(data);
    });
    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  const validateInput = (value) => {
    const regex = /^\d{0,2}(?:\.\d{0,15})?$/;
    return regex.test(value);
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
  const renderEditModal = () => {
    return Object.keys(controllerUpdate).length !== 0 ? (
      <div className="update-container">
        <div className="container-column">
          <div className="exit-modal" onClick={exitUpdateModal}>
            X
          </div>
          <div className="controller-id">{controllerUpdate.controller_id}</div>
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
            {controllerUpdate.controller_status ? "Locked" : "Unlocked"}
          </div>
          <button onClick={sendUpdate}>
            {controllerUpdate.controller_status ? "Unlock" : "Lock"}
          </button>
          <div>
            Lock status: <b>controllerUpdate.lock_status</b>
          </div>
          <div>
            Alarm status: <b>controllerUpdate.alarm_status</b>
          </div>
        </div>
      </div>
    ) : (
      ""
    );
  };
  const sendUpdate = () => {
    const tempController = {
      ...controllerUpdate,
      controller_status: controllerUpdate.controller_status ? 0 : 1,
    };

    axios
      .put(
        ip + server_port + `/${tempController.controller_id}`,
        tempController
      )
      .then((res) => {
        console.log("Update request sent successfully:", res.data);
      })
      .catch((error) => {
        console.error("Error sending update request:", error);
      });

    setControllerUpdate(tempController);
  };
  const exitUpdateModal = () => {
    setControllerUpdate({});
  };
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(ip + server_port);
      setCount(response.data[0][0].count);
      tempStorage = response.data[1].map((controller) => controller);
      setControllers(tempStorage);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  return (
    <MainContext.Provider
      value={{
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
        server_port,
        validateInput,
        controllerUpdate,
        setControllerUpdate,
        controllers,
      }}
    >
      <div className="main-container">
        <div className="row">
          <Hero />
          <ControllersList />
          {renderEditModal()}
          <div className="row">
            <div className="admin_interface">
              <div className="admin_switch "> I/O mygtukas</div>
              <div className="admin_btn_list">
                <div className="admin_btn">Create database</div>
                <div className="admin_btn">Insert controller</div>
                <div className="admin_btn">Delete selected controller</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainContext.Provider>
  );
};

export default App;
