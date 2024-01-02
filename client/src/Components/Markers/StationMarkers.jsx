import { useState, useEffect } from "react";
import { Marker } from "@react-google-maps/api";
import axios from "axios";
import io from "socket.io-client";
// redux
import { useDispatch } from "react-redux";
import { updateSelectedStation } from "../../Reducers/selectedStationRecuder";
// redux

const StationMarkers = () => {
  const ip = "http://192.168.1.85";
  const server_port = ":3000";

  const [stationList, setStationList] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    getData();
    socketChannels();
  }, []);

  const getData = () => {
    axios
      .get(process.env.REACT_APP_IP_ADDRESS + process.env.REACT_APP_SERVER_PORT)
      .then((response) => {
        const tempStorage = response.data[1].map((controller) => ({
          ...controller,
          dec_lat: parseFloat(controller.dec_lat),
          dec_lng: parseFloat(controller.dec_lng),
        }));
        setStationList(tempStorage);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  // FUNCTIONS
  const socketChannels = () => {
    const socket = io.connect(ip + server_port);

    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

    socket.on("reserve", (data) => {
      console.log("Received real-time update:", data);
    });

    socket.on("statusUpdateConfirmation", (data) => {
      console.log("Received real-time update:", data);
    });

    return () => {
      socket.disconnect();
    };
  };
  const sendStatusChange = (data) => {
    const socket = io.connect(ip + server_port);
    console.log(data);
    const controller_status = data.controller_status ? 0 : 1;
    data = { ...data, controller_status };
    const updatedList = stationList.map((station) =>
      station.controller_id == data.controller_id ? data : station
    );
    setStationList(updatedList);
    socket.emit("reserve", data);
  };
  const handleMarkerClick = (station) => {
    dispatch(updateSelectedStation(station));
    sendStatusChange(station);
  };

  return stationList?.map((station) => (
    <Marker
      key={station.controller_id}
      position={{
        lat: station.dec_lat,
        lng: station.dec_lng,
      }}
      label={station.controller_id.toString()}
      onClick={() => handleMarkerClick(station)}
      icon={{
        path: window.google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
        fillColor: station.controller_status === 1 ? "#000000" : "#00ff00",
        fillOpacity: 0.5,
        strokeWeight: 0.3,
        scale: 10,
      }}
    />
  ));
};

export default StationMarkers;
