import { Outlet } from "react-router-dom";
import "./cugStatusReport.css";
const CugStatusReport = () => {
  return (
    <>
      <main className="cugStatusReport">
        <h1>CUG Status Report</h1>
        <br />
        <label for="inputStatus" className="form-label ">
          Status
        </label>
        <select
          className="form-select form-select-lg"
          id="inputStatus"
          aria-label="Default select example"
        >
          <option value="1" selected>
            Active CUG
          </option>
          <option value="2">Deactive CUG</option>
        </select>
        <br />
        <button type="submit" className="btn btn-danger">
          GO
        </button>
        <div className="statusTable">
          <p>Showing Result for </p>

          <table class="table table-striped historyTable">
            <thead>
              <tr>
                <th scope="col">SL.No</th>
                <th scope="col">Employee ID</th>
                <th scope="col">Employee Name</th>
                <th scope="col">CUG NO.</th>
                <th scope="col">Plan</th>
                {/* <th scope="col">Allotment Date</th>
                <th scope="col">Returned Date</th> */}
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
                {/* <td>csdcvsdvsde</td>
                <td>dvsvse</td> */}
                {/* <td>csdcvsdvsde</td> */}
              </tr>
            </tbody>
          </table>
        </div>
      </main>
      <Outlet />
    </>
  );
};
export default CugStatusReport;
