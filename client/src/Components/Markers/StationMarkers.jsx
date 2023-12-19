import { useState, useEffect } from "react";
import { Marker } from "@react-google-maps/api";
import axios from "axios";

const StationMarkers = () => {
  const [stationList, setStationList] = useState(null);

  useEffect(() => {
    getData();
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
        console.log(tempStorage);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return stationList?.map((station) => (
    <Marker
      key={station.controller_id}
      position={{
        lat: station.dec_lat,
        lng: station.dec_lng,
      }}
      label={station.controller_id.toString()}
      // icon={{
      //   url: "path-to-your-marker-icon.png",
      //   scaledSize: new window.google.maps.Size(30, 30),
      // }}
      // onClick={() => handleMarkerClick(controller_id)}
    />
  ));
};

export default StationMarkers;
