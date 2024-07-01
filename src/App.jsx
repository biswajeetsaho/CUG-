import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import Addcug from "./components/Addcug";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AcDeac from "./components/activate_deactivateCUG";
import AllocationReport from "./components/allocationRepo";
import PlanReport from "./components/planReport";
import AdminSidebar from "./Admin/adminSidebar";
import AllHis from "./Admin/allotmentHistory";
import AcDeacReport from "./Admin/activate_deactivateReport";
import CreateDealer from "./Admin/createDealer";
import CugStatusReport from "./Admin/cugStatusReport";
import HomePage from "./homePage";
import UploadCUGBill from "./Admin/upload_CUGBill";
import UploadCUG from "./Admin/upload_NewCug";
import UserContextProvider from "./userState";
import BillPassingRegister from "./Admin/BillPassing";
import ExceptionReport from "./components/ExceptionRepo";
function App() {
  return (
    <>
      <UserContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            {/* -------------Dealer Page Routing--------------- */}
            <Route path="/" element={<Navigate to="/login" />}></Route>
            <Route path="*" element={<Navigate to="/login" />}></Route>
            <Route path="/dealer" element={<Sidebar />}>
              <Route path="/dealer/homePage" element={<HomePage />}></Route>
              <Route path="/dealer/addcug" element={<Addcug />}></Route>
              <Route
                path="/dealer/activateDeactivate"
                element={<AcDeac />}
              ></Route>
              <Route
                path="/dealer/allocationReport"
                element={<AllocationReport />}
              ></Route>
              <Route
                path="/dealer/ExceptionReport"
                element={<ExceptionReport />}
              ></Route>
              <Route path="/dealer/planReport" element={<PlanReport />}></Route>
            </Route>
            {/* -------------Admin Page Routing--------------- */}
            <Route path="/admin" element={<AdminSidebar />}>
              <Route path="/admin/homePage" element={<HomePage />}></Route>
              <Route
                path="/admin/createDealer"
                element={<CreateDealer />}
              ></Route>
              <Route path="/admin/addcug" element={<Addcug />}></Route>
              <Route path="/admin/cugdetails" element={<AcDeac />}></Route>
              <Route
                path="/admin/allotmentHistory"
                element={<AllHis />}
              ></Route>
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
              <Route
                path="/admin/billPassing"
                element={<BillPassingRegister />}
              ></Route>
              <Route
                path="/admin/upload_CUGbill"
                element={<UploadCUGBill />}
              ></Route>
              <Route path="/admin/upload_CUGNo" element={<UploadCUG />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </>
  );
}

export default App;
