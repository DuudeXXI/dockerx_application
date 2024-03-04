import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import io from "socket.io-client";
import MainContext from "./contexts/MainContext";
import ControllersList from "./Components/ControllersList";
import EditModal from "./Components/EditModal";
import Sidebar from "./Components/Sidebar";
import DisplayContainer from "./Components/DisplayContainer";
import Footer from "./Components/Footer";

const App = () => {
  const [count, setCount] = useState("");
  const [dec_lat, setDec_lat] = useState("");
  const [dec_lng, setDec_lng] = useState("");
  const [isValidLat, setIsValidLat] = useState(true);
  const [isValidLng, setIsValidLng] = useState(true);
  const [controllers, setControllers] = useState([]);
  const [socketData, setSocketData] = useState({});
  const [refresh, setRefresh] = useState(false);
  // controllers update modal states
  const [controllerUpdate, setControllerUpdate] = useState({});
  const [isValidLatUpdate, setIsValidLatUpdate] = useState(true);
  const [isValidLngUpdate, setIsValidLngUpdate] = useState(true);
  let tempStorage = controllers;
  const ip = "http://192.168.33.41";
  const server_port = ":3002";
  // FUNCTIONS
  const socketChannels = () => {
    const socket = io.connect(ip + server_port);
    socket.on("statusUpdate", (data) => {
      console.log("Received real-time update:", data);
      setSocketData(data);
    });
    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

    setRefresh(true);
    return () => {
      socket.disconnect();
    };
  };

  // Page Controls
  useEffect(() => {
    socketChannels();
  }, []);
  useEffect(() => {
    getData();
  }, [refresh]);
  const validateInput = (value) => {
    const regex = /^\d{0,2}(?:\.\d{0,15})?$/;
    return regex.test(value);
  };

  const getData = async () => {
    try {
      const response = await axios.get(ip + server_port);
      setCount(response.data[0][0].count);
      tempStorage = response.data[1].map((controller) => controller);
      setControllers(tempStorage);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
    setRefresh(false);
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
        setRefresh,
        isValidLatUpdate,
        isValidLngUpdate,
        server_port,
        setIsValidLatUpdate,
        setIsValidLngUpdate
      }}
    >
      <div className="main-container">
        <Sidebar/>
        <DisplayContainer/>
        <Footer/>
      </div>
    </MainContext.Provider>
  );
};

export default App;
