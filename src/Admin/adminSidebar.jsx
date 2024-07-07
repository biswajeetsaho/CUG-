import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "../components/Sidebar.css";
import { MdLogout } from "react-icons/md";
import { useContext } from "react";
import { userContext } from "../App";
const AdminSidebar = () => {
  const navigate = useNavigate();
  const { setUserType } = useContext(userContext);
  const handleLogout = () => {
    navigate("/login");
    setUserType(false);
  };

  return (
    <>
      <nav className="dashboard">
        <h2 onClick={() => navigate("/admin/homePage")}> Admin Page </h2>

        <ul>
          <li>
            <NavLink to="/admin/createDealer">Create Dealer</NavLink>{" "}
          </li>
          <li>
            <NavLink to="/admin/addcug">Add New CUG</NavLink>
          </li>
          <li>
            <NavLink to="/admin/cugdetails">CUG Details</NavLink>
          </li>
          <li>
            <NavLink to="/admin/allotmentHistory">Allotment History</NavLink>
          </li>
          <li>
            <NavLink to="/admin/allocationReport">
              Allocation-Wise Report
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/cugStatusReport">CUG Status Report</NavLink>
          </li>
          <li>
            <NavLink to="/admin/activate_Deactivate_report">
              Activate Deactivate Report
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/billPassing">Bill Pasing Register</NavLink>
          </li>
          <li>
            <NavLink to="/admin/upload_CUGbill">Upload CUG Bill</NavLink>
          </li>
          <li>
            <NavLink to="/admin/upload_CUGNo">Upload CUG No.</NavLink>
          </li>
          <li>
            <NavLink to="/admin/addPlan">Add / Update Plan</NavLink>
          </li>
        </ul>
        <div></div>
        <button className="logoutbtn" onClick={handleLogout}>
          Logout <MdLogout />
        </button>
      </nav>
      <Outlet />
    </>
  );
};
export default AdminSidebar;
