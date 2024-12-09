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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const UpdateGoalDialog = ({ open, handleClose, goal }) => {
  const classes = useStyles();

  const [data, setData] = useState({
    title: "",
    weightage: 0
  })

  useEffect(() => {
    setData({
        title: goal.title,
        weightage: goal.weightage
    })
  },[goal])

  const handleChange = (key, value) => {
    setData((prevState) => ({
        ...prevState,
        [key]: value
    }))
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen={false}
      classes={{ paper: classes.dialogPaper }}
      TransitionComponent={Transition}
      maxWidth="md"
      fullWidth={true}
    >
      <Box className={classes.dialogHeader}>
        <Typography color="black" fontWeight={700} variant="h6">Update Yearly Goal / Key Result Area</Typography>
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
        //   label="Enter Goal / Key Result Area Title *"
          variant="outlined"
          className={classes.inputField}
          value={data?.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />

      <Typography fontSize={13} className={classes.fieldLabel} style={{margin: "20px 0px 6px 0px"}}>
          Goal / Key Result Area Description *
        </Typography>
        <TextField
          fullWidth
        //   label="Goals / Key Result Areas Description"
          multiline
          rows={4}
          variant="outlined"
          className={classes.inputField}
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
          />
          </div>
        </Box>

        <Typography fontSize={13} className={classes.fieldLabel} style={{margin: "25px 0px 6px 0px"}}>
          Weightage *
        </Typography>
        <TextField
          fullWidth
        //   label="Weightage % *"
          variant="outlined"
          className={classes.inputField}
          value={data?.weightage}
        />
        <Typography fontSize={10} className={classes.hintText}>
          Remaining Weightage - 0.00 (Min: 0, Max: 50)
        </Typography>

        <Typography fontSize={13} className={classes.fieldLabel} style={{margin: "25px 0px 6px 0px"}}>
          Metric and Target *
        </Typography>
        <TextField
          fullWidth
        //   label="Metric and Target *"
          variant="outlined"
          className={classes.inputField}
        />

      </Box>
      <Divider />
      <Box className={classes.dialogFooter}>
        <Button
          variant="contained"
          onClick={handleClose}
          className={classes.saveButton}
        >
          Save
        </Button>
      </Box>
    </Dialog>
  );
};

export default UpdateGoalDialog;
