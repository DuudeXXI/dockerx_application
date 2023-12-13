import { useEffect, useState } from "react";
import "../Styles/MainMap.scss";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

import { useSelector, useDispatch } from "react-redux";
import { updateLocation } from "../Reducers/MainMap";

const containerStyle = {
  width: "100%",
  height: "100%",
};
const center = {
  lat: 54.69970327550062,
  lng: 25.28996562386234,
};

const MainMap = () => {
  const currentLocation = useSelector((state) => state.currentLocation.value);
  const dispatch = useDispatch();

  useEffect(() => {
    locationUpdate();
  }, []);

  // GET LOCATION
  const locationUpdate = () => {
    if (localStorage.getItem("position") == null) {
      navigator.geolocation.getCurrentPosition(
        (position) =>
          localStorage.setItem(
            "position",
            JSON.stringify({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            })
          ),
        null
      );
      dispatch(updateLocation(JSON.parse(localStorage.getItem("position"))));
    } else {
      dispatch(updateLocation(JSON.parse(localStorage.getItem("position"))));
      console.log(currentLocation);
    }
    // regex code that will set global location state
    //   const positionas = JSON.parse(localStorage.getItem("position"));
    //   console.log(`positionas: ${positionas.latitude}`);
  };

  const { isLoaded } = useJsApiLoader({
    id: "Development project",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const options = {
    disableDefaultUI: true, // Disable default UI controls
    keyboardShortcuts: false,
    mapTypeControl: false,
    mapTypeControlOptions: {
      mapTypeIds: [], // An empty array disables the "Terms" button
    },
  };

  const [map, setMap] = useState(null);

  return (
    <div className="mainmap-container">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          options={options}
        >
          {/* Child components, such as markers, info windows, etc. */}
          <></>
        </GoogleMap>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MainMap;
