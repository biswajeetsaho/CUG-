// import { Outlet } from "react-router-dom";
// import "./allocationRepo.css";
// import { useState, useEffect } from "react";
// import { getDatabase, onValue, ref } from "firebase/database";
// import Fapp from "../firebase";
// const AllocationReport = () => {
//   const db = getDatabase(Fapp);
//   const [bill, setBill] = useState("");
//   const [billDetails, setbillDetails] = useState("");
//   const [error, setError] = useState("");
//   const handleSearch = (event) => {
//     event.preventDefault();
//     console.log("search clicked");
//     if (bill === "") alert("Please Enter a bill Number");
//     else {
//       const billRef = ref(db, "Employees/");
//       onValue(billRef, (snapshot) => {
//         const data = snapshot.val();
//         if (data) {
//           const billDetail = Object.values(data).find(
//             (item) => item.Employee_BillUnit === bill
//           );
//           if (billDetail) {
//             setbillDetails(billDetail);
//             console.log("error");
//             setError(null);
//           } else {
//             setbillDetails(null);
//             setError("Invalid Bill Number");
//           }
//         } else {
//           setbillDetails(null);
//           setError("Invalid Bill Number");
//         }
//       });
//     }
//   };
//   return (
//     <>
//       <main className="allocation_Repo">
//         <h1>Allocation Wise Report</h1>
//         <br />
//         <form action="" className="row g-3">
//           <div className="col-3">
//             <label htmlFor="inputbillUnit" className="form-label">
//               Bill Unit
//             </label>
//             <input
//               type="number"
//               className="form-control form-control-lg"
//               id="inputbillUnit"
//               value={bill}
//               onChange={(e) => setBill(e.target.value)}
//             />
//           </div>
//           <div className="col-12">
//             <button
//               className="btn btn-primary"
//               onClick={(e) => {
//                 handleSearch(e);
//               }}
//             >
//               Search
//             </button>
//           </div>
//         </form>
//         <br />
//         <div className="table-responsive">
//           <table class="table table-striped ">
//             <thead>
//               <tr>
//                 <th scope="col">SL.No</th>
//                 <th scope="col">Employee ID</th>
//                 <th scope="col">Employee Name</th>
//                 <th scope="col">CUG NO.</th>
//                 <th scope="col">Plan</th>
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
//               </tr>
//               <tr>
//                 <th scope="row">1</th>
//                 <td>Mark</td>
//                 <td>Otto</td>
//                 <td>@mdo</td>
//                 <td>dvsvse</td>
//                 <td>csdcvsdvsde</td>
//                 <td>dvsvse</td>
//               </tr>
//               <tr>
//                 <th scope="row">1</th>
//                 <td>Mark</td>
//                 <td>Otto</td>
//                 <td>@mdo</td>
//                 <td>dvsvse</td>
//                 <td>csdcvsdvsde</td>
//                 <td>dvsvse</td>
//               </tr>
//               <tr>
//                 <th scope="row">1</th>
//                 <td>Mark</td>
//                 <td>Otto</td>
//                 <td>@mdo</td>
//                 <td>dvsvse</td>
//                 <td>csdcvsdvsde</td>
//                 <td>dvsvse</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </main>
//       <Outlet />
//     </>
//   );
// };
// export default AllocationReport;
import { Outlet } from "react-router-dom";
import "./allocationRepo.css";
import { useState } from "react";
import { getDatabase, onValue, ref } from "firebase/database";
import Fapp from "../firebase";

const AllocationReport = () => {
  const db = getDatabase(Fapp);
  const [Allocation, setAllocation] = useState("");
  const [AllocationDetails, setAllocationDetails] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    if (Allocation === "") {
      alert("Please Enter a valid Allocation Number");
      return;
    }

    const AllocationRef = ref(db, "Employees2/");
    onValue(AllocationRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const AllocationDetail = Object.values(data).filter(
          (item) => item.Employee_AllocationNo == Allocation
        );
        if (AllocationDetail.length > 0) {
          setAllocationDetails(AllocationDetail);
          setError(null);
        } else {
          setAllocationDetails([]);
          setError("No Allocation unit found");
        }
      } else {
        setAllocationDetails([]);
        setError("No Allocation unit found");
      }
    });
  };

  return (
    <>
      <main className="allocation_Repo">
        <h1>Allocation Wise Report</h1>
        <br />
        <form className="row g-3">
          <div className="col-3">
            <label htmlFor="inputbillUnit" className="form-label">
              Allocation Unit
            </label>
            <input
              type="number"
              className="form-control form-control-lg"
              id="inputbillUnit"
              value={Allocation}
              onChange={(e) => {
                setAllocation(e.target.value);
                setError("");
              }}
            />
          </div>
          <div className="col-12">
            <button className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>
          </div>
        </form>
        <br />
        {error && <div className="alert alert-danger">{error}</div>}
        {AllocationDetails.length > 0 && (
          <div className="table-responsive">
            <table className="table  table-bordered ">
              <thead>
                <tr>
                  <th scope="col">Allocation No.</th>
                  <th scope="col">Employee ID</th>
                  <th scope="col">Employee Name</th>
                  <th scope="col">CUG NO.</th>
                  <th scope="col">Department</th>
                  <th scope="col">Operator</th>
                  <th scope="col">Plan</th>
                  <th scope="col">Allotment Date</th>
                </tr>
              </thead>
              <tbody>
                {AllocationDetails.map((item, index) => (
                  <tr key={index}>
                    <td>{item.Employee_AllocationNo}</td>
                    <td>{item.Employee_Id}</td>
                    <td>{item.Employee_Name}</td>
                    <td>{item.Employee_CUG}</td>
                    <td>{item.Employee_Dept}</td>
                    <td>{item.Employee_Operator}</td>
                    <td>{item.Employee_Plan}</td>
                    <td>{item.createdAt}</td>
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

export default AllocationReport;
