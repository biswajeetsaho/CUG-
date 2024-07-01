import { Outlet } from "react-router-dom";
import "./activate_deactivateReport.css";
import { useEffect, useState } from "react";
import { ref, onValue, getDatabase } from "firebase/database";
import Fapp from "../firebase";
import Header from "../Header";
const AcDeacReport = () => {
  const [data, setData] = useState("");
  const [summary, setSummary] = useState({ totalActive: 0, totalInactive: 0 });
  const database = getDatabase(Fapp);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const duration = document.getElementById("inputRange").value;
    const endDate = new Date();
    let startDate;

    switch (duration) {
      case "1":
        startDate = new Date();
        startDate.setDate(endDate.getDate() - 7);
        break;
      case "2":
        startDate = new Date();
        startDate.setDate(endDate.getDate() - 14);
        break;
      case "3":
        startDate = new Date();
        startDate.setMonth(endDate.getMonth() - 1);
        break;
      case "4":
        startDate = new Date();
        startDate.setMonth(endDate.getMonth() - 3);
        break;
      case "5":
        startDate = new Date();
        startDate.setMonth(endDate.getMonth() - 6);
        break;
      case "6":
        startDate = new Date();
        startDate.setFullYear(endDate.getFullYear() - 1);
        break;
      default:
        startDate = new Date();
        startDate.setDate(endDate.getDate() - 7);
        break;
    }

    fetchDatabaseData(startDate, endDate);
  };

  const fetchDatabaseData = (startDate, endDate) => {
    const cugRef = ref(database, "Employees3/");
    onValue(cugRef, (snapshot) => {
      const data = snapshot.val();
      const filteredData = [];
      let totalActive = 0;
      let totalInactive = 0;

      if (data) {
        Object.values(data).forEach((item) => {
          const createdAt = new Date(item.createdAt);
          const returnedAt = item.returnedAt ? new Date(item.returnedAt) : null;

          if (
            (createdAt >= startDate && createdAt <= endDate) ||
            (returnedAt && returnedAt >= startDate && returnedAt <= endDate)
          ) {
            filteredData.push(item);
            if (item.status === "Active") totalActive += 1;
            if (item.status === "Inactive") totalInactive += 1;
          }
        });
      }

      setData(filteredData);
      setSummary({ totalActive, totalInactive });
    });
  };

  return (
    <>
      <main className="activate_deactivateReport">
        <Header />
        <br />
        <h1>Activate / Deactivate Report</h1>
        <br />
        <form action="" className="row g-3" onSubmit={handleSubmit}>
          <div className="col-4">
            <label htmlFor="inputRange" className="form-label ">
              Duration
            </label>
            <select
              className="form-select form-select-lg "
              id="inputRange"
              aria-label="Default select example"
            >
              <option value="1">last Week</option>
              <option value="2">last 2 Weeks</option>
              <option value="3">last 1 Month</option>
              <option value="4">last 3 Months</option>
              <option value="5">last 6 Months</option>
              <option value="6">last 1 Year</option>
            </select>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Go
            </button>
          </div>
        </form>
        <br />
        {data && (
          <>
            {" "}
            <div className="table-responsive">
              <div className="activate_deactivateCont">
                <table className="table table-bordered historyTable">
                  <thead>
                    <tr>
                      <th scope="col">SL.No</th>
                      <th scope="col">CUG NO.</th>
                      <th scope="col">Allocation Unit</th>
                      <th scope="col">Employee ID</th>
                      <th scope="col">Employee Name</th>
                      <th scope="col">Plan</th>
                      <th scope="col">Allotment Date</th>
                      <th scope="col">Returned Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.Employee_CUG}</td>
                        <td>{item.Employee_AllocationNo}</td>
                        <td>{item.Employee_Id}</td>
                        <td>{item.Employee_Name}</td>
                        <td>{item.Employee_Plan}</td>
                        <td>{item.createdAt}</td>
                        <td>{item.returnedAt || "N/A"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <br />
            <div className="summary">
              <p>Total Activated Number: {summary.totalActive}</p>
              <p>Total Deactivated Number: {summary.totalInactive}</p>
            </div>
          </>
        )}
      </main>
      <Outlet />
    </>
  );
};

export default AcDeacReport;
