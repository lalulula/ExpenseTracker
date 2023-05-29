// import Cookies from "js-cookie";
// import { Navigate } from "react-router-dom";

// export default function CheckAuth({ children }) {
//   const token = Cookies.get("token");
//   return token ? children : <Navigate to={"/login"} replace={true} />;
// }
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Navigate, redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CheckAuth({ children }) {
  const auth = useSelector((state) => state.auth);
  return auth.isAuthenticated ? children : <Navigate to={"/login"} />;
}
