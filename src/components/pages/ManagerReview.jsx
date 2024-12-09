import React, { useState } from "react";
import {
  Box,
  Typography,
  Collapse,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Radar } from "@mui/icons-material";

const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "space-between",
    padding: "16px",
  },
  lowerBox: {
    backgroundColor: "#f3f3f3",
    padding: "16px",
    marginTop: "16px",
    borderRadius: "8px",
  },
  dropdown: {
    width: "250px",
  },
  row: {
    marginBottom: "16px",
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: "8px 16px",
    textAlign: "left",
  },
  titleWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  collapseContent: {
    padding: "16px",
    backgroundColor: "white",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginTop: "8px",
  },
  targetArea: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#e0f7fa",
    padding: "8px",
    borderRadius: "4px",
    marginBottom: "8px",
  },
  textField: {
    marginBottom: "16px",
  },
  submitButton: {
    marginTop: "16px",
    backgroundColor: "#6972a3",
    color: "white",
  },
  readOnlyField: {
    backgroundColor: "#f5f5f5",
    padding: "8px",
    borderRadius: "4px",
    marginBottom: "8px",
  },
});

const teamMates = [
  { empId: "E001", empName: "Alice Johnson" },
  { empId: "E002", empName: "Bob Smith" },
  { empId: "E003", empName: "Charlie Davis" },
];

const teamMemberMap = {
  E001: [
    {
      _id: "id1",
      title: "Business Bullseye",
      target: "Predefined goals text is this",
      selfRating: 3,
      selfReviewText: "rgreg fnor pinrvpir pinrpnrwv",
    },
    {
      _id: "id2",
      title: "Functional Excellence",
      target: "Predefined goals text is this",
      selfRating: 4,
      selfReviewText: "rgreg fnor pinrvpir pinrpnrwv",
    },
    {
      _id: "id3",
      title: "Change The Game",
      target: "Predefined goals text is this",
      selfRating: 3,
      selfReviewText: "rgreg fnor pinrvpir pinrpnrwv",
    },
    {
      _id: "id4",
      title: "All About People/Individual Excellence",
      target: "Predefined goals text is this",
      selfRating: 4,
      selfReviewText: "rgreg fnor pinrvpir pinrpnrwv",
    },
    {
      _id: "id5",
      title: "Overview",
      selfRating: 4,
      selfReviewText: "rgreg fnor pinrvpir pinrpnrwv",
    }
  ],
  E002: [
    {
      _id: "id1",
      title: "Business Bullseye",
      target: "Predefined goals text is this",
      selfRating: 3,
      selfReviewText: "rgreg fnor pinrvpir pinrpnrwv",
    },
    {
      _id: "id2",
      title: "Functional Excellence",
      target: "Predefined goals text is this",
      selfRating: 4,
      selfReviewText: "rgreg fnor pinrvpir pinrpnrwv",
    },
    {
      _id: "id3",
      title: "Change The Game",
      target: "Predefined goals text is this",
      selfRating: 3,
      selfReviewText: "rgreg fnor pinrvpir pinrpnrwv",
    },
    {
      _id: "id4",
      title: "All About People/Individual Excellence",
      target: "Predefined goals text is this",
      selfRating: 4,
      selfReviewText: "rgreg fnor pinrvpir pinrpnrwv",
    },
    {
      _id: "id5",
      title: "Overview",
      selfRating: 4,
      selfReviewText: "rgreg fnor pinrvpir pinrpnrwv",
    }
  ],
  E003: [
    {
      _id: "id1",
      title: "Business Bullseye",
      target: "Predefined goals text is this",
      selfRating: 3,
      selfReviewText: "rgreg fnor pinrvpir pinrpnrwv",
    },
    {
      _id: "id2",
      title: "Functional Excellence",
      target: "Predefined goals text is this",
      selfRating: 4,
      selfReviewText: "rgreg fnor pinrvpir pinrpnrwv",
    },
    {
      _id: "id3",
      title: "Change The Game",
      target: "Predefined goals text is this",
      selfRating: 3,
      selfReviewText: "rgreg fnor pinrvpir pinrpnrwv",
    },
    {
      _id: "id4",
      title: "All About People/Individual Excellence",
      target: "Predefined goals text is this",
      selfRating: 4,
      selfReviewText: "rgreg fnor pinrvpir pinrpnrwv",
    },
    {
      _id: "id5",
      title: "Overview",
      selfRating: 4,
      selfReviewText: "rgreg fnor pinrvpir pinrpnrwv",
    }
  ],
};

const ratingOptions = [
  { value: 1, label: "Need Improvement" },
  { value: 2, label: "Below Expectations" },
  { value: 3, label: "Met All Expectations" },
  { value: 4, label: "Exceeded Some Expectations" },
  { value: 5, label: "Highly Exceeded Expectations" },
];

const ManagerReview = () => {
  const classes = useStyles();
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [responses, setResponses] = useState([]);
  const [openRows, setOpenRows] = useState({});

  const handleEmployeeChange = (e) => {
    const empId = e.target.value;
    setSelectedEmployee(empId);

    if (teamMemberMap[empId]) {
      setResponses(
        teamMemberMap[empId].map((response) => ({
          ...response,
          managerRating: "",
          managerReviewText: "",
        }))
      );
      setOpenRows({}); // Reset collapsible rows
    } else {
      setResponses([]);
    }
  };

  const toggleRow = (index) => {
    setOpenRows((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleManagerRatingChange = (index, value) => {
    setResponses((prev) =>
      prev.map((response, i) =>
        i === index ? { ...response, managerRating: value } : response
      )
    );
  };

  const handleManagerTextChange = (index, value) => {
    setResponses((prev) =>
      prev.map((response, i) =>
        i === index ? { ...response, managerReviewText: value } : response
      )
    );
  };

  const handleSubmit = () => {
    const isValid = responses.every(
      (response) =>
        response.managerRating !== "" &&
        response.managerReviewText?.trim()?.length > 0
    );
  
    if (!isValid) {
      alert("Please fill out all fields before submitting.");
      return;
    }
  
    const submissionData = {
      empId: selectedEmployee,
      empName: teamMates.find((mate) => mate.empId === selectedEmployee)?.empName,
      reviews: responses.map((response) => ({
        title: response.title,
        selfRating: response.selfRating,
        selfReviewText: response.selfReviewText,
        managerRating: response.managerRating,
        managerReviewText: response.managerReviewText,
      })),
    };
  
    console.log("Submitted data:", submissionData);
  };
  

  return (
    <>
      <Box className={classes.container}>
        <FormControl className={classes.dropdown}>
          <InputLabel>Select Team Member</InputLabel>
          <Select
            value={selectedEmployee}
            onChange={handleEmployeeChange}
            label="Select Employee"
          >
            {teamMates.map((mate) => (
              <MenuItem key={mate.empId} value={mate.empId}>
                {mate.empName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box className={classes.lowerBox}>
        {responses.map((response, index) => (
          <Box key={index} className={classes.row}>
            <Button
              variant="contained"
              onClick={() => toggleRow(index)}
              className={classes.button}
            >
              <Box className={classes.titleWrapper}>
                <Typography>{response.title}</Typography>
                <span>{openRows[index] ? "-" : "+"}</span>
              </Box>
            </Button>
            <Collapse in={openRows[index]}>
              <Box className={classes.collapseContent}>
                {/* Show Target if not Overview */}
                {response.title !== "Overview" && (
                  <Box className={classes.targetArea}>
                    <Radar />
                    <Typography>{response.target}</Typography>
                  </Box>
                )}

                {/* Display Self Rating and Review */}
                <Box className={classes.readOnlyField}>
                  <Typography>
                    <strong>Self Rating:</strong> {response.selfRating}
                  </Typography>
                  <Typography>
                    <strong>Self Review:</strong> {response.selfReviewText}
                  </Typography>
                </Box>

                {/* Manager Editable Fields */}
                <TextField
                  select
                  label="Manager Rating"
                  value={response.managerRating}
                  onChange={(e) =>
                    handleManagerRatingChange(index, e.target.value)
                  }
                  fullWidth
                  className={classes.textField}
                >
                  {ratingOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="Manager Review"
                  multiline
                  rows={4}
                  value={response.managerReviewText}
                  onChange={(e) =>
                    handleManagerTextChange(index, e.target.value)
                  }
                  fullWidth
                  className={classes.textField}
                />
              </Box>
            </Collapse>
          </Box>
        ))}

        <Button
          variant="contained"
          onClick={handleSubmit}
          className={classes.submitButton}
        >
          Submit
        </Button>
      </Box>
    </>
  );
};

export default ManagerReview;
