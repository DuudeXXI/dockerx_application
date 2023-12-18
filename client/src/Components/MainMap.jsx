import { useEffect, useState } from "react";
import "../Styles/MainMap.scss";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUserLocation,
  updateLocation,
} from "../Reducers/currLocationReducer";
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

  const randCoords = { lat: 54.70545243213106, lng: 25.29821096642473 };

  useEffect(() => {
    !localStorage.getItem("userLocation") && getUserLocation();
    watchUserLocation();
    dispatch(updateLocation(setUserLocation()));
  }, []);

  return (
    <div
      className="mainmap-container"
      style={{ height: elementHeight.mapAndNav.map }}
    >
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentLocation ? currentLocation : randCoords}
          zoom={15}
          options={mapOptions}
        >
          <Marker position={currentLocation ? currentLocation : randCoords} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MainMap;
