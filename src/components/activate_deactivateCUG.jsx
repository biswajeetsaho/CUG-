import { Outlet, useLocation } from "react-router-dom";
import "./activate_deactivateCUG.css";
import { IoIosSearch } from "react-icons/io";
import { getDatabase, onValue, ref } from "firebase/database";
import Fapp from "../firebase";
import { useState } from "react";
const AcDeac = () => {
  const location = useLocation();
  // const cugNumber = location.state?.cugNumber;
  let cugNumber;

  if (location && location.state) {
    cugNumber = location.state.cugNumber;
  } else {
    cugNumber = "";
  }

  console.log(cugNumber);
  // ---------------------------
  const [cugNo, setcugNo] = useState(cugNumber);
  const [cugDetails, setCugDetails] = useState(null);
  const [error, setError] = useState(null);
  const db = getDatabase(Fapp);
  const handleSearch = (event) => {
    event.preventDefault();
    console.log("search clicked");
    if (cugNo === "") alert("Please Enter a CUG Number");
    else {
      const cugRef = ref(db, "Employees2/");
      onValue(cugRef, (snapshot) => {
        const data = snapshot.val();

        if (data) {
          const cugDetail = Object.values(data).find(
            (item) => item.Employee_CUG == cugNo
          );
          console.log(cugDetail);
          if (cugDetail) {
            setCugDetails(cugDetail);
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
    }
  };
  return (
    <>
      <main className="acdeac">
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
          <div className="AcDeacbtn">
            {/* <button className="btn btn-danger">Activate</button> */}
            <button className="btn btn-outline-danger">Deactivate</button>
          </div>
        )}
      </main>
      <Outlet />
    </>
  );
};
export default AcDeac;
