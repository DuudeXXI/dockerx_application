import { useContext } from "react";
import MainContext from "../contexts/MainContext";
import axios from "axios";


const EditModal = () => {
  const {
    setControllerUpdate,
    controllerUpdate,
    isValidLatUpdate,
    isValidLngUpdate,
    server_port,
    ip,
    setRefresh,
    setIsValidLatUpdate,
    validateInput,
    setIsValidLngUpdate
  } = useContext(MainContext);

  const exitUpdateModal = () => {
    setControllerUpdate({});
  };
  const sendLockStatus = () => {
    const tempController = {
    controller_id: controllerUpdate.controller_id,
    controller_status: controllerUpdate.controller_status ? 0 : 1,
    };

    axios
      .put(
        ip + server_port + `/${tempController.controller_id}`,
        tempController
      )
      .then((res) => {
        console.log("Update request sent successfully:", res.data);
      })
      .catch((error) => {
        console.error("Error sending update request:", error);
      });

    setControllerUpdate(tempController);
    setRefresh(true);
  };
  const sendCoordinates = () => {
    const tempController = {
      ...controllerUpdate
    };
    axios
      .put(
        ip + server_port + `/${tempController.controller_id}`,
        tempController
      )
      .then((res) => {
        console.log("Update request sent successfully:", res.data);
      })
      .catch((error) => {
        console.error("Error sending update request:", error);
      });

    setControllerUpdate(tempController);
    setRefresh(true);
  };
  const handleUpdateLat = (event) => {
    let { value } = event.target;
    value = value.replace(/,/g, ".");
    setIsValidLatUpdate(validateInput(value));
    if (validateInput(value)) {
      setControllerUpdate((controller) => ({
        ...controller,
        dec_lat: value,
      }));
    }
  };
  const handleUpdateLng = (event) => {
    let { value } = event.target;
    value = value.replace(/,/g, ".");
    setIsValidLngUpdate(validateInput(value));
    if (validateInput(value)) {
      setControllerUpdate((controller) => ({
        ...controller,
        dec_lng: value,
      }));
    }
  };

  return Object.keys(controllerUpdate).length !== 0 ? (
    <div className="update-container">
      <div className="container-column">
        <div className="exit-modal" onClick={exitUpdateModal}>
          X
        </div>
        <div className="controller-id">{controllerUpdate.controller_id}</div>
        <input
          type="text"
          placeholder="Latitude"
          value={controllerUpdate.dec_lat}
          onChange={handleUpdateLat}
        />
        {!isValidLatUpdate && (
          <p style={{ color: "red" }}>Use correct format: 00.000...</p>
        )}
        <input
          type="text"
          placeholder="Longitude"
          value={controllerUpdate.dec_lng}
          onChange={handleUpdateLng}
        />
        {!isValidLngUpdate && (
          <p style={{ color: "red" }}>Use correct format: 00.000...</p>
        )}
        <button onClick={sendCoordinates}>
          Update
        </button>
        <button onClick={sendLockStatus}>
          {controllerUpdate.controller_status ? "Unlock" : "Lock"}
        </button>
        <div>
          Lock status: <b>controllerUpdate.lock_status</b>
        </div>
        <div>
          Alarm status: <b>controllerUpdate.alarm_status</b>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default EditModal;
