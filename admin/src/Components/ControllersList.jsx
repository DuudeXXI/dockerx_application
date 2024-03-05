import { useContext, useState } from "react";
import MainContext from "../contexts/MainContext";

const ControllersList = () => {

  const { controllers, setControllerUpdate} = useContext(MainContext);

  const controllersPerPage = 5;
  const pageNumbers = Math.ceil(controllers.length / controllersPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastController = currentPage * controllersPerPage;
  const indexOfFirstController = indexOfLastController - controllersPerPage;
  const currentControllers = controllers.slice(
    indexOfFirstController,
    indexOfLastController
  );

  return (
    <div className="controllers-list-component">
      <table className="controllers-list">
        <tbody>
          <tr className="controller-line head">
            <td className="controller-cell">Update</td>
            <td className="controller-cell">ID</td>
            <td className="controller-cell">dec_latitude</td>
            <td className="controller-cell">del_longitude</td>
            <td className="controller-cell">ctrl_status</td>
            <td className="controller-cell">lock_status</td>
            <td className="controller-cell">alarm_status</td>
          </tr>
          {currentControllers?.map((controller) => (
            <tr className="controller-line" key={controller.id}>
              <td className="controller-cell">
                <button
                  controller={controller}
                  onClick={(e) => {
                    setControllerUpdate(controller);
                  }}
                >
                  +
                </button>
              </td>
              <td className="controller-cell">{controller.controller_id}</td>
              <td className="controller-cell">{controller.dec_lat}</td>
              <td className="controller-cell">{controller.dec_lng}</td>
              <td className="controller-cell">
                {controller.controller_status}
              </td>
              <td className="controller-cell">{controller.lock_status}</td>
              <td className="controller-cell">{controller.alarm_status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="page-nav-container">
        {currentPage > 1 && (
          <button onClick={() => setCurrentPage(currentPage - 1)}>
            Previous
          </button>
        )}

        {Array.from({ length: pageNumbers }, (_, index) => index + 1).map(
          (number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              style={{ fontWeight: number === currentPage ? "bold" : "normal" }}
            >
              {number}
            </button>
          )
        )}

        {currentPage < pageNumbers && (
          <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
        )}
      </div>
    </div>
    
  );
};

export default ControllersList;
