
import type { JSX } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { Navigate } from "react-router-dom";

const StudentRoute = ({ element }: { element: JSX.Element }) => {
  const role = useSelector((state: RootState) => state.auth.user?.role);
  return role === "student" ? element : <Navigate to="/" replace />;
};
export default StudentRoute
