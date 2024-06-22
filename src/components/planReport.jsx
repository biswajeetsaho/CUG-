import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import "./planReport.css";
const PlanReport = () => {
  const [selectedOption, setSelectedOption] = useState("HQ");
  const [Department, setDepartment] = useState([]);
  const [bill, setBill] = useState(0); //for toggling View of the Employee
  const handleChange = (event) => {
    setSelectedOption(event.target.options[event.target.selectedIndex].text);
    console.log(selectedOption);
  };
  const HQ_Dept = [
    "ACCOUNTS",
    "AUDIT",
    "COMMERCIAL",
    "ELECTRICAl",
    "ENGINEERING",
    "GENERAL ADMIN",
    "MECHANICAL",
    "MEDICAL",
    "OPERATING",
    "PERSONNEL",
    "RRB",
    "SIGNAL AND TELECOM",
    "SAFETY",
    "SECURITY",
    "STORES",
  ];
  const CON_Dept = [
    "ACCOUNTS",
    "ELECTRICAL",
    "ENGINEERING",
    "OPERATING",
    "PERSONNEL",
    "SIGNAL AND TELECOM",
  ];
  const MCS_Dept = ["ACCOUNTS", "ELECTRICAL", "MECHANICAL", "PERSONNEL"];

  useEffect(() => {
    if (selectedOption === "HQ") setDepartment(HQ_Dept);
    else if (selectedOption === "CON") setDepartment(CON_Dept);
    else if (selectedOption === "MCS") setDepartment(MCS_Dept);
    else setDepartment([]);
  }, [selectedOption]);

  const handleClick = () => {
    setBill(1 - bill);
  };
  return (
    <>
      <main className="planRepo">
        <h1>Plan-Wise Billing Report</h1>
        <br />
        <form action="" className={` row g-3 ${bill === 1 && "display"}`}>
          <div className="col-3">
            <label for="plan" className="form-label ">
              Plan
            </label>
            <select id="plan" className="form-select form-select-lg">
              <option selected value="planA">
                PLAN A
              </option>
              <option value="planB">PLAN B</option>
              <option value="planC">PLAN C</option>
            </select>
          </div>
          <div className="col-4">
            <label for="inputDivision" className="form-label ">
              Division
            </label>
            <select
              className="form-select form-select-lg "
              id="inputDivision"
              aria-label="Default select example"
              onChange={(e) => handleChange(e)}
            >
              <option value="1" selected>
                HQ
              </option>
              <option value="2">CON</option>
              <option value="3">MCS</option>
            </select>
          </div>
          <div className="col-4">
            <label for="inputDept" className="form-label ">
              Department
            </label>
            <select
              className="form-select form-select-lg "
              id="inputDept"
              aria-label="Default select example"
            >
              {Department.map((dept, index) => (
                <option key={index} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
          <div className="col-2">
            <button className="btn btn-primary">Submit</button>
          </div>
        </form>
        <br />
        <div className={`table-responsive  ${bill === 1 && "display"}`}>
          <table class="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Employee ID</th>
                <th scope="col">Employee Name</th>
                <th scope="col">CUG NO.</th>
                <th scope="col">Plan</th>
                {/* <th scope="col">Allotment Date</th>
                <th scope="col">Returned Date</th> */}
                <th scope="col">Bill</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>
                  {" "}
                  <button onClick={handleClick}>view</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* -----------Employeee Bill----------------- */}
        <div
          className={`table-responsive billtable  ${bill === 0 && "display"}`}
        >
          <button className="btn btn-danger" onClick={() => setBill(1 - bill)}>
            Back
          </button>
          <br />

          <br />
          <table class="table table-bordered border-primary ">
            <thead>
              <tr>
                <th scope="col">Employee ID</th>
                <th scope="col">Employee Name</th>
                <th scope="col">CUG NO.</th>
                <th scope="col">Talk-Time Amount</th>
                <th scope="col">Data Amount</th>
                <th scope="col">SMS Amount</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>bbjv</td>
                <td>bbjv</td>
                <td>bbjv</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
      <Outlet />
    </>
  );
};
export default PlanReport;
