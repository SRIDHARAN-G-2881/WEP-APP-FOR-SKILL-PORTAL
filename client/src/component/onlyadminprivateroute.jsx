import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function OnlyAdminPrivateRouter() {
  const current = useSelector((state) => state.user.currentuser);

  // Check if current is null or undefined before accessing isadmin
  if (!current) {
    return <Navigate to="/signin" />;
  }

  return current.isadmin ? <Outlet /> : <Navigate to="/signin" />;
}
