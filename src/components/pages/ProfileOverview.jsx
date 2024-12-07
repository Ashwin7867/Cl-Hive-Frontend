import React, { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  Typography
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import InfoDetails from '../profileOverview/InfoDetails';

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

const customer = {
  overview: {
    "Employee ID": "CL2494",
    "Department": "Technology",
    "Current Office Location": "Mumbai, Maharashtra, India, (Office)",
    "Office Mobile Number": "N.A",
    "Emergency Contact Name": "Manisha Nalawade",
    "Emergency Contact Number": "9867815568",
    "HOD": "Gurukeerthi G (CL0080)",
    "Date of Joining": "18-11-2022",
    "Blood group": "AB+",
    "Company": "CaratLane",
    "Business Unit": "Technology",
    "Employee Type": "Full Time Employee(FTE)",
    "Assigned Permission": "N.A",
    "HRBP Role": "Shreya Agarwal (CL1971)",
    "Department Cost Center Name": "N.A",
    "Department Cost Center ID": "N.A.",
  },
  biographical:{
    "Salutation": "Ms.",
    "First Name": "Mrunal",
    "Middle Name": "N.A",
    "Last Name": "Nalawade",
    "Gender": "Female",
    "Date of Birth": "14-Oct-1998",
  },
  contact:{
    "Personal Email ID": "mrunalawade14@gmail.com",
    "Personal mobile no": "7039703019",
  }
};

// The ProfileOverview component
const ProfileOverview = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);

  // Simulate API loading with a timeout
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulate API delay
  }, []);

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
      {/* Overview Section */}
      <InfoDetails title={'Overview'} details={customer.overview} />

      {/* Biographical Section */}
      <InfoDetails title={'Biographical'} details={customer.biographical} />

      {/* Contact Section */}
      <InfoDetails title={'Contact'} details={customer.contact} />

      {/* Organization Chart Section */}
      <Box>
        <Typography variant="h5" style={{ marginBottom: "8px" }}>
          {'Organization Chart'}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProfileOverview;
