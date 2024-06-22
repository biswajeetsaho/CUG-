import "./Addcug.css";
import { useState, useEffect } from "react";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import Fapp from "../firebase";
import { getMode } from "../userState.jsx";
// import { Modal, Button } from "bootstrap";

const Addcug = () => {
  const [selectedOption, setSelectedOption] = useState("HQ");
  const [Department, setDepartment] = useState([]);

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

  // -----------States for all the Input Fields---------------------
  const [cugNo, setCugNo] = useState("");
  const [EmpNo, setEmpNo] = useState("");
  const [EmpName, setEmpName] = useState("");
  const [Designation, setDesignation] = useState("MR");
  const [DepartmentName, setDepartmentName] = useState("");
  const [operator, setOperator] = useState("jio");
  const [billUnit, setBillUnit] = useState("");
  const [AllocationNum, setAllocationNum] = useState("");
  const [plan, setPlan] = useState("A");
  const now = new Date().toLocaleString();
  const [cugDetails, setCugDetails] = useState(null);
  const [error, setError] = useState(null);
  // ----------Checking the Availability of CUG No.-----------------
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (cugNo.length === 10 || cugNo.length === 11) {
      const db = getDatabase(Fapp);
      const cugRef = ref(db, "Employees2");
      onValue(cugRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const cugDetail = Object.values(data).find(
            (item) => item.Employee_CUG == cugNo && item.status === "Active"
          );
          if (cugDetail) {
            setShowModal(true);
            console.log(cugDetail);
          }
        } else {
          setCugDetails(null);
          setError("No CUG found");
        }
      });
    }
  }, [cugNo]);
  const handleModalClose = () => {
    setShowModal(false);
    setCugNo("");
  };
  const handleModalYes = () => {
    setShowModal(false);
    const mode = getMode();
    if (mode === "Dealer")
      navigate("/dealer/activateDeactivate", { state: { cugNumber: cugNo } });
    else if (mode === "Admin")
      navigate("/admin/cugdetails", { state: { cugNumber: cugNo } });
  };

  // --------------------------------
  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission logic
    // console.log("Form Submitted:", {
    //   cugNo,
    //   EmpNo,
    //   EmpName,
    //   Designation,
    //   selectedOption,
    //   DepartmentName,
    //   operator,
    //   billUnit,
    //   AllocationNum,
    //   plan,
    // });
    const db = getDatabase(Fapp);
    if (
      cugNo === "" ||
      EmpName === "" ||
      EmpNo === "" ||
      Designation === "" ||
      selectedOption === "" ||
      DepartmentName === "" ||
      operator === "" ||
      billUnit === "" ||
      AllocationNum === "" ||
      plan === ""
    )
      alert("Please Enter All the Field");
    else {
      set(ref(db, "Employees/" + EmpNo), {
        Employee_Name: EmpName,
        Employee_CUG: cugNo,
        Employee_Id: EmpNo,
        Employee_Designation: Designation,
        Employee_Division: selectedOption,
        Employee_Dept: DepartmentName,
        Employee_Operator: operator,
        Employee_BillUnit: billUnit,
        Employee_AllocationNo: AllocationNum,
        Employee_Plan: plan,
        createdAt: now,
      }).then((res) => {
        alert("Data Submitted Successfully");
      });
    }
  };

  return (
    <>
      <main className="addcug">
        <h1>Add New CUG</h1>
        <br />
        <form
          className={`row g-3 ${showModal && "fading"}`}
          onSubmit={handleSubmit}
        >
          {/* ----------CUG NO.------------------ */}
          <div className="col-md-4">
            <label htmlFor="inputCUGno" className="form-label">
              CUG No.
            </label>
            <input
              type="text"
              className="form-control"
              id="inputCUGno"
              value={cugNo}
              onChange={(e) => setCugNo(e.target.value)}
              maxLength="11"
            />
          </div>
          {/* ----------Employee Id.--------------- */}
          <div className="col-md-4">
            <label htmlFor="inputempNo" className="form-label">
              Employee Id
            </label>
            <input
              type="number"
              className="form-control"
              id="inputempNo"
              value={EmpNo}
              onChange={(e) => setEmpNo(e.target.value)}
              maxLength="12"
            />
          </div>
          {/* ----------Employee Name.--------------- */}
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              Employee Name
            </label>
            <input
              type="text"
              className="form-control"
              id="inputName"
              placeholder="John Wick"
              value={EmpName}
              onChange={(e) => setEmpName(e.target.value)}
            />
          </div>
          {/* ----------Employee Designation.--------------- */}
          <div className="col-4">
            <label htmlFor="inputDesignation" className="form-label">
              Designation
            </label>
            <select
              id="inputDesignation"
              className="form-select"
              value={Designation}
              onChange={(e) => setDesignation(e.target.value)}
            >
              <option value="MR">MR</option>
              <option value="MRS">MRS</option>
              <option value="DR">DR</option>
            </select>
          </div>
          {/* ----------Employee Division--------------- */}
          <div className="col-md-4">
            <label htmlFor="inputDivision" className="form-label">
              Division
            </label>
            <select
              className="form-select"
              id="inputDivision"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="HQ">HQ</option>
              <option value="CON">CON</option>
              <option value="MCS">MCS</option>
            </select>
          </div>
          {/* ----------Employee Department--------------- */}
          <div className="col-md-4">
            <label htmlFor="inputDept" className="form-label">
              Department
            </label>
            <select
              className="form-select"
              id="inputDept"
              value={DepartmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
            >
              <option value="">Choose..</option>
              {Department.map((dept, index) => (
                <option key={index} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
          {/* ----------Employee Operator--------------- */}
          <div className="col-md-4">
            <label htmlFor="inputOperator" className="form-label">
              Operator
            </label>
            <select
              id="inputOperator"
              className="form-select"
              value={operator}
              onChange={(e) => setOperator(e.target.value)}
            >
              <option value="jio">jio</option>
              <option value="Vodafone">Vodafone</option>
              <option value="BSNL">BSNL</option>
              <option value="Airtel">Airtel</option>
            </select>
          </div>
          {/* ----------Employee Bill Unit--------------- */}
          <div className="col-md-4">
            <label htmlFor="inputbillUnit" className="form-label">
              Bill Unit
            </label>
            <input
              type="number"
              className="form-control"
              id="inputbillUnit"
              value={billUnit}
              onChange={(e) => setBillUnit(e.target.value)}
            />
          </div>
          {/* ----------Employee Allocation--------------- */}
          <div className="col-md-4">
            <label htmlFor="inputAllocation" className="form-label">
              Allocation
            </label>
            <input
              type="number"
              className="form-control"
              id="inputAllocation"
              value={AllocationNum}
              onChange={(e) => setAllocationNum(e.target.value)}
            />
          </div>
          {/* ----------Employee Plan--------------- */}
          <div className="col-md-4">
            <label htmlFor="inputPlan" className="form-label">
              Plan
            </label>
            <select
              id="inputPlan"
              className="form-select"
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-danger">
              Submit
            </button>
          </div>
        </form>
        {/* Modal */}
        {showModal && (
          <div
            className="modal  "
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
            style={{ display: "block" }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="staticBackdropLabel">
                    CUG Number Already Assigned
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={handleModalClose}
                  ></button>
                </div>
                <div className="modal-body">
                  CUG Number is already assigned. Would you like to see its
                  details?
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={handleModalClose}
                  >
                    No
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleModalYes}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Addcug;
