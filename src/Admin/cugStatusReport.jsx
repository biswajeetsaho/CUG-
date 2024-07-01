import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";
import Fapp from "../firebase"; // Import your firebase configuration
import "./cugStatusReport.css";
import Header from "../Header";
const CugStatusReport = () => {
  const [status, setStatus] = useState("1"); // Default to Active CUG
  const [cugData, setCugData] = useState([]);
  const [summary, setSummary] = useState({ totalActive: 0, totalInactive: 0 });

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleFetchData = () => {
    const db = getDatabase(Fapp);
    const cugRef = ref(db, "Employees3/");

    onValue(cugRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        let totalActive = 0;
        let totalInactive = 0;
        const activeCugSet = new Set();
        const inactiveCugSet = new Set();
        const filteredData = Object.values(data).filter((item) => {
          if (item.status === "Active") {
            activeCugSet.add(item.Employee_CUG);
            if (status === "1") {
              totalActive += 1;
              return true;
            }
          }
          if (
            item.status === "Inactive" &&
            !activeCugSet.has(item.Employee_CUG)
          ) {
            if (!inactiveCugSet.has(item.Employee_CUG)) {
              inactiveCugSet.add(item.Employee_CUG);
              if (status === "2") {
                totalInactive += 1;
                return true;
              }
            }
          }
          return false;
        });

        setCugData(filteredData);
        setSummary({ totalActive, totalInactive });
      } else {
        setCugData([]);
        setSummary({ totalActive: 0, totalInactive: 0 });
      }
    });
  };

  useEffect(() => {
    // Fetch data when the component mounts
    handleFetchData();
  }, [status]);

  return (
    <>
      <main className="cugStatusReport">
        <Header />
        <br />
        <h1>CUG Status Report</h1>
        <br />
        <label htmlFor="inputStatus" className="form-label">
          Status
        </label>
        <select
          className="form-select "
          id="inputStatus"
          aria-label="Default select example"
          value={status}
          onChange={handleStatusChange}
        >
          <option value="1">Active CUG</option>
          <option value="2">Inactive CUG</option>
        </select>
        <br />
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleFetchData}
        >
          GO
        </button>
        <div className="statusTable">
          <p>
            Showing Results for {status === "1" ? "Active CUG" : "Inactive CUG"}
          </p>
          <div className="table-responsive">
            <table className="table table-bordered historyTable">
              <thead>
                <tr>
                  <th scope="col">SL.No</th>
                  <th scope="col">CUG NO.</th>
                </tr>
              </thead>
              <tbody>
                {cugData.length > 0 ? (
                  cugData.map((item, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.Employee_CUG}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {status === "1" ? (
          <p>Total Active CUG: {summary.totalActive}</p>
        ) : (
          <p>Total InActive CUG: {summary.totalInactive}</p>
        )}
      </main>
      <Outlet />
    </>
  );
};

export default CugStatusReport;
