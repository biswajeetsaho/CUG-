import { Outlet } from "react-router-dom";
import "./activate_deactivateReport.css";
import { useEffect, useState } from "react";
const AcDeacReport = () => {
  const [selectedOption, setSelectedOption] = useState("HQ");
  const [Department, setDepartment] = useState([]);
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

  return (
    <>
      <main className="activate_deactivateReport">
        <h1>Activate / Deactivate Report</h1>
        <br />

        <form action="" className="row g-3">
          <div className="col-4">
            <label for="inputRange" className="form-label ">
              Duration
            </label>
            <select
              className="form-select form-select-lg "
              id="inputRange"
              aria-label="Default select example"
            >
              <option value="1" selected>
                last Week
              </option>
              <option value="2">last 2 Weeks</option>
              <option value="3">last 1 Month</option>
              <option value="4">last 3 Months</option>
              <option value="5">last 6 Months</option>
              <option value="6">last 1 Year</option>
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

          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Go
            </button>
          </div>
        </form>
        <br />
        <div className="table-responsive">
          <div className="activate_deactivateCont">
            <table class="table table-striped historyTable">
              <caption>
                <p>Total Active CUG Numbers: 120</p>
                <p>Total DeActivated CUG Numbers: 20</p>
              </caption>
              <thead>
                <tr>
                  <th scope="col">SL.No</th>
                  <th scope="col">Employee ID</th>
                  <th scope="col">Employee Name</th>
                  <th scope="col">CUG NO.</th>
                  <th scope="col">Plan</th>
                  <th scope="col">Allotment Date</th>
                  <th scope="col">Returned Date</th>
                  {/* <th scope="col">Allotment Date</th> */}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>dvsvse</td>
                  <td>csdcvsdvsde</td>
                  <td>dvsvse</td>
                  {/* <td>csdcvsdvsde</td> */}
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>dvsvse</td>
                  <td>csdcvsdvsde</td>
                  <td>dvsvse</td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>dvsvse</td>
                  <td>csdcvsdvsde</td>
                  <td>dvsvse</td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>dvsvse</td>
                  <td>csdcvsdvsde</td>
                  <td>dvsvse</td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>dvsvse</td>
                  <td>csdcvsdvsde</td>
                  <td>dvsvse</td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>dvsvse</td>
                  <td>csdcvsdvsde</td>
                  <td>dvsvse</td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>dvsvse</td>
                  <td>csdcvsdvsde</td>
                  <td>dvsvse</td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>dvsvse</td>
                  <td>csdcvsdvsde</td>
                  <td>dvsvse</td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>dvsvse</td>
                  <td>csdcvsdvsde</td>
                  <td>dvsvse</td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>dvsvse</td>
                  <td>csdcvsdvsde</td>
                  <td>dvsvse</td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>dvsvse</td>
                  <td>csdcvsdvsde</td>
                  <td>dvsvse</td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>dvsvse</td>
                  <td>csdcvsdvsde</td>
                  <td>dvsvse</td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>dvsvse</td>
                  <td>csdcvsdvsde</td>
                  <td>dvsvse</td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>dvsvse</td>
                  <td>csdcvsdvsde</td>
                  <td>dvsvse</td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>dvsvse</td>
                  <td>csdcvsdvsde</td>
                  <td>dvsvse</td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>dvsvse</td>
                  <td>csdcvsdvsde</td>
                  <td>dvsvse</td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>dvsvse</td>
                  <td>csdcvsdvsde</td>
                  <td>dvsvse</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Outlet />
    </>
  );
};
export default AcDeacReport;
