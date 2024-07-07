import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import "./Sidebar.css";
import { useContext } from "react";
import { userContext } from "../App";
const Sidebar = () => {
  const navigate = useNavigate();
  const { setUserType } = useContext(userContext);
  const handleLogout = () => {
    navigate("/login");
    setUserType(false);
  };
  return (
    <>
      <nav className="dashboard">
        <h2 onClick={() => navigate("/dealer/homePage")}> Dealer Page </h2>

        <ul>
          <li>
            <NavLink to="/dealer/addcug">Add New CUG</NavLink>
          </li>
          <li>
            <NavLink to="/dealer/activateDeactivate">CUG Details</NavLink>
          </li>
          <li>
            <NavLink to="/dealer/allocationReport">
              Allocation-Wise Report
            </NavLink>
          </li>
          <li>
            <NavLink to="/dealer/ExceptionReport">Exception Report</NavLink>
          </li>
          <li>
            <NavLink to="/dealer/planReport">Plan-Wise Billing Report</NavLink>
          </li>
        </ul>
        <button className="logoutbtn" onClick={() => handleLogout}>
          Logout <MdLogout />
        </button>
      </nav>
      <Outlet />
    </>
  );
};
export default Sidebar;
