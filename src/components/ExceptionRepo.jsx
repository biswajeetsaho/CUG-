import { Outlet } from "react-router-dom";
// import "./billRegister.css";
import { useState, useEffect } from "react";
import { getDatabase, onValue, ref } from "firebase/database";
import Fapp from "../firebase";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Header from "../Header.jsx";
const ExceptionReport = () => {
  const db = getDatabase(Fapp);
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState("");
  const [employees, setEmployees] = useState([]);
  const [exceptions, setExceptions] = useState([]);
  const [error, setError] = useState("");

  const planCosts = {
    A: 74.61,
    B: 59.05,
    C: 39.9,
  };

  useEffect(() => {
    const fetchBills = () => {
      const billRef = ref(db, "CUGBILL/");
      onValue(billRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const billList = Object.keys(data);
          setBills(billList);
        } else {
          setBills([]);
        }
      });
    };
    fetchBills();
  }, [db]);

  const handleSearch = async (event) => {
    event.preventDefault();
    console.log("Search button clicked");
    if (selectedBill === "") {
      alert("Please select a bill.");
      return;
    }

    const employeesRef = ref(db, "Employees3/");
    const cugBillRef = ref(db, `CUGBILL/${selectedBill}/`);

    const fetchEmployees = new Promise((resolve, reject) => {
      onValue(employeesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          resolve(data);
        } else {
          reject("No employee data found");
        }
      });
    });

    const fetchCugBill = new Promise((resolve, reject) => {
      onValue(cugBillRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          resolve(data);
        } else {
          reject("No CUG Bill data found");
        }
      });
    });

    try {
      const [employeesData, cugBillData] = await Promise.all([
        fetchEmployees,
        fetchCugBill,
      ]);

      //   console.log("Employees Data:", employeesData);
      //   console.log("CUG Bill Data:", cugBillData);

      const exceptions = [];

      Object.values(employeesData).forEach((employee) => {
        if (
          employee.status === "Active" &&
          cugBillData[employee.Employee_CUG]
        ) {
          const total = parseFloat(cugBillData[employee.Employee_CUG].Total);
          const planCost = planCosts[employee.Employee_Plan];
          if (total > planCost) {
            exceptions.push({
              Employee_Name: employee.Employee_Name,
              Employee_CUG: employee.Employee_CUG,
              Plan: employee.Employee_Plan,
              Plan_Cost: planCost.toFixed(2),
              Total: total.toFixed(2),
              Excess: (total - planCost).toFixed(2),
            });
          }
        }
      });

      setExceptions(exceptions);
      setError("");
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "An error occurred");
      setExceptions([]);
    }
  };

  const handleGenerateReport = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "Employee Name",
      "Employee CUG",
      "Plan",
      "Plan Cost",
      "Total",
      "Excess",
    ];
    const tableRows = [];

    exceptions.forEach((item) => {
      const rowData = [
        item.Employee_Name,
        item.Employee_CUG,
        item.Plan,
        item.Plan_Cost,
        item.Total,
        item.Excess,
      ];
      tableRows.push(rowData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text(`Exception Report - ${selectedBill}`, 14, 15);
    doc.save("exception_report.pdf");
  };

  return (
    <>
      <main className="billRegister">
        <Header />
        <br />
        <h1>Exception Report</h1>
        <br />
        <div className="row g-3">
          <div className="col-6">
            <label htmlFor="selectBill" className="form-label">
              Select Bill
            </label>
            <select
              className="form-select "
              id="selectBill"
              value={selectedBill}
              onChange={(e) => {
                setSelectedBill(e.target.value);
                setExceptions([]);
                setError("");
              }}
            >
              <option value="">-- Select Bill --</option>
              {bills.map((bill, index) => (
                <option key={index} value={bill}>
                  {bill}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12">
            <button
              className="btn btn-primary"
              onClick={(event) => handleSearch(event)}
            >
              Submit
            </button>
          </div>
        </div>
        <br />
        {error && <div className="alert alert-danger">{error}</div>}
        {exceptions.length > 0 && (
          <>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Employee Name</th>
                    <th scope="col">Employee CUG</th>
                    <th scope="col">Plan</th>
                    <th scope="col">Plan Cost</th>
                    <th scope="col">Total</th>
                    <th scope="col">Excess</th>
                  </tr>
                </thead>
                <tbody>
                  {exceptions.map((item, index) => (
                    <tr key={index}>
                      <td>{item.Employee_Name}</td>
                      <td>{item.Employee_CUG}</td>
                      <td>{item.Plan}</td>
                      <td>{item.Plan_Cost}</td>
                      <td>{item.Total}</td>
                      <td>{item.Excess}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <br />
            <p>Total Exception: {exceptions.length}</p>
            <div className="row">
              <div className="col-2">
                <button
                  className="btn btn-success"
                  onClick={handleGenerateReport}
                >
                  Generate Report
                </button>
              </div>
            </div>
          </>
        )}
      </main>
      <Outlet />
    </>
  );
};

export default ExceptionReport;
