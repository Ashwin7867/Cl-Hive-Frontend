import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

// Styles
const useStyles = makeStyles({
  keyLabel: {
    color: "#B0BEC5", // Light grey
    fontSize: "14px",
    wordBreak: "break-word",
  },
  valueLabel: {
    color: "#424242", // Dark grey
    fontSize: "16px",
    fontWeight: 500,
    wordBreak: "break-word",
  },
  section: {
    padding: "16px",
    borderRadius: "8px",
    backgroundColor: "#f3f3f3",
    boxShadow: "none",
    height: "auto",
    overflow: "hidden",
  },
});

const InfoDetails = ({ title, details }) => {
  const classes = useStyles();
  const overviewEntries = Object.entries(details);

  // Group the entries into chunks of 4
  const groupEntries = (entries, groupSize) => {
    const grouped = [];
    for (let i = 0; i < entries.length; i += groupSize) {
      grouped.push(entries.slice(i, i + groupSize));
    }
    return grouped;
  };

  const groupedEntries = groupEntries(overviewEntries, 4);

  return (
    <Box className={classes.section}>
      {/* Display the title */}
      <Typography variant="h5" style={{ marginBottom: "8px" }}>
        {title}
      </Typography>

      {/* Render grouped entries */}
      {groupedEntries.map((group, index) => (
        <Grid container spacing={2} key={index} style={{ marginBottom: "8px" }}>
          {group.map(([k, v]) => (
            <Grid item xs={3} key={k}>
              {/* Updated regex logic to handle spaces properly */}
              <Typography className={classes.keyLabel}>
                {k.replace(/([a-z])([A-Z])/g, "$1 $2")}
              </Typography>
              <Typography className={classes.valueLabel}>{v}</Typography>
            </Grid>
          ))}
        </Grid>
      ))}
    </Box>
  );
};

export default InfoDetails;

