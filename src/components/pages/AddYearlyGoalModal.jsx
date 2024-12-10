import React, { useEffect, useState } from "react";
import {
  Box,
  Dialog,
  Slide,
  Typography,
  TextField,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useStyles from "../styles/AddYearlyGoalModal";
import api from "../../utils/apiService";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});


const AddGoalDialog = ({ open, handleClose }) => {

  const classes = useStyles();
  const empData = JSON.parse(localStorage.getItem("userData"));
  const [goalData, setGoalData] = useState({});


useEffect(() => {
  const defaultGoalData = {
    name: "",
    weightage: "",
    description: "",
    startDate: "2024-10-01",
    endDate: "2024-12-31",
    emp_id: "",
  }
  setGoalData(defaultGoalData)
},[])

  const handleTextChange = (key,val) => {
    console.log("In handleTextChange", key, val)
    setGoalData((prevState) => ({
      ...prevState,
      [key]: val
    }))
  }

  const handleSubmit = async () => {
    try{
      const reqData = {
        ...goalData,
        emp_id: empData._id
      }
      
      const res = await api.post("/api/goals/create", reqData);
      console.log("Goal creation", res.data?.goal);

      const resData = {
        ...res.data?.goal,
        startDate: res.data?.goal?.startDate ? new Date(res.data?.goal?.startDate).toISOString().split("T")[0]: "",
        endDate: res.data?.goal?.endDate ? new Date(res.data?.goal?.endDate).toISOString().split("T")[0]: "",
      }
      setGoalData((prevState) => ({}))
      handleClose(resData);

    }catch(err){
      console.log("Error: ", err.message);
      alert(`Invalid Credentails: ${err.message}`)
    }


  }

  return (
    <Dialog
      open={open}
      onClose={() => handleClose(null)}
      fullScreen={false}
      classes={{ paper: classes.dialogPaper }}
      TransitionComponent={Transition}
      maxWidth="md"
      fullWidth={true}
    >
      <Box className={classes.dialogHeader}>
        <Typography color="black" fontWeight={700} variant="h6">Add Yearly Goal / Key Result Area</Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <Box className={classes.dialogBody}>
        <Typography color="black" fontWeight={700} className={classes.sectionTitle}>
          Goal / Key Result Area Details
        </Typography>

        <Typography fontSize={13} className={classes.fieldLabel} style={{margin: "25px 0px 6px 0px"}}>
          Goal / Key Result Area Title *
        </Typography>
        <TextField
          fullWidth
          label="Enter Goal / Key Result Area Title *"
          variant="outlined"
          className={classes.inputField}
          value={goalData.name}
          onChange={(e) => handleTextChange("name", e.target.value)}
        />

      <Typography fontSize={13} className={classes.fieldLabel} style={{margin: "20px 0px 6px 0px"}}>
          Goal / Key Result Area Description *
        </Typography>
        <TextField
          fullWidth
          label="Goals / Key Result Areas Description"
          multiline
          rows={4}
          variant="outlined"
          className={classes.inputField}
          value={goalData.description}
          onChange={(e) => handleTextChange("description", e.target.value)}
        />

        <Box className={classes.dateRow}>
          <div style={{display: "flex", flexDirection:"column", width: "45vh"}}>  
          <Typography fontSize={13} className={classes.fieldLabel} style={{margin: "25px 0px 10px 0px"}}>
          Start Date *
        </Typography>
          <TextField
            type="date"
            defaultValue="2024-04-01"
            InputLabelProps={{ shrink: true }}
            className={classes.dateInput}
            value={goalData.startDate}
            onChange={(e) => handleTextChange("startDate", e.target.value)}
          />
          </div>
          <div style={{display: "flex", flexDirection:"column", width: "45vh"}}>
          <Typography fontSize={13} className={classes.fieldLabel} style={{margin: "25px 0px 6px 0px"}}>
          End date *
        </Typography>
          <TextField
            type="date"
            defaultValue="2025-03-31"
            InputLabelProps={{ shrink: true }}
            className={classes.dateInput}
            value={goalData.endDate}
            onChange={(e) => handleTextChange("endDate", e.target.value)}
          />
          </div>
        </Box>

        <Typography fontSize={13} className={classes.fieldLabel} style={{margin: "25px 0px 6px 0px"}}>
          Weightage *
        </Typography>
        <TextField
          fullWidth
          // label="Weightage % *"
          variant="outlined"
          className={classes.inputField}
          value={goalData.weightage}
          onChange={(e) => handleTextChange("weightage", e.target.value)}
        />
        <Typography fontSize={10} className={classes.hintText}>
          Remaining Weightage - 0.00 (Min: 0, Max: 50)
        </Typography>

        <Typography fontSize={13} className={classes.fieldLabel} style={{margin: "25px 0px 6px 0px"}}>
          Metric and Target 
        </Typography>
        <TextField
          fullWidth
          label="Metric and Target *"
          variant="outlined"
          className={classes.inputField}
        />

      </Box>
      <Divider />
      <Box className={classes.dialogFooter}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          className={classes.saveButton}
        >
          Save
        </Button>
      </Box>
    </Dialog>
  );
};

export default AddGoalDialog;
