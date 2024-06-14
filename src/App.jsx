import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import Addcug from "./components/Addcug";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AcDeac from "./components/activate_deactivateCUG";
import AllocationReport from "./components/allocationRepo";
import PlanReport from "./components/planReport";
import AdminSidebar from "./Admin/adminSidebar";
import AllHis from "./Admin/allotmentHistory";
import AcDeacReport from "./Admin/activate_deactivateReport";
import CreateDealer from "./Admin/createDealer";
import CugStatusReport from "./Admin/cugStatusReport";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <Login /> */}
      {/* <Sidebar />
      <Addcug /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          {/* -------------Dealer Page Routing--------------- */}
          <Route path="/dealer" element={<Sidebar />}>
            <Route path="/dealer/addcug" element={<Addcug />}></Route>
            <Route
              path="/dealer/activateDeactivate"
              element={<AcDeac />}
            ></Route>
            <Route
              path="/dealer/allocationReport"
              element={<AllocationReport />}
            ></Route>
            <Route path="/dealer/planReport" element={<PlanReport />}></Route>
          </Route>
          {/* -------------Admin Page Routing--------------- */}
          <Route path="/admin" element={<AdminSidebar />}>
            <Route
              path="/admin/createDealer"
              element={<CreateDealer />}
            ></Route>
            <Route path="/admin/addcug" element={<Addcug />}></Route>
            <Route path="/admin/cugdetails" element={<AcDeac />}></Route>
            <Route path="/admin/allotmentHistory" element={<AllHis />}></Route>
            <Route
              path="/admin/allocationReport"
              element={<AllocationReport />}
            ></Route>
            <Route
              path="/admin/cugStatusReport"
              element={<CugStatusReport />}
            ></Route>
            <Route
              path="/admin/activate_Deactivate_report"
              element={<AcDeacReport />}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
