import { Navigate, Outlet } from "react-router-dom";
const PrivateRoutes = () => {
  let RoleID = localStorage.getItem("roleID");
  const currentUser = JSON.parse(RoleID) === 6 ? true : false;
  const token = localStorage.getItem("token");
  return currentUser && token ? <Outlet /> : <Navigate to="*" />;
};
export default PrivateRoutes;
