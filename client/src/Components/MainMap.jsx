import { useEffect, useState } from "react";
import "../Styles/MainMap.scss";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import { useSelector, useDispatch } from "react-redux";
import { updateLocation } from "../Reducers/MainMap";
import { elementHeight } from "../Resources/elementHeight";

const MainMap = () => {
  const currentLocation = useSelector((state) => state.currentLocation.value);
  const dispatch = useDispatch();

  const [userLoc, setUserLoc] = useState(null);
  const [positionMarker, setPositionMarker] = useState(null);

const random = {lat:54.70095243213106,lng:25.29821096642473}

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  function getUserLocation() {
    const success = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      localStorage.setItem(
        "userLocation",
        JSON.stringify({ lat: latitude, lng: longitude })
      );
      console.log("Location stored");
      return true;
    };
    const error = () => {
      console.log("Unable to retrieve location");
      localStorage.removeItem("userLocation");
      return false;
    };
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
    } else if (!localStorage.getItem("userLocation")) {
      console.log("Locating…");
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }

  function watchUserLocation() {
    const options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 10000,
    };
    const successCallback = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      localStorage.setItem(
        "userLocation",
        JSON.stringify({ lat: latitude, lng: longitude })
      );
      console.log("Location stored");
    };
    const errorCallback = (error) => {
      console.error("Error getting location:", error.message);
    };
    const watchId = navigator.geolocation.watchPosition(
      successCallback,
      errorCallback,
      options
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }
  function setUserLocation() {
    if (localStorage.getItem("userLocation")) {
      setUserLoc(JSON.parse(localStorage.getItem("userLocation")));
    }
  }
  useEffect(() => {
    console.log(userLoc);
  }, [userLoc]);

  useEffect(() => {
    if(!localStorage.getItem("userLocation")){
      getUserLocation();
    }
    watchUserLocation();
    setUserLocation();
  }, []);

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
            visibility: "off",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "labels",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "labels.text",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "transit",
        elementType: "all",
        stylers: [
          {
            visibility: "off",
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
    <div className="mainmap-container" style={{height:elementHeight.mapAndNav.map}}>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={userLoc}
          zoom={15}
          options={options}
        >
          <Marker position={random} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MainMap;
