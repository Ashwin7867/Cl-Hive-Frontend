import React, { useState } from "react";
import { Box, Typography, Collapse, Button, Tabs, Tab } from "@mui/material";
import { makeStyles } from "@mui/styles";

import StepProgress from "../common/StepProgress";

const useStyles = makeStyles({
  upperBox: {
    height: "100px",
    backgroundColor: "#f3f3f3",
    padding: "16px",
    borderRadius: '8px',
  },
  lowerBox: {
    backgroundColor: "#f3f3f3",
    padding: "16px",
    marginTop: "16px",
    borderRadius: '8px',
  },
  row: {
    marginBottom: "8px",
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
  tabs: {
    borderBottom: "1px solid #ccc",
    marginBottom: "8px",
  },
  tab: {
    textTransform: "none",
    fontWeight: "500",
  },
  selectedTab: {
    color: "#6972a3 !important",
    fontWeight: "bold",
  },
  tabPanel: {
    padding: "8px 0",
  },
  text: {
    marginBottom: "8px",
  },
});

// Rating mapping
const ratingMap = {
  1: "Need Improvement",
  2: "Below Expectations",
  3: "Met All Expectations",
  4: "Exceeded Some Expectations",
  5: "Highly Exceeded Some Expectations",
};

const goals = [
  {
    title: "Business Bullseye",
    weightage: 40,
    selfRating: 4,
    managerRating: 4,
    selfReviewText: "This is the self-review placeholder text. Provide insights about personal achievements and learning outcomes.",
    managerReviewText: "This is the manager review placeholder text. Provide insights about expectations and feedback.",
  },
  {
    title: "Functional Excellence",
    weightage: 30,
    selfRating: 3,
    managerRating: 3,
    selfReviewText: "This is the self-review placeholder text. Provide insights about personal achievements and learning outcomes.",
    managerReviewText: "This is the manager review placeholder text. Provide insights about expectations and feedback.",
  },
  {
    title: "Change The Game",
    weightage: 15,
    selfRating: 4,
    managerRating: 4,
    selfReviewText: "This is the self-review placeholder text. Provide insights about personal achievements and learning outcomes.",
    managerReviewText: "This is the manager review placeholder text. Provide insights about expectations and feedback.",
  },
  {
    title: "All About People/Individual Excellence",
    weightage: 15,
    selfRating: 4,
    managerRating: 4,
    selfReviewText: "This is the self-review placeholder text. Provide insights about personal achievements and learning outcomes.",
    managerReviewText: "This is the manager review placeholder text. Provide insights about expectations and feedback.",
  },
  {
    title: "Overview",
    weightage: null,
    selfRating: 4,
    managerRating: 4,
    selfReviewText: "This is the self-review placeholder text. Provide insights about personal achievements and learning outcomes.",
    managerReviewText: "This is the manager review placeholder text. Provide insights about expectations and feedback.",
  },
];

const steps = {
  "Self Review": true,
  "Manager Review": true,
  Collaboration: false,
  Acknowledge: false,
};

const Appraisal = () => {
  const classes = useStyles();
  
  // Set the first row open by default
  const [openRows, setOpenRows] = useState({ 0: true });
  const [selectedTab, setSelectedTab] = useState({});

  const toggleRow = (index) => {
    setOpenRows((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleTabChange = (index, tab) => {
    setSelectedTab((prev) => ({ ...prev, [index]: tab }));
  };

  return (
    <Box>
      {/* Upper Box with StepProgress */}
      <Box className={classes.upperBox}>
        <StepProgress steps={steps} />
      </Box>

      {/* Lower Box with Collapsible Rows */}
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
                <Tabs
                  value={selectedTab[index] || "self"}
                  onChange={(e, value) => handleTabChange(index, value)}
                  className={classes.tabs}
                  TabIndicatorProps={{ style: { backgroundColor: "#6972a3" } }}
                >
                  <Tab
                    label="Self Review"
                    value="self"
                    className={`${classes.tab} ${
                      selectedTab[index] === "self" ? classes.selectedTab : ""
                    }`}
                  />
                  <Tab
                    label="Manager Review"
                    value="manager"
                    className={`${classes.tab} ${
                      selectedTab[index] === "manager"
                        ? classes.selectedTab
                        : ""
                    }`}
                  />
                </Tabs>
                <Box className={classes.tabPanel}>
                  {selectedTab[index] === "manager" ? (
                    <>
                      <Typography variant="body2" className={classes.text}>
                        <strong>Manager Rating:</strong>{" "}
                        {ratingMap[goal.managerRating]}
                      </Typography>
                      <Typography variant="body2" className={classes.text}>
                        <strong>Review:</strong> {goal.managerReviewText}
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Typography variant="body2" className={classes.text}>
                        <strong>Self Rating:</strong>{" "}
                        {ratingMap[goal.selfRating]}
                      </Typography>
                      <Typography variant="body2" className={classes.text}>
                        <strong>Review:</strong> {goal.selfReviewText}
                      </Typography>
                    </>
                  )}
                </Box>
              </Box>
            </Collapse>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Appraisal;
