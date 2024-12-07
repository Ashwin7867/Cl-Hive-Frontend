import React from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";

// Define styles using makeStyles
const useStyles = makeStyles({
    logoutButton: {
      position: "absolute",
      bottom: "16px",
      left: "16px",
      backgroundColor: "#d0bdf0", // Pastel purple, darker than background
      color: "white",
      border: "none",
      padding: "8px 16px",
      borderRadius: "4px",
      "&:hover": {
        backgroundColor: "#b299d0",
      },
      cursor: "pointer",
    }
  });
  
// Wrap Logout Logic Component
const LogoutButton = () => {
    const navigate = useNavigate();
    const classes = useStyles();

    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated");
        navigate("/");
    };

    return (
        <button
        className={classes.logoutButton}
        onClick={handleLogout}
    >
        Logout
    </button>
    );
};

export default LogoutButton;
