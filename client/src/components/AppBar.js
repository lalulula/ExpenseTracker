import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/auth";

export default function ButtonAppBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const handleLogout = () => {
    Cookies.remove("token");
    dispatch(logout());
    navigate("/login");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to={"/"} className="appbar-text">
              Expense Tracker
            </Link>
          </Typography>
          {isAuthenticated && (
            <>
              <Link to={"/category"} className="appbar-text">
                <Button color="inherit">Edit_Category</Button>
              </Link>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
          {!isAuthenticated && (
            <>
              {" "}
              <Link to={"/login"} className="appbar-text">
                <Button color="inherit">Login</Button>
              </Link>
              <Link to={"/register"} className="appbar-text">
                <Button color="inherit">Register</Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
