import { useEffect, useState } from "react";
import "../Styles/MainMap.scss";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import { useSelector, useDispatch } from "react-redux";
import { updateLocation } from "../Reducers/MainMap";

const MainMap = () => {
  const currentLocation = useSelector((state) => state.currentLocation.value);
  const dispatch = useDispatch();

  const [center, setCenter] = useState(currentLocation);
  const [centerIsUpdated, setCenterIsUpdated] = useState(false);
  const [positionMarker, setPositionMarker] = useState(currentLocation);

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  useEffect(() => {
    locationUpdate();
    const intervalId = setInterval(markerUpdate, 5000);
    return () => clearInterval(intervalId);
  }, []);
  // GET LOCATION
  const locationUpdate = () => {
    if (localStorage.getItem("position") == null) {
      navigator.geolocation.getCurrentPosition(
        (position) =>
          localStorage.setItem(
            "position",
            JSON.stringify({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            })
          ),
        null
      );
      setCenter(JSON.parse(localStorage.getItem("position")));
      dispatch(updateLocation(JSON.parse(localStorage.getItem("position"))));
    } else {
      dispatch(updateLocation(JSON.parse(localStorage.getItem("position"))));
      setCenter(JSON.parse(localStorage.getItem("position")));
    }
    // regex code that will set global location state
    //   const positionas = JSON.parse(localStorage.getItem("position"));
    //   console.log(`positionas: ${positionas.latitude}`);
  };
  const markerUpdate = () => {
    navigator.geolocation.getCurrentPosition(
      (position) =>
        setPositionMarker({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }),
      null
    );
  };

  // const { isLoaded } = useJsApiLoader({
  //   id: "Development project",
  //   googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  // });

  const options = {
    disableDefaultUI: true, // Disable default UI controls
    keyboardShortcuts: false,
    mapTypeControl: false,
    mapTypeControlOptions: {
      mapTypeIds: [], // An empty array disables the "Terms" button
    },
    styles: [
      {
        featureType: "poi",
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "poi",
        elementType: "labels.text",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "landscape.man_made",
        elementType: "all",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [
          {
            visibility:"off",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "labels",
        stylers: [
          {
            visibility:"off",
          },
        ],
      },
      {
        featureType: 'water',
        elementType: 'labels.text',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: "transit",
        elementType: "all",
        stylers: [
          {
            visibility:"off",
          },
        ],
      },
      // Smaller streets without names
      {
        featureType: "road.local",
        elementType: "labels.text",
        stylers: [
          {
            visibility: "off", // hide labels for smaller streets
          },
        ],
      },
      {
        featureType: "road.local.trail",
        elementType: "geometry",
        stylers: [
          {
            color: "#ffffff", // hide labels for smaller streets
          },
        ],
      },
    ],
  };

  return (
    <div className="mainmap-container">
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          options={options}
        >
          {/* Child components, such as markers, info windows, etc. */}
          <Marker position={{ lat: 54.70072567997, lng: 25.29795280249 }} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MainMap;
