import React, { useState } from "react";
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
import FlagIcon from '@mui/icons-material/Flag';
import AddYearlyGoalModal from "./AddYearlyGoalModal";
import UpdateGoalDialog from "./UpdateYearlyGoalModal";

const YearlyGoalPlan = () => {
  const classes = useStyles();

  const [addGoalModal, setAddGoalModal] = useState(false);
  const [showUpdateGoal, setShowUpdateGoal] = useState({
    show: false,
    activeYearlyGoal: {}
  })

  const goals = [
    { title: "Business Bullseye", weightage: 40 },
    { title: "Functional Excellence", weightage: 25 },
    { title: "Change The Game", weightage: 15 },
    { title: "All About people/Individual Excellence", weightage: 20 },
  ];

  const handleUpdateGoalClick = (goal) => {
    setShowUpdateGoal((prevState) => ({
      ...prevState,
      show: true,
      activeYearlyGoal: goal
    }))
  }

  const handleCloseUpdateGoal = () => {
    setShowUpdateGoal((prevState) => ({
      ...prevState,
      show: false,
      activeYearlyGoal: {}
    }))
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
                4
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

        {goals.map((goal, index) => (
          <Card key={index} className={classes.goalCard}>
            <CardContent style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
              <Box className={classes.goalCardContent}>
                <Typography className={classes.goalTitle}>{goal.title}</Typography>
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
              </Box>
            </CardContent>
          </Card>
        ))}

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
          handleClose = {() => setAddGoalModal(false)} />
      
      <UpdateGoalDialog open={showUpdateGoal.show}
              goal = {showUpdateGoal.activeYearlyGoal}
              handleClose={() => handleCloseUpdateGoal()} />
                
    </>
  );
};

export default YearlyGoalPlan;
