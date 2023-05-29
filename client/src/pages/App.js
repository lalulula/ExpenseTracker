import { useEffect, useState } from "react";
import "../App.css";
import AppBar from "../components/AppBar";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/auth.js";
import Cookies from "js-cookie";
import { redirect } from "react-router-dom";

function App() {
  const token = Cookies.get("token");
  const [isLoading, setIsLoading] = useState(true);
  // const auth = useSelector((state) => state .auth);
  const dispatch = useDispatch();
  async function fetchUser() {
    setIsLoading(true);
    const res = await fetch(`api/authentication/getCurrentUser`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      const user = await res.json();
      dispatch(setUser(user));
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <button className="custom-button btn" type="button" disabled>
          <span className="spinner">
            <i className="bx bx-coin bx-spin"></i>
          </span>
          Loading...
        </button>
      </div>
    );
  }
  return (
    <>
      <AppBar />
      <Outlet />
    </>
  );
}
export default App;
