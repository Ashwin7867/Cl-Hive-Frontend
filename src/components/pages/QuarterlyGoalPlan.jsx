import React, { useEffect, useState } from "react";
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
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';

const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "space-between",
    padding: "16px",
  },
  lowerBox: {
    backgroundColor: "#F8F8F8",
    padding: "16px",
    marginTop: "16px",
    borderRadius: "8px",
  },
  dropdown: {
    width: "250px",
  },
  row: {
    marginBottom: "40px",
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
    // backgroundColor: "#e0f7fa",
    padding: "2px",
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

const goalDescription = ["This is the predefined goal 1", "This is the predefined goal 2", "This is the predefined goal 3", "This is the predefined goal 4" ]

const testYearlyGoals = [
    {
      _id: "id1",
      title: "Business Bullseye",
      target: "Predefined goals text is this",
      selfRating: 3,
      selfReviewText: "rgreg fnor pinrvpir pinrpnrwv",
      isOpen: true,
      goalDescription: goalDescription,
      quarterlyGoalText: "" 
    },
    {
      _id: "id2",
      title: "Functional Excellence",
      target: "Predefined goals text is this",
      selfRating: 4,
      selfReviewText: "rgreg fnor pinrvpir pinrpnrwv",
      isOpen: true,
      goalDescription: goalDescription,
      quarterlyGoalText: "" 
    },
    {
      _id: "id3",
      title: "Change The Game",
      target: "Predefined goals text is this",
      selfRating: 3,
      selfReviewText: "rgreg fnor pinrvpir pinrpnrwv",
      isOpen: true,
      goalDescription: goalDescription,
      quarterlyGoalText: "" 
    },
    {
      _id: "id4",
      title: "All About People/Individual Excellence",
      target: "Predefined goals text is this",
      selfRating: 4,
      selfReviewText: "rgreg fnor pinrvpir pinrpnrwv",
      isOpen: true,
      goalDescription: goalDescription,
      quarterlyGoalText: "" 
    },
    {
      _id: "id5",
      title: "Overview",
      selfRating: 4,
      selfReviewText: "rgreg fnor pinrvpir pinrpnrwv",
      isOpen: true,
      goalDescription: goalDescription,
      quarterlyGoalText: "" 
    }
];

const years = [
  { id: "1", title: "F.Y 2021-2022" },
  { id: "2", title: "F.Y 2022-2023" },
  { id: "3", title: "F.Y 2023-2024" },
  { id: "4", title: "F.Y 2024-2025" },
];

const quarters = [
  { id: "1", title: "Quarter 1" },
  { id: "2", title: "Quarter 2" },
  { id: "3", title: "Quarter 3" },
  { id: "4", title: "Quarter 4" },
]

const QuarterlyGoalPlan = () => {
  const classes = useStyles();

  const [yearlyGoals, setYearlyGoals] = useState([]);
  const [fyYearData, setFyYearData] = useState({
    years: years,
    selectedYear: ""
  });
  const [quarterData, setQuarterData] = useState({
    quarters: quarters,
    selectedQuarter: ""
  });

  useEffect(() => {
    setYearlyGoals(testYearlyGoals)
  }, [])

  const toggleRow = (id) => {
    console.log("In toggle", id)
    setYearlyGoals((prevState) => (prevState.map((item) => item._id === id ? {...item, isOpen: !item.isOpen} : item)))
  }

  const handleQuarterlyReviewTextChange = (id, value) => {
    console.log("In querter review text", value, id);
    setYearlyGoals((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quarterlyGoalText: value } : item
      )
    );
  };

  const handleYearChange = (e) => {
    const value = e.target.value;
    console.log("In year", value);

    setFyYearData((prevState) => ({
      ...prevState,
      selectedYear: value
    }))

  }

  const handleQuarterChange = (e) => {
    const value = e.target.value;
    console.log("In quarter", value);

    setQuarterData((prevState) => ({
      ...prevState,
      selectedQuarter: value
    }))
  }

  const handleSubmit = () => {
   
    // const submissionData = responses.map((response) => ({
    //   empId: selectedEmployee,
    //   empName: teamMates.find((mate) => mate.empId === selectedEmployee)?.empName,
    //   title: response.title,
    //   target: response.target,
    //   selfRating: response.selfRating,
    //   selfReviewText: response.selfReviewText,
    //   managerRating: response.managerRating,
    //   managerReviewText: response.managerReviewText,
    // }));

    // console.log("Submitted data:", submissionData);
  };

  return (
    <>
      <Box className={classes.yearQuarterContainer}>
        <FormControl className={classes.dropdown}>
          <InputLabel>Select Financial Year</InputLabel>
          <Select
            value={fyYearData.selectedYear}
            onChange={handleYearChange}
            label="Select Financial Year"
          >
            {fyYearData.years.map((item) => (
              <MenuItem key={item.id} value={item.title}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.dropdown} style={{marginLeft: 20}}>
          <InputLabel>Select Quarter</InputLabel>
          <Select
            value={quarterData.selectedQuarter}
            onChange={handleQuarterChange}
            label="Select Employee"
          >
            {quarterData.quarters.map((item) => (
              <MenuItem key={item.id} value={item.title}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box className={classes.lowerBox}>
        {yearlyGoals.map((item, index) => (
          <Box key={index} className={classes.row}>
            <Button
              variant="contained"
              onClick={() => toggleRow(item._id)}
              className={classes.button}
            >
              <Box className={classes.titleWrapper}>
                <Typography fontSize={14} fontWeight={600} style={{width: 500}}>{item.title}</Typography>
                <Typography fontSize={14} fontWeight={600} style={{paddingRight: 400}}>{`Weightage: 40`}</Typography>
                <span>{item.isOpen ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />}</span>
              </Box>
            </Button>
            <Collapse in={item.isOpen}>
              <Box className={classes.collapseContent}>
                {item.goalDescription.map((text) => <Box className={classes.targetArea}>
                  <Radar />
                  <Typography>{text}</Typography>
                </Box>) }

                <TextField
                  label="Enter Quarterly Goals"
                  multiline
                  rows={4}
                  value={item.quarterlyGoalText}
                  onChange={(e) =>
                    handleQuarterlyReviewTextChange(item._id, e.target.value)
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

export default QuarterlyGoalPlan;
