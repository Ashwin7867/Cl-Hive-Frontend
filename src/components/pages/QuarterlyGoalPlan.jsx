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
  Switch
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import api from "../../utils/apiService";

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

// const goalDescription = ["This is the predefined goal 1", "This is the predefined goal 2", "This is the predefined goal 3", "This is the predefined goal 4" ]

const testYearlyGoals = [
  {
    _id: "id1",
    name: "Business Bullseye",
    isOpen: true,
    description: "1.Feature Development\n2.Maintaining Timelines (Estimation / Planning)\n3.Quality of Deliverables (Critical/Regression/Post Live).",
    isEditable: true,
    quarterGoalData: {
      _id: "",
      pre_goals: "",
      quarter: ""
    }
  },
  {
    _id: "id2",
    name: "Functional Excellence",
    isOpen: true,
    description: "1.Feature Development\n2.Maintaining Timelines (Estimation / Planning)\n3.Quality of Deliverables (Critical/Regression/Post Live).",
    quarterlyGoalText: "",
    isEditable: false,
    quarterGoalData: {}
  },
  {
    _id: "id3",
    name: "Change The Game",
    isOpen: true,
    description: "1.Feature Development\n2.Maintaining Timelines (Estimation / Planning)\n3.Quality of Deliverables (Critical/Regression/Post Live).",
    quarterlyGoalText: "",
    isEditable: false,
    quarterGoalData: {}
  },
  {
    _id: "id4",
    name: "All About People/Individual Excellence",
    isOpen: true,
    description: "1.Feature Development\n2.Maintaining Timelines (Estimation / Planning)\n3.Quality of Deliverables (Critical/Regression/Post Live).",
    quarterlyGoalText: "",
    isEditable: false,
    quarterGoalData: {}
  },
  {
    _id: "id5",
    name: "All About People/Individual Excellence",
    isOpen: true,
    description: "1.Feature Development\n2.Maintaining Timelines (Estimation / Planning)\n3.Quality of Deliverables (Critical/Regression/Post Live).",
    quarterlyGoalText: "",
    isEditable: false,
    quarterGoalData: {}
  }
];

const years = [
  { id: "1", title: "F.Y 2021-2022" },
  { id: "2", title: "F.Y 2022-2023" },
  { id: "3", title: "F.Y 2023-2024" },
  { id: "4", title: "F.Y 2024-2025" },
];

const quarters = [
  { id: "1", title: "Q1" },
  { id: "2", title: "Q2" },
  { id: "3", title: "Q3" },
  { id: "4", title: "Q4" },
]

const QuarterlyGoalPlan = () => {
  const classes = useStyles();
  const empData = JSON.parse(localStorage.getItem("userData"));

  const [yearlyGoals, setYearlyGoals] = useState([]);
  const [fyYearData, setFyYearData] = useState({
    years: years,
    selectedYear: "F.Y 2024-2025"
  });
  const [quarterData, setQuarterData] = useState({
    quarters: quarters,
    selectedQuarter: "Q3"
  });

  useEffect(() => {
    fetchGoalDataByEmployeeId()
  }, [])

  const fetchGoalDataByEmployeeId = async () => {
    try {
      const res = await api.post(`/api/goals/quarter/fetch/pre/${empData._id}/2024`);
      const overAllGoalData = res.data?.yearlyGoals.map((item) => ({
        ...item,
        isOpen: true,
        isEditable: item.quarterlyGoals.filter((qtr) => qtr.quarter === quarterData.selectedQuarter).length===0 ? true: false,
        quarterlyGoals: item.quarterlyGoals.length===0 ? [{
          pre_goals: "",
          quarter: quarterData.selectedQuarter,
        }] : item.quarterlyGoals.map((qtr) => ({
          _id: qtr._id,
          pre_goals: qtr.pre_goals,
          quarter: qtr.quarter,
          goals_id: qtr.goals_id
        }))
      }));
      setYearlyGoals(overAllGoalData);
    }catch(err){
      console.log("Error: ", err.message);
      alert(`Invalid Credentails: ${err.message}`)
    }
  }

  const toggleRow = (id) => {
    console.log("In toggle", id)
    setYearlyGoals((prevState) => (prevState.map((item) => item._id === id ? { ...item, isOpen: !item.isOpen } : item)))
  }

  const handleQuarterlyReviewTextChange = (goal_id, value) => {
    console.log("In querter review text", value, goal_id);
    setYearlyGoals((prev) => prev.map((item) => item._id === goal_id ? {
      ...item,
      quarterlyGoals: item.quarterlyGoals.map((qtr) => qtr.quarter === quarterData.selectedQuarter ? {...qtr, pre_goals: value}: qtr),
    }: item))
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

  const handleEditToggleChange = (data, val) => {
    console.log("handleEditToggleChange", data)
    setYearlyGoals((prevState) => (prevState.map((item) => item._id === data._id ? { ...item, isEditable: val } : item)))
  }

  const handleSaveQuarterGoal = async (item) => {
    console.log("In handle dave", item)
    try{
      const quarterGoalObject = item.quarterlyGoals.find((qtr) => qtr.quarter === quarterData.selectedQuarter)
      const reqData = {
        emp_id: empData._id,
        pre_goals: quarterGoalObject?.pre_goals ?? "",
        startDate: item.startDate,
        endDate: item.endDate,
        quarter: quarterData.selectedQuarter,
        goals_id: item._id
      }

      if(quarterGoalObject?._id){
        const res = await api.post(`/api/goals/quarter/update/${quarterGoalObject._id}`, reqData);
        if(res.status===200){
          console.log("response of the put quarter goal", res.data);
          setYearlyGoals((prevState) => prevState.map((i) => i._id === item._id ? {...i, isEditable:false}: i));
        }
      }else{
        const res = await api.post("/api/goals/quarter/create", reqData);
        const resQuarterData = res.data.goal
        if(res.status === 200){
          console.log("response of the post quarter goal", res.data);
          setYearlyGoals((prevState) => prevState.map((i) => i._id === item._id ? {
              ...i,
              quarterlyGoals: [...i.quarterlyGoals, {_id: resQuarterData._id, pre_goals: resQuarterData.pre_goals, quarter: resQuarterData.quarter}],
              isEditable:false
              }: i));
        }
      }

    }catch(err){
      console.log("Error: ", err.message);
      alert(`Invalid Credentails: ${err.message}`)
    }
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
        <FormControl className={classes.dropdown} style={{ marginLeft: 20 }}>
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
                <Typography fontSize={14} fontWeight={600} style={{ width: 500 }}>{item.name}</Typography>
                <Typography fontSize={14} fontWeight={600} style={{ paddingRight: 400 }}>{`Weightage: ${item.weightage}`}</Typography>
                <span>{item.isOpen ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />}</span>
              </Box>
            </Button>
            <Collapse in={item.isOpen}>
              <Box className={classes.collapseContent}>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start" }}>
                  <div style={{ display: "flex", flexDirection: "column", width: 600 }}>
                    <Typography fontSize={12} fontWeight={600} style={{ width: 500 }}>{"Goals Description / Key Performance indicator"}</Typography>
                    <TextField
                      id="outlined-multiline-static"
                      multiline
                      rows={4}
                      value={item.description}
                      InputProps={{
                        readOnly: true,
                        style: { fontSize: "12px", padding: "10px 0px 0px 10px" }
                      }}
                      sx={{
                        "& .MuiInputBase-root": {
                          backgroundColor: "#f3f3f3", // Change background color
                        },
                      }}
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", margin: "10px 0px 0px 80px" }}>
                    <Typography fontSize={14} fontWeight={600} style={{ width: 500 }}>{"Allow Editing of Quarterly Goals: "}</Typography>
                    <Switch
                      checked={item.isEditable}
                      onChange={(e) => handleEditToggleChange(item, e.target.checked)}
                      inputProps={{ 'aria-label': 'controlled' }}
                      color="secondary"
                    />
                  </div>

                  <div>
                    <Button variant="contained" color="secondary" disabled={!item.isEditable}
                    onClick={() => handleSaveQuarterGoal(item)}>Save Quarter Goal</Button>
                  </div>
                </div>
                {/* {item.goalDescription.map((text) => <Box className={classes.targetArea}>
                  <Radar />
                  <Typography>{text}</Typography>
                </Box>) } */}

                <Typography fontSize={14} fontWeight={600} style={{ width: 500, marginTop: 50 }}>{`Enter the Quarterly Goals for ${item.name}:`}</Typography>
                <TextField
                  multiline
                  rows={6}
                  value={item.quarterlyGoals?.find((qtr) => qtr.quarter === quarterData.selectedQuarter)?.pre_goals }
                  onChange={(e) =>
                    handleQuarterlyReviewTextChange(item._id, e.target.value)
                  }
                  fullWidth
                  className={classes.textField}
                  InputProps={{
                    readOnly: item.isEditable ? false : true,
                    style: { fontSize: "13px", padding: "10px 0px 0px 10px" }
                  }}
                  sx={item.isEditable ? {} : {
                    "& .MuiInputBase-root": {
                      backgroundColor: "#f3f3f3", // Change background color
                    },
                  }}
                />
              </Box>
            </Collapse>
          </Box>
        ))}

      </Box>
    </>
  );
};

export default QuarterlyGoalPlan;
