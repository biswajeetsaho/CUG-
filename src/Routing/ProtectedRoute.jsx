import { Navigate } from "react-router-dom";
// import { useAuth } from "./AuthContext";
import { useContext } from "react";
import { userContext } from "../App.jsx";

// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const { user } = useAuth();

//   if (!user || !allowedRoles.includes(user.role)) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// };
const ProtectedRoute = ({ element }) => {
  const { userType } = useContext(userContext);
  return userType ? element : <Navigate to="/login" />;
};
export default ProtectedRoute;
