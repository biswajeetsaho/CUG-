import { Outlet, useLocation } from "react-router-dom";
import "./activate_deactivateCUG.css";
import { IoIosSearch } from "react-icons/io";
import { getDatabase, onValue, ref, update } from "firebase/database";
import Fapp from "../firebase";
import { useState } from "react";
import Header from "../Header.jsx";
const AcDeac = () => {
  const [showModal, setShowModal] = useState(false);

  // ---------------------------
  const [cugNo, setcugNo] = useState("");
  const [cugDetails, setCugDetails] = useState(null);
  const [empId, setempId] = useState("");
  const [error, setError] = useState(null);
  const now = new Date().toLocaleString();
  const db = getDatabase(Fapp);
  const handleSearch = (event) => {
    event.preventDefault();
    console.log("search clicked");
    if (cugNo === "") alert("Please Enter a CUG Number");
    else {
      const cugRef = ref(db, "Employees3/");
      onValue(cugRef, (snapshot) => {
        const data = snapshot.val();

        if (data) {
          const cugDetail = Object.values(data).find(
            (item) => item.Employee_CUG == cugNo && item.status === "Active"
          );
          console.log(cugDetail);
          if (cugDetail) {
            setCugDetails(cugDetail);
            setempId(cugDetail.Employee_Id);
            setError(null);
          } else {
            setCugDetails(null);
            setError("No CUG found");
          }
        } else {
          setCugDetails(null);
          setError("No CUG found");
        }
      });
      console.log(empId);
    }
  };
  // ----------------handling Modal-------------
  const handleModalClose = () => {
    setShowModal(false);
  };
  const handleModalYes = () => {
    const db = getDatabase(Fapp);
    const empRef = ref(db, `Employees3/${empId}`);
    update(empRef, {
      status: "Inactive",
      returnedAt: now,
    }).then((res) => {
      setShowModal(false);
      alert("CUG Number Deactivated Successfully");
      setcugNo("");
      setCugDetails(null);
      setError("");
    });
  };
  return (
    <>
      <main className={`acdeac ${showModal && "fading"}`}>
        <Header />
        <br />
        <h1> CUG Details</h1>
        <p>Enter a CUG Number to Get its Details</p>
        <form action="" className="searchCUG ">
          <div className="col-4 searchCont">
            <label htmlFor="searchCUGno" className="form-label">
              CUG No.
            </label>
            <input
              type="search"
              className="form-control"
              name="searchCUGno"
              id="searchCUGno"
              value={cugNo}
              onChange={(e) => {
                setcugNo(e.target.value);
                setError("");
                setCugDetails("");
              }}
            />
          </div>
          <button
            className="btn btn-danger"
            onClick={(event) => handleSearch(event)}
          >
            Search
          </button>
        </form>
        <br />

        {error && <h3>{error}</h3>}
        {cugDetails && (
          <table className="table table-striped historyTable">
            <thead>
              <tr>
                {/* <th scope="col">EMP NO.</th> */}
                <th scope="col">Employee Name</th>
                <th scope="col">Designation</th>
                <th scope="col">Department</th>
                <th scope="col">Bill Unit</th>
                <th scope="col">Allocation</th>
                <th scope="col">Operator</th>
                <th scope="col">Plan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {/* <th scope="row">{cugDetails.Employee_No}</th> */}
                <td>{cugDetails.Employee_Name}</td>
                <td>{cugDetails.Employee_Designation}</td>
                <td>{cugDetails.Employee_Dept}</td>
                <td>{cugDetails.Employee_BillUnit}</td>
                <td>{cugDetails.Employee_AllocationNo}</td>
                <td>{cugDetails.Employee_Operator}</td>
                <td>{cugDetails.Employee_Plan}</td>
              </tr>
            </tbody>
          </table>
        )}
        <br />
        <br />
        {cugDetails && (
          <>
            <div className="AcDeacbtn">
              {/* <button className="btn btn-danger">Activate</button> */}
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => setShowModal(true)}
              >
                Deactivate
              </button>
            </div>
          </>
        )}
      </main>
      {showModal && (
        <div
          className="modal  "
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
          style={{ display: "block" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Deactive CUG Number ?
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleModalClose}
                ></button>
              </div>
              <div className="modal-body">
                If you want to deactivate CUG NO , Click on the Yes Button!
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={handleModalClose}
                >
                  No
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleModalYes}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Outlet />
    </>
  );
};
export default AcDeac;
