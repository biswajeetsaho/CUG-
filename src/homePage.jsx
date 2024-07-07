// import Header from "./Header";

// const HomePage = () => {
//   return (
//     <>
//       <main className="homePage">
//         <Header />
//         <h1>Closed User Group (CUG) Management Portal</h1>
//         <p>
//           The CUG Management System is designed to streamline and simplify
//           management of Closed User Group (CUG) numbers and employee within an
//           organization. This system offers an efficient way to handle various
//           aspects of CUG number management, including adding new numbers,
//           uploading bulk CUG numbers via Excel files, and detailed reports.
//         </p>
//       </main>
//     </>
//   );
// };
// export default HomePage;
import React, { useEffect, useState } from "react";
import Header from "./Header";
import { getDatabase, ref, onValue } from "firebase/database";
import Fapp from "./firebase";

const HomePage = () => {
  const [summary, setSummary] = useState({
    totalEmployees: 0,
    activeCUG: 0,
    inactiveCUG: 0,
    allocationNumbers: 0,
    billNumbers: 0,
    plans: [],
  });

  useEffect(() => {
    const db = getDatabase(Fapp);

    // Fetch Employee Data
    const employeeRef = ref(db, "Employees3/");
    onValue(employeeRef, (snapshot) => {
      const employees = snapshot.val();
      if (employees) {
        const employeeList = Object.values(employees);
        const totalEmployees = employeeList.length;
        let totalActive = 0;
        let totalInactive = 0;
        let activeCUGSet = new Set();
        let inactiveCUGSet = new Set();
        const allocationNumbersSet = new Set();
        const billNumbersSet = new Set();
        const plansSet = new Set();
        const filteredData = Object.values(employees).filter((item) => {
          if (item.status === "Active") {
            activeCUGSet.add(item.Employee_CUG);
            totalActive += 1;
          }
          if (
            item.status === "Inactive" &&
            !activeCUGSet.has(item.Employee_CUG)
          ) {
            if (!inactiveCUGSet.has(item.Employee_CUG)) {
              inactiveCUGSet.add(item.Employee_CUG);
              totalInactive += 1;
            }
          }
          return false;
        });
        employeeList.forEach((emp) => {
          const cugNumber = emp.Employee_CUG;
          allocationNumbersSet.add(emp.Employee_AllocationNo);
          billNumbersSet.add(emp.Employee_BillUnit);
          plansSet.add(emp.Employee_Plan);
        });

        setSummary({
          totalEmployees,
          activeCUG: totalActive,
          inactiveCUG: totalInactive,
          allocationNumbers: allocationNumbersSet.size,
          billNumbers: billNumbersSet.size,
          plans: Array.from(plansSet),
        });
      }
    });
  }, []);

  return (
    <>
      <main className="homePage">
        <Header />
        <h1>Closed User Group (CUG) Management Portal</h1>
        <p>
          The CUG Management System is designed to streamline and simplify
          management of Closed User Group (CUG) numbers and employees within an
          organization. This system offers an efficient way to handle various
          aspects of CUG number management, including adding new numbers,
          uploading bulk CUG numbers via Excel files, and detailed reports.
        </p>
        <h2>Summary of Employee Database</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Summary</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Total Number of Employees</td>
              <td>{summary.totalEmployees}</td>
            </tr>
            <tr>
              <td>Number of Active CUG</td>
              <td>{summary.activeCUG}</td>
            </tr>
            <tr>
              <td>Number of Inactive CUG</td>
              <td>{summary.inactiveCUG}</td>
            </tr>
            <tr>
              <td>Number of Allocation Numbers</td>
              <td>{summary.allocationNumbers}</td>
            </tr>
            <tr>
              <td>Number of Bill Numbers</td>
              <td>{summary.billNumbers}</td>
            </tr>
            <tr>
              <td>Number of Plans</td>
              <td>{summary.plans.length}</td>
            </tr>
            <tr>
              <td>Plan Names</td>
              <td>{summary.plans.join(", ")}</td>
            </tr>
          </tbody>
        </table>
      </main>
    </>
  );
};

export default HomePage;
