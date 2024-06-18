import { Outlet } from "react-router-dom";
import "./allocationRepo.css";
const AllocationReport = () => {
  return (
    <>
      <main className="allocation_Repo">
        <h1>Allocation Wise Report</h1>
        <br />
        <form action="" className="row g-3">
          <div className="col-3">
            <label htmlFor="inputbillUnit" className="form-label">
              Bill Unit
            </label>
            <input
              type="number"
              className="form-control form-control-lg"
              id="inputbillUnit"
            />
          </div>
          <div className="col-12">
            <button className="btn btn-primary">Search</button>
          </div>
        </form>
        <br />
        <table class="table table-striped historyTable">
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
          </tbody>
        </table>
      </main>
      <Outlet />
    </>
  );
};
export default AllocationReport;
