import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function IfGuest({ children }) {
  const auth = useSelector((state) => state.auth);

  return !auth.isAuthenticated ? children : <Navigate to={"/"} />;
}
