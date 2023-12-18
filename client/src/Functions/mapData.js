export const setUserLocation = () => {
    if (localStorage.getItem("userLocation")) {
        return JSON.parse(localStorage.getItem("userLocation"));
      }
};  
export const watchUserLocation = () => {  
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
export const getUserLocation = () => {
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