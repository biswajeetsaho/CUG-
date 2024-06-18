import { Outlet } from "react-router-dom";
import "./allotmentHistory.css";
const AllHis = () => {
  return (
    <>
      <main className="allotmentHistory">
        <h1>Allotment History</h1>
        <p> Enter the CUG No. , to View its Allotment History</p>
        <div className="searchCUGcontainer">
          <form action="" className="searchCUG ">
            <div className="col-4 searchCont">
              <label htmlFor="searchCUGno" class="form-label">
                CUG No.
              </label>
              <input
                type="search"
                className="form-control"
                name="searchCUGno"
                id="searchCUGno"
              />
            </div>

            <button className="btn btn-danger">Search</button>
          </form>
          <p>Showing Results For CUG No.</p>
        </div>

        <table class="table table-striped historyTable">
          <thead>
            <tr>
              <th scope="col">SL.No</th>
              <th scope="col">Employee ID</th>
              <th scope="col">Employee Name</th>
              <th scope="col">Division</th>
              <th scope="col">Department</th>
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
export default AllHis;
