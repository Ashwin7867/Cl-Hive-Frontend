import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Avatar,
  Divider,
  TextField,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import LoginPage from "./components/pages/LoginPage";
import ProtectedRoute from "./components/common/ProtectedRoute";
import ProfileOverview from "./components/pages/ProfileOverview";
import EmployeeDetails from "./components/pages/EmployeeDetails";
import YearlyGoalPlan from "./components/pages/YearlyGoalPlan";
import QuarterlyGoalPlan from "./components/pages/QuarterlyGoalPlan";
import SelfReview from "./components/pages/SelfReview";
import ManagerReview from "./components/pages/ManagerReview";
import Appraisal from "./components/pages/Appraisal";
import OnboardEmployee from "./components/pages/OnboardEmployee";
import LogoutButton from "./components/common/LogoutButton";

import { FaUser } from "react-icons/fa";

// Create a theme with pastel colors
const theme = createTheme({
  palette: {
    primary: {
      main: "#e8eaf6", // Light pastel purple
    },
    secondary: {
      main: "#0096FF", // Light pastel pink
    },
    tertiary: {
      main: "#0096FF"
    },
    text: {
      primary: "#4a4a4a",
    },
    background: {
      default: "#fafafa",
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    fontWeightBold: 600,
  },
});

// Define styles using makeStyles
const useStyles = makeStyles({
  drawer: {
    width: 240,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: 240,
      backgroundColor: "#e8eaf6",
      color: "#4a4a4a",
    },
  },
  searchBarContainer: {
    display: "flex",
    alignItems: "center",
    backgroundColor: '#e8eaf6',
    position: 'sticky',
    top: '0',
    zIndex: 1000    
  },
  searchBar: {
    flexGrow: 1,
    "& .MuiInputBase-root": {
      width: '40%',
      margin: '16px',
      borderRadius: '16px',
      alignSelf: 'center'    },
  },
  employeeSection: {
    padding: "16px",
    textAlign: "center",
    borderBottom: "1px solid #b0bec5",
  },
  employeeIcon: {
    backgroundColor: "#4a4a4a",
    color: "white",
    width: "64px",
    height: "64px",
    marginBottom: "8px",
    margin: "auto",
  },
  employeeDetails: {
    fontSize: "14px",
    lineHeight: "1.6",
    margin: "4px 0",
  },
  menuGap: {
    margin: "24px 0",
  },
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
  },
  mainContent: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: "#fafafa",
    color: "#4a4a4a",
  },
  sidebarItem: {
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#fce4ec",
    },
  },
  subSidebarItem: {
    paddingLeft: "32px !important",
    "&:hover": {
      backgroundColor: "#fce4ec",
    },
  },
  rightArea:{
    width: '-webkit-fill-available',
  }
});

const App = () => {
  const classes = useStyles();
  const empData = JSON.parse(localStorage.getItem("userData"));

  const menuItems = [
    {
      label: "Profile",
      path: "/profile-overview",
      subItems: [
        { label: "Overview", path: "/profile-overview" },
        { label: "Employee Details", path: "/profile-employee-details" },
      ],
    },
    {
      label: "Performance",
      path: "/performance-yearly-goal",
      subItems: [
        { label: "Yearly Goal Plan", path: "/performance-yearly-goal" },
        { label: "Quarterly Goal Plan", path: "/performance-quarterly-goal" },
        { label: "Self Review", path: "/performance-self-review" },
        { label: "Manager Review", path: "/performance-manager-review" },
        { label: "Appraisal", path: "/performance-appraisal" },
      ],
    },
    { label: "Onboard Employee", path: "/onboard-employee" },
  ];

  const renderNestedRoutes = () => (
    <>
      {/* Profile Routes */}
      <Route path="/profile-overview" element={<ProfileOverview />} />
      <Route path="/profile-employee-details" element={<EmployeeDetails />} />

      {/* Performance Routes */}
      <Route path="/performance-yearly-goal" element={<YearlyGoalPlan />} />
      <Route path="/performance-quarterly-goal" element={<QuarterlyGoalPlan />} />
      <Route path="/performance-self-review" element={<SelfReview />} />
      <Route path="/performance-manager-review" element={<ManagerReview />} />
      <Route path="/performance-appraisal" element={<Appraisal />} />

      {/* Onboard Employee Route */}
      <Route path="/onboard-employee" element={<OnboardEmployee />} />
    </>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Login Route */}
          <Route path="/" element={<LoginPage />} />

          {/* Protected Routes with Sidebar */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Box sx={{ display: "flex", height: "100vh" }}>
                  {/* Sidebar */}
                  <Drawer className={classes.drawer} variant="permanent">
                    {/* Employee Section */}
                    <Box className={classes.employeeSection}>
                      <Avatar className={classes.employeeIcon}>
                        <FaUser />
                      </Avatar>
                      <div className={classes.employeeDetails}>{empData.name}</div>
                      <div className={classes.employeeDetails}>{empData.role}</div>
                      <div className={classes.employeeDetails}>{empData.department}</div>
                      <div className={classes.employeeDetails}>{empData.emp_code}</div>
                      <div className={classes.employeeDetails}>{empData.email}</div>
                    </Box>
                    <Divider className={classes.menuGap} />
                    {/* Menu Items */}
                    <List>
                      {menuItems.map((item) => (
                        <React.Fragment key={item.label}>
                          <ListItem
                            button
                            component="a"
                            href={item.path}
                            className={classes.sidebarItem}
                          >
                            <ListItemText primary={item.label} />
                          </ListItem>
                          {item.subItems?.map((subItem) => (
                            <ListItem
                              key={subItem.label}
                              button
                              component="a"
                              href={subItem.path}
                              className={classes.subSidebarItem}
                            >
                              <ListItemText primary={subItem.label} />
                            </ListItem>
                          ))}
                        </React.Fragment>
                      ))}
                    </List>
                    {/* Logout Button */}
                    <LogoutButton />
                  </Drawer>
                  <Box className={classes.rightArea}>
                    {/* Search Bar */}
                    <Box className={classes.searchBarContainer}>
                      <TextField
                        variant="outlined"
                        placeholder="Employee Search..."
                        fullWidth
                        className={classes.searchBar}
                      />
                    </Box>
                    {/* Main Content */}
                    <Box className={classes.mainContent}>
                      <Routes>{renderNestedRoutes()}</Routes>
                    </Box>
                  </Box>

                </Box>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
