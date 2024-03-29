import { useEffect, useState } from "react";
import "../Styles/MainMap.scss";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Marker
} from "@vis.gl/react-google-maps";
import to_center_btn from "../Media/to_center_btn.svg";
import StationMarkers from "./Markers/StationMarkers";
//redux start
import { useSelector, useDispatch } from "react-redux";
import {
  selectUserLocation,
  updateLocation,
} from "../Reducers/currLocationReducer";
import { selectStation } from "../Reducers/selectedStationRecuder";
// redux end
import { elementHeight } from "../Resources/elementHeight";
import { mapOptions, containerStyle } from "../Resources/googleOptions";
import {
  setUserLocation,
  watchUserLocation,
  getUserLocation,
} from "../Functions/mapData";
import Profile from "./Profile";

const MainMap = () => {
  const currentLocation = useSelector(selectUserLocation); //atvaizdavimui
  const selectedStation = useSelector(selectStation);
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
      style={{
        height: !selectedStation
          ? elementHeight.mapAndNav.map
          : elementHeight.mapAndNav.mapWData,
      }}
    >
      <APIProvider
        apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      >
        <Map
          center={currentLocation || randCoords}
          zoom={15}
          options={mapOptions}
          onLoad={onMapLoad}
          mapContainerStyle={containerStyle}
          // mapId={process.env.REACT_APP_GOOGLE_MAPS_MAP_ID}
        >
          {/* <AdvancedMarker
            position={currentLocation || randCoords}
          ></AdvancedMarker> */}
          {/* <StationMarkers /> */}
          <Marker position={currentLocation || randCoords} />
        </Map>
      </APIProvider>
      {/* <div
        className="to-center-btn"
        data-station={Boolean(selectedStation)}
        onClick={resetMapCenter}
      >
        <img
          onClick={resetMapCenter}
          src={to_center_btn}
          alt="to center navigation icon"
        />
      </div>
      <Profile /> */}
    </div>
  );
};

export default MainMap;
