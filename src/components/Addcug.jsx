import "./Addcug.css";
import { useState, useEffect, useContext } from "react";
import { getDatabase, onValue, ref, set, update } from "firebase/database";
import { useNavigate } from "react-router-dom";
import Fapp from "../firebase";
import Header from "../Header";
const Addcug = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [Department, setDepartment] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const HQ_Dept = [
    "ACCTS",
    "AUDIT",
    "COMM",
    "ELECT",
    "ENGG",
    "G A",
    "MECH",
    "MED",
    "OPTG",
    "PERS",
    "RRB",
    "S & T",
    "SAFETY",
    "SECURITY",
    "STORES",
  ];
  const CON_Dept = ["ACCTS", "ELECT", "ENGG", "OPTG", "PERS", "S & T"];
  const MCS_Dept = ["ACCTS", "ELECT", "MECHL", "PERS"];

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
  const [Designation, setDesignation] = useState("");
  const [DepartmentName, setDepartmentName] = useState("");
  const [operator, setOperator] = useState("");
  const [billUnit, setBillUnit] = useState("");
  const [AllocationNum, setAllocationNum] = useState("");
  const [plan, setPlan] = useState("A");
  const now = new Date().toLocaleString();
  const [cugDetails, setCugDetails] = useState(null);
  const [error, setError] = useState(null);
  //-----------Checking the Availability of Employee ID-------------
  const [empAvailable, setempAvailable] = useState(null);
  useEffect(() => {
    if (EmpNo.length === 12) {
      const db = getDatabase(Fapp);
      const empRef = ref(db, "Employees3");
      onValue(empRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const empDetail = Object.values(data).find(
            (item) => item.Employee_Id == EmpNo
          );
          if (empDetail) {
            setempAvailable(true);
            console.log(empDetail);
          } else setempAvailable(false);
        }
      });
    }
  }, [EmpNo]);
  // ----------Checking the Availability of CUG No.-----------------
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (cugNo.length === 10 || cugNo.length === 11) {
      const db = getDatabase(Fapp);
      const cugRef = ref(db, "Employees3");
      onValue(cugRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const cugDetail = Object.values(data).find(
            (item) => item.Employee_CUG == cugNo && item.status === "Active"
          );
          if (cugDetail) {
            setShowModal(true);
            setCugDetails(cugDetail);
            console.log(cugDetail);
          }
        } else {
          setCugDetails(null);
          setError("No CUG found");
        }
      });
    }
  }, [cugNo]);
  // ----------Handling Modal Close----------------
  const handleModalClose = () => {
    setShowModal(false);
    setCugNo("");
  };
  // ----------Handling Modal Yes----------
  const handleModalYes = () => {
    setShowModal(false);
    setempAvailable(null);
    setIsDisabled(true);
    setEmpName(cugDetails.Employee_Name);
    setEmpNo(cugDetails.Employee_Id);
    setDesignation(cugDetails.Employee_Designation);
    setSelectedOption(cugDetails.Employee_Division);
    setDepartmentName(cugDetails.Employee_Dept);
    setOperator(cugDetails.Employee_Operator);
    setBillUnit(cugDetails.Employee_BillUnit);
    setAllocationNum(cugDetails.Employee_AllocationNo);
    setPlan(cugDetails.Employee_Plan);
  };

  // --------------Handling Submit----------------
  const handleSubmit = (event) => {
    event.preventDefault();
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
      set(ref(db, "Employees3/" + EmpNo), {
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
        returnedAt: "",
        status: "Active",
      }).then((res) => {
        alert("Data Submitted Successfully");
      });
      setShowModal(false);
      handleReset();
    }
  };
  // -------------------Emptying Input Fields------------------
  const handleReset = () => {
    setempAvailable(null);
    setCugNo("");
    setEmpName("");
    setEmpNo("");
    setDesignation("");
    setSelectedOption("");
    setDepartmentName("");
    setOperator("");
    setBillUnit("");
    setAllocationNum("");
    setPlan("A");
  };

  // ------------------------Handling Deactivate--------------
  const handleDeactivate = (event) => {
    event.preventDefault();
    const db = getDatabase(Fapp);
    const empRef = ref(db, `Employees3/${EmpNo}`);
    update(empRef, {
      status: "Inactive",
      returnedAt: now,
    }).then((res) => {
      alert("CUG Number Deactivated Successfully");
    });
    setShowModal(false);
    setIsDisabled(false);
    setCugDetails("");
    handleReset();
  };

  return (
    <>
      <main className="addcug">
        <Header />
        <br />
        <h1>Add New CUG</h1>
        <br />
        <form className={`row g-3 ${showModal && "fading"}`}>
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
              disabled={isDisabled}
            />
          </div>
          {/* ----------Employee Id.--------------- */}
          <div className="col-md-4">
            <label htmlFor="inputempNo" className="form-label">
              Employee Id
            </label>
            {empAvailable === false && isDisabled === false && (
              <label htmlFor="inputempNo" className="form-label text-success">
                &nbsp; &nbsp;✔
              </label>
            )}
            {empAvailable === true && isDisabled === false && (
              <label htmlFor="inputempNo" className="form-label text-danger">
                &nbsp; &nbsp;✖
              </label>
            )}
            <input
              type="text"
              className="form-control"
              id="inputempNo"
              value={EmpNo}
              onChange={(e) => {
                setEmpNo(e.target.value);
                setempAvailable(null);
              }}
              maxLength="12"
              disabled={isDisabled}
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
              disabled={isDisabled}
            />
          </div>
          {/* ----------Employee Designation.--------------- */}
          <div className="col-4">
            <label htmlFor="inputDesignation" className="form-label">
              Designation
            </label>
            <input
              id="inputDesignation"
              className="form-control"
              value={Designation}
              onChange={(e) => setDesignation(e.target.value)}
              disabled={isDisabled}
            ></input>
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
              disabled={isDisabled}
            >
              <option value="">Choose..</option>
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
              disabled={isDisabled}
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
            <input
              id="inputOperator"
              className="form-control"
              value={operator.toUpperCase()}
              onChange={(e) => setOperator(e.target.value.toUpperCase())}
              disabled={isDisabled}
            ></input>
          </div>
          {/* ----------Employee Bill Unit--------------- */}
          <div className="col-md-4">
            <label htmlFor="inputbillUnit" className="form-label">
              Bill Unit
            </label>
            <input
              type="text"
              maxLength="7"
              className="form-control"
              id="inputbillUnit"
              value={billUnit}
              onChange={(e) => setBillUnit(e.target.value)}
              disabled={isDisabled}
            />
          </div>
          {/* ----------Employee Allocation--------------- */}
          <div className="col-md-4">
            <label htmlFor="inputAllocation" className="form-label">
              Allocation
            </label>
            <input
              type="text"
              maxLength="8"
              className="form-control"
              id="inputAllocation"
              value={AllocationNum}
              onChange={(e) => setAllocationNum(e.target.value)}
              disabled={isDisabled}
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
              disabled={isDisabled}
            >
              <option value="A">A 74.61</option>
              <option value="B">B 59.05</option>
              <option value="C">C 39.9</option>
            </select>
          </div>
          <div className="col-12">
            {isDisabled === false ? (
              <button
                type="submit"
                className="btn btn-danger"
                onClick={handleSubmit}
              >
                Submit
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-danger"
                onClick={handleDeactivate}
              >
                DeActivate
              </button>
            )}
          </div>
          <div className="col-12">
            {isDisabled === true && (
              <button
                type="submit"
                className="btn btn-outline-primary"
                onClick={() => {
                  setIsDisabled(false);
                  handleReset();
                }}
              >
                Reset
              </button>
            )}
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
