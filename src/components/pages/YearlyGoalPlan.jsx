import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  Tooltip,
  Divider,
  Select,
  MenuItem
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import useStyles from "../styles/YearlyGoalPlan";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import FlagIcon from '@mui/icons-material/Flag';
import api from "../../utils/apiService";
import AddYearlyGoalModal from "./AddYearlyGoalModal";
import UpdateGoalDialog from "./UpdateYearlyGoalModal";

const YearlyGoalPlan = () => {
  const classes = useStyles();
  const empData = JSON.parse(localStorage.getItem("userData"));

  const [goals, setGoals] = useState([])
  const [addGoalModal, setAddGoalModal] = useState(false);
  const [showUpdateGoal, setShowUpdateGoal] = useState({
    show: false,
    activeYearlyGoal: {}
  })

  useEffect(() => {
    fetchGoalsByEmployeeAndYear();
  },[])

  const fetchGoalsByEmployeeAndYear = async () => {
    try {
      const res = await api.post(`/api/goals/fetch/${empData._id}/2024`);
      setGoals(() => res.data?.goals.map((item) => ({
        ...item,
        startDate: item.startDate ? new Date(item.startDate).toISOString().split("T")[0]: "",
        endDate: item.endDate ? new Date(item.endDate).toISOString().split("T")[0]: "",
      })));
    }catch(err){
      console.log("Error: ", err.message);
      alert(`Invalid Credentails: ${err.message}`)
    }
  }

  const handleUpdateGoalClick = (goal) => {
    setShowUpdateGoal((prevState) => ({
      ...prevState,
      show: true,
      activeYearlyGoal: goal
    }))
  }

  const handleUpdateGoal = (goal) => {
    console.log("handleUpdateGoal", goal);
    setGoals((prevState) => (prevState.map((item) => item._id === goal._id ? goal : item)));
    setShowUpdateGoal((prevState) => ({
      ...prevState,
      show: false,
      activeYearlyGoal: {}
    }))
  }

  const handleDeleteGoalClick = async (goal) => {
    try {
      console.log("handleDeleteGoalClick", goal);
      const res = await api.delete(`/api/goals/delete/${goal._id}`);
      if(res.status === 200 ){
        setGoals((prevState) => (prevState.filter((item) => item._id !== goal._id)))
      }
    }catch(err){
      console.log("Error: ", err.message);
      alert(`Invalid Credentails: ${err.message}`)
    }

  }

  const handleAddGoal = (goal) => {
    console.log("handleAddGoal", goal)
    if(goal && goal._id){
      setGoals((prevState) => ([...prevState, goal]));
    }
    setAddGoalModal(false);
  }

  return (
    <>
      <Box className={classes.goalHeaderContainer}>
        {/* Header Section */}
        <Box className={classes.headerSection}>
          <Typography variant="h6" className={classes.headerText}
            sx={{
              display: "inline-block",
              position: "relative",
              paddingBottom: "4px", // Adjust space between text and underline
              borderBottom: "2px solid black",
              top: 15
            }}>
            My Yearly Goal Plan
          </Typography>
          <Box className={classes.headerControls}>
            <Select
              defaultValue="Goal Setting FY24-25 V2"
              className={classes.selectDropdown}
            >
              <MenuItem value="Goal Setting FY24-25 V2">
                Goal Setting FY24-25 V2
              </MenuItem>
            </Select>
            <IconButton className={classes.uploadIcon}>
              <CloudUploadIcon />
            </IconButton>
          </Box>
        </Box>

        <Divider sx={{ marginTop: 0, marginBottom: 5 }}/>
        {/* Summary Section */}
        <Box className={classes.summaryBox}>
          <Box className={classes.summaryContent}>
            <div style={{display: "flex", alignItems:"center"}}>
              <FlagIcon sx={{color: "blue"}} />
              <Typography variant="h6" className={classes.totalGoals}>
                {goals.length}
              </Typography>
            </div>
            <Typography variant="body1" className={classes.summaryText}>
              Total Yearly Goals / Key Result Areas
            </Typography>
            <Typography variant="caption">
            Count of Goal / Key Result Area: Min 4 - Max 5
          </Typography>
          </Box>
        </Box>
      </Box>
      <Box className={classes.goalPlanContainer}>

        {goals.length>0 && goals.map((goal, index) => (
          <Card key={index} className={classes.goalCard}>
            <CardContent style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
              <Box className={classes.goalCardContent}>
                <Typography className={classes.goalTitle}>{goal.name}</Typography>
              </Box>
              <Box>
                <Typography className={classes.goalWeightage}>
                  <Typography className={classes.goalTitle}>Weightage</Typography>
                  {goal.weightage} %
                </Typography>
              </Box>
              <Box className={classes.goalActions}>
                <Tooltip title="Edit" onClick={() => handleUpdateGoalClick(goal)}>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete" onClick={() => handleDeleteGoalClick(goal)}>
                  <IconButton>
                    <DeleteRoundedIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </CardContent>
          </Card>
        ))}

        {goals.length ===0 && (
            <Card key={0} className={classes.goalCard}>
            <CardContent style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
              <Box className={classes.goalCardContent}>
                <Typography className={classes.goalTitle}>{"No Goals Added"}</Typography>
              </Box>
            </CardContent>
          </Card>
        )}

        <Divider className={classes.divider} />

        <Box className={classes.addGoalContainer}>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.addGoalButton}
          >
            Add Goal / Key Result Area from previous New Goal Plans
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            className={classes.addGoalButton}
            onClick={() => setAddGoalModal(true)}
          >
            Add Goal / Key Result Area
          </Button>
        </Box>
      </Box>

      <AddYearlyGoalModal open={addGoalModal} 
          handleClose = {(goal) => handleAddGoal(goal)} />
      
      <UpdateGoalDialog open={showUpdateGoal.show}
              goal = {showUpdateGoal.activeYearlyGoal}
              handleClose={(goal) => handleUpdateGoal(goal)} />
                
    </>
  );
};

export default YearlyGoalPlan;
