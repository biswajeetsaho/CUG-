// import { Outlet } from "react-router-dom";
// import "./allotmentHistory.css";
// const AllHis = () => {
//   return (
//     <>
//       <main className="allotmentHistory">
//         <h1>Allotment History</h1>
//         <p> Enter the CUG No. , to View its Allotment History</p>
//         <div className="searchCUGcontainer">
//           <form action="" className="searchCUG ">
//             <div className="col-4 searchCont">
//               <label htmlFor="searchCUGno" class="form-label">
//                 CUG No.
//               </label>
//               <input
//                 type="search"
//                 className="form-control"
//                 name="searchCUGno"
//                 id="searchCUGno"
//               />
//             </div>

//             <button className="btn btn-danger">Search</button>
//           </form>
//           <p>Showing Results For CUG No.</p>
//         </div>
//         <br />
//         <div className="table-responsive">
//           <table class="table table-striped historyTable">
//             <thead>
//               <tr>
//                 <th scope="col">SL.No</th>
//                 <th scope="col">Employee ID</th>
//                 <th scope="col">Employee Name</th>
//                 <th scope="col">Division</th>
//                 <th scope="col">Department</th>
//                 <th scope="col">Allotment Date</th>
//                 <th scope="col">Returned Date</th>
//                 {/* <th scope="col">Allotment Date</th> */}
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <th scope="row">1</th>
//                 <td>Mark</td>
//                 <td>Otto</td>
//                 <td>@mdo</td>
//                 <td>dvsvse</td>
//                 <td>csdcvsdvsde</td>
//                 <td>dvsvse</td>
//                 {/* <td>csdcvsdvsde</td> */}
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </main>
//       <Outlet />
//     </>
//   );
// };
// export default AllHis;
import { getDatabase, ref, onValue } from "firebase/database";
import { useState } from "react";
import "./allotmentHistory.css";
import { Outlet } from "react-router-dom";
import Fapp from "../firebase"; // Import your firebase configuration
import Header from "../Header";
const AllHis = () => {
  const [cugNo, setCugNo] = useState("");
  const [allotmentHistory, setAllotmentHistory] = useState("");
  const [error, setError] = useState(null);
  const db = getDatabase(Fapp);

  const handleSearch = (event) => {
    event.preventDefault();
    if (cugNo === "") {
      alert("Please Enter a CUG Number");
    } else {
      const cugRef = ref(db, "Employees3/");
      onValue(cugRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          console.log(data);
          const history = Object.values(data).filter(
            (item) => item.Employee_CUG == cugNo
          );
          if (history.length > 0) {
            setAllotmentHistory(history);
            setError(null);
          } else {
            setAllotmentHistory("");
            setError("No allotment history found for this CUG number");
          }
        } else {
          setAllotmentHistory("");
          setError("No allotment history found for this CUG number");
        }
      });
    }
  };

  return (
    <>
      <main className="allotmentHistory">
        <Header />
        <br />
        <h1>Allotment History</h1>
        <p> Enter the CUG No. , to View its Allotment History</p>
        <div className="searchCUGcontainer">
          <form action="" className="searchCUG" onSubmit={handleSearch}>
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
                  setCugNo(e.target.value);
                  setAllotmentHistory("");
                  setError(null);
                }}
              />
            </div>
            <button
              className="btn btn-danger"
              type="submit"
              onClick={(e) => handleSearch(e)}
            >
              Search
            </button>
          </form>
          {error && <p>{error}</p>}
          {allotmentHistory && <p>Showing Results For CUG No. {cugNo}</p>}
        </div>
        <br />
        {allotmentHistory && (
          <div className="table-responsive">
            <table className="table table-bordered historyTable">
              <thead>
                <tr>
                  <th scope="col">SL.No</th>
                  <th scope="col">Employee ID</th>
                  <th scope="col">Employee Name</th>
                  <th scope="col">Designation</th>
                  <th scope="col">Department</th>
                  <th scope="col">Operator</th>
                  <th scope="col">Plan</th>
                  <th scope="col">Allotment Date</th>
                  <th scope="col">Returned Date</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {allotmentHistory.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.Employee_Id}</td>
                    <td>{item.Employee_Name}</td>
                    <td>{item.Employee_Designation}</td>
                    <td>{item.Employee_Dept}</td>
                    <td>{item.Employee_Operator}</td>
                    <td>{item.Employee_Plan}</td>
                    <td>{item.createdAt}</td>
                    <td>{item.returnedAt || "N/A"}</td>
                    <td>{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <Outlet />
    </>
  );
};

export default AllHis;
