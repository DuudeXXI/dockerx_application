import { useEffect, useState } from "react";
import "../Styles/MainMap.scss";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import to_center_btn from "../Media/to_center_btn.svg";
import StationMarkers from "./Markers/StationMarkers";
//redux start
import { useSelector, useDispatch } from "react-redux";
import {
  selectUserLocation,
  updateLocation,
} from "../Reducers/currLocationReducer";
// redux end
import { elementHeight } from "../Resources/elementHeight";
import { mapOptions, containerStyle } from "../Resources/googleOptions";
import {
  setUserLocation,
  watchUserLocation,
  getUserLocation,
} from "../Functions/mapData";

const MainMap = () => {
  const currentLocation = useSelector(selectUserLocation); //atvaizdavimui
  const dispatch = useDispatch(); //redagavimui - dispatch("verte i kuria bus keiciama");

  const [gooInstance, setGooInstance] = useState(null);

  const randCoords = { lat: 54.70545243213106, lng: 25.29821096642473 };

  const onMapLoad = (map) => {
    setGooInstance(map);
  };

  useEffect(() => {
    !localStorage.getItem("userLocation") && getUserLocation();
    watchUserLocation();
    dispatch(updateLocation(setUserLocation()));
  }, []);

  const resetMapCenter = () => {
    gooInstance?.panTo(currentLocation);
    gooInstance?.setZoom(15);
  };

  return (
    <div
      className="mainmap-container"
      style={{ height: elementHeight.mapAndNav.map }}
    >
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentLocation || randCoords}
          zoom={15}
          options={mapOptions}
          onLoad={onMapLoad}
        >
          <Marker position={currentLocation || randCoords} />
        <StationMarkers/>
        </GoogleMap>
      </LoadScript>
      <div className="to-center-btn" onClick={resetMapCenter}>
        <img
          onClick={resetMapCenter}
          src={to_center_btn}
          alt="to center navigation icon"
        />
      </div>
    </div>
  );
};

export default MainMap;
