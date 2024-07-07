// import { Outlet } from "react-router-dom";
// import Header from "../Header";
// const Addplan = () => {
//   return (
//     <>
//       <main className="Add_Plan">
//         <Header />
//         <br />
//         <h1>Add / Update Plan</h1>
//         <br />
//       </main>
//       <Outlet />
//     </>
//   );
// };
// export default Addplan;
import { useState, useEffect } from "react";
import { getDatabase, ref, set, onValue, update } from "firebase/database";
import Fapp from "../firebase";
import Header from "../Header";
import { Outlet } from "react-router-dom";
const AddPlan = () => {
  const [planName, setPlanName] = useState("");
  const [planValue, setPlanValue] = useState("");
  const [plans, setPlans] = useState([]);
  const [toggle, setToggle] = useState(0);
  const [editPlanName, setEditPlanName] = useState("");
  const [editPlanValue, setEditPlanValue] = useState("");

  const db = getDatabase(Fapp);

  const handleAddPlan = (event) => {
    event.preventDefault();
    if (planName === "" || planValue === "") {
      alert("Please fill all the fields");
    } else {
      const planRef = ref(db, `Plan/${planName}`);
      set(planRef, {
        Plan_Name: planName,
        Plan_Value: planValue,
      })
        .then(() => {
          alert("Plan added successfully");
          setPlanName("");
          setPlanValue("");
        })
        .catch((error) => {
          alert("Error adding plan: " + error.message);
        });
    }
  };

  const fetchPlans = () => {
    const planRef = ref(db, "Plan/");
    onValue(planRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const planList = Object.entries(data).map(([name, plan]) => ({
          name,
          value: plan.Plan_Value,
        }));
        setPlans(planList);
      } else {
        setPlans([]);
      }
    });
  };

  const handleUpdatePlan = (name, value) => {
    setEditPlanName(name);
    setEditPlanValue(value);
    setToggle(2); // Switch to update mode
  };

  const handleUpdateSubmit = (event) => {
    event.preventDefault();
    if (editPlanName === "" || editPlanValue === "") {
      alert("Please fill all the fields");
    } else {
      const planRef = ref(db, `Plan/${editPlanName}`);
      update(planRef, {
        Plan_Value: editPlanValue,
      })
        .then(() => {
          alert("Plan updated successfully");
          setEditPlanName("");
          setEditPlanValue("");
          setToggle(1); // Switch back to view mode
        })
        .catch((error) => {
          alert("Error updating plan: " + error.message);
        });
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <>
      <main className="Add_Plan">
        <Header />
        <br />
        <h1>Add / Update Plan</h1>
        <br />
        {toggle === 0 && (
          <>
            <div className="addPlanContainer">
              <form className="row g-3" onSubmit={handleAddPlan}>
                <div className="col-md-3">
                  <label htmlFor="planName" className="form-label">
                    Plan Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="planName"
                    value={planName}
                    onChange={(e) => setPlanName(e.target.value.toUpperCase())}
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="planValue" className="form-label">
                    Plan Value
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="planValue"
                    value={planValue}
                    onChange={(e) => setPlanValue(e.target.value)}
                  />
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-primary">
                    Add Plan
                  </button>
                </div>
              </form>
              <br />
              <button className="btn btn-success" onClick={() => setToggle(1)}>
                View Existing Plans?
              </button>
            </div>
          </>
        )}

        {toggle === 1 && (
          <>
            <div className="viewPlanContainer">
              <button className="btn btn-danger" onClick={() => setToggle(0)}>
                Go Back
              </button>
              <br />
              <br />
              {plans.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Plan Name</th>
                        <th>Plan Value</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {plans.map((plan, index) => (
                        <tr key={index}>
                          <td>{plan.name}</td>
                          <td>{plan.value}</td>
                          <td>
                            <button
                              className="btn btn-warning"
                              onClick={() =>
                                handleUpdatePlan(plan.name, plan.value)
                              }
                            >
                              Update
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No plans available</p>
              )}
            </div>
          </>
        )}

        {toggle === 2 && (
          <>
            <div className="updatePlanContainer">
              <button className="btn btn-danger" onClick={() => setToggle(1)}>
                Go Back
              </button>
              <br />
              <br />
              <form className="row g-3" onSubmit={handleUpdateSubmit}>
                <div className="col-md-6">
                  <label htmlFor="editPlanName" className="form-label">
                    Plan Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="editPlanName"
                    value={editPlanName}
                    readOnly
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="editPlanValue" className="form-label">
                    Plan Value
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="editPlanValue"
                    value={editPlanValue}
                    onChange={(e) => setEditPlanValue(e.target.value)}
                  />
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-primary">
                    Update Plan
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </main>
      <Outlet />
    </>
  );
};

export default AddPlan;
