import React, { useState, useEffect } from "react";
import {
  Box,
  CircularProgress
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import EmpDetails from '../profileOverview/EmpDetails';
import api from "../../utils/apiService";

// Define makeStyles for custom styling
const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    padding: "16px",
  },
  section: {
    padding: "16px",
    width: "100%",
    borderRadius: "8px",
    boxShadow: "none !important",
    backgroundColor: '#f3f3f3 !important'
  }
});

// const customerObj = {
//   workflow:[{
//     "Group Company": "CaratLane",
//     "Designation": "Software Engineer - II",
//     "Department": "Technology",
//     "Band": "N.A.",
//     "Band Code": "N.A.",
//     "Grade": "N.A.",
//     "Grade Code": "N.A.",
//     "From-To": "18-11-2022 - Present",
//   }],
//   officeLocation:[{
//     "Country": "India",
//     "State": "Maharashtra",
//     "City": "Mumbai",
//     "From-To": "18-11-2022 - Present",
//   }],
//   manager:[{
//     "Manager Name": "Ajay Paul (CL1266)",
//     "From-To": "18-11-2022 - 05-05-2024"
//   }, 
//   {
//     "Manager Name": "Joseph C (CL0989)",
//     "From-To": "06-05-2024 - Present",
//   }],
//   employeeType:[{
//     "Employee Type": "Full Time Employee (FTE)",
//     "Employee Sub Type": "Executive",
//     "From-To": "18-11-2022 - Present",
//   }],
// };

// The EmployeeDetails component
const EmployeeDetails = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState({});
  const empData = JSON.parse(localStorage.getItem("userData"));

  // Fetch data from the API
  async function fetchEmployeeDetails() {
    if (!empData || !empData._id) {
      console.warn("Employee data is missing or invalid.");
      setLoading(false);
      return;
    }

    try {
      const API_URL = `/api/users/detail/employee/${empData._id}`;
      const response = await api.post(API_URL);

      setCustomer(response.data?.employee);
    } catch (error) {
      console.error("Error fetching employee details:", error.message);
    } finally {
      setLoading(false);
    }
  }

  // Trigger the effect only when `empData._id` changes
  useEffect(() => {
    fetchEmployeeDetails();
  }, [empData?._id]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className={classes.container}>
      {/* Work Role Section */}
      <EmpDetails title={'Work Role'} details={customer.workflow} />

      {/* Current Office Location Section */}
      <EmpDetails title={'Current Office Location'} details={customer.officeLocation} />

      {/* Manager Section */}
      <EmpDetails title={'Manager'} details={customer.manager} />

      {/* Employee Type Section */}
      <EmpDetails title={'Employee Type'} details={customer.employeeType} />

    </Box>
  );
};

export default EmployeeDetails;
