// src/PrivateRoute.jsx
import { Navigate } from "react-router-dom";

// isAuthenticated is passed as a prop to check if the user is logged in
const PrivateRoute = ({ element }) => {
  console.log(element, "elementelement");
  // If the user is not authenticated, navigate them to the login page
  let token = localStorage.getItem("token");
  return token ? element : <Navigate to={"/"} />;
};

export default PrivateRoute;
