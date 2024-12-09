import React, { useState } from "react";
import {
  Box,
  Typography,
  Collapse,
  Button,
  Tabs,
  Tab,
  TextField,
  MenuItem,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Radar } from "@mui/icons-material";

const useStyles = makeStyles({
  lowerBox: {
    backgroundColor: "#f3f3f3",
    padding: "16px",
    marginTop: "16px",
    borderRadius: "8px",
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
  title: {
    flex: 1,
    textAlign: "left",
  },
  weightage: {
    width: "100px",
    textAlign: "right",
    fontSize: "14px",
    color: "#555",
  },
  sign: {
    fontWeight: "bold",
    fontSize: "18px",
    marginLeft: "16px",
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
    marginBottom: "16px",
  },
  bullseyeIcon: {
    marginRight: "8px",
    color: "#00796b",
  },
  textField: {
    marginBottom: "16px",
  },
  submitButton: {
    marginTop: "16px",
    backgroundColor: "#6972a3",
    color: "white",
  },
});

const ratingOptions = [
  { value: 1, label: "Need Improvement" },
  { value: 2, label: "Below Expectations" },
  { value: 3, label: "Met All Expectations" },
  { value: 4, label: "Exceeded Some Expectations" },
  { value: 5, label: "Highly Exceeded Some Expectations" },
];

const goals = [
  { _id:'id1', title: "Business Bullseye", weightage: 40, target: "Predefined goals text is this" },
  { _id:'id2',title: "Functional Excellence", weightage: 30, target: "Predefined goals text is this" },
  { _id:'id3',title: "Change The Game", weightage: 15, target: "Predefined goals text is this" },
  { _id:'id4',title: "All About People/Individual Excellence", weightage: 15, target: "Predefined goals text is this" },
  { _id:'id5',title: "Overview", weightage: null },
];

const SelfReview = () => {
  const classes = useStyles();
  const [openRows, setOpenRows] = useState({ 0: true });
  const [responses, setResponses] = useState(
    goals.map((goal) => ({
      title: goal.title,
      weightage: goal.weightage,
      selfRating: "",
      selfReviewText: "",
    }))
  );

  const toggleRow = (index) => {
    setOpenRows((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleRatingChange = (index, value) => {
    setResponses((prev) =>
      prev.map((response, i) =>
        i === index ? { ...response, selfRating: value } : response
      )
    );
  };

  const handleTextChange = (index, value) => {
    setResponses((prev) =>
      prev.map((response, i) =>
        i === index ? { ...response, selfReviewText: value } : response
      )
    );
  };

  const handleSubmit = () => {
    const isValid = responses.every(
      (response) =>
        response.selfRating !== "" &&
        response.selfReviewText.trim().length > 0
    );
  
    if (!isValid) {
      alert("Please fill out all fields before submitting.");
      return;
    }
  
    // Prepare the submitted data with id and title
    const submitData = responses.map((response, index) => ({
      _id: goals[index]._id,
      title: response.title,
      selfRating: response.selfRating,
      selfReviewText: response.selfReviewText,
    }));
  
    console.log("Submitted:", submitData);
  };
  
  return (
    <Box>
      <Box className={classes.lowerBox}>
        {goals.map((goal, index) => (
          <Box key={index} className={classes.row}>
            <Button
              variant="contained"
              onClick={() => toggleRow(index)}
              className={classes.button}
            >
              <Box className={classes.titleWrapper}>
                <Typography className={classes.title}>{goal.title}</Typography>
                {goal.weightage !== null && (
                  <Typography className={classes.weightage}>
                    {goal.weightage}%
                  </Typography>
                )}
                <span className={classes.sign}>
                  {openRows[index] ? "-" : "+"}
                </span>
              </Box>
            </Button>
            <Collapse in={openRows[index]}>
              <Box className={classes.collapseContent}>
                {goal.title !== "Overview" && (
                  <Box className={classes.targetArea}>
                    <Radar className={classes.bullseyeIcon} />
                    <Typography>{goal.target}</Typography>
                  </Box>
                )}
                <TextField
                  select
                  label="Rating"
                  value={responses[index].selfRating}
                  onChange={(e) =>
                    handleRatingChange(index, e.target.value)
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
                  label="Self Review"
                  multiline
                  rows={4}
                  value={responses[index].selfReviewText}
                  onChange={(e) =>
                    handleTextChange(index, e.target.value)
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
    </Box>
  );
};

export default SelfReview;