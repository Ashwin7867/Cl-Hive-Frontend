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
    backgroundColor: "#e6e6e6",
    boxShadow: "none",
    margin: "8px",
    flex: 1,
    minWidth: "300px", // Ensures responsive behavior for smaller screens
  },
  container: {
    display: "flex",
    flexWrap: "wrap", // Allows sections to wrap to the next line if needed
    gap: "16px",
    justifyContent: "flex-start",
    marginTop: "16px",
  },
  title: {
    marginBottom: "16px",
    fontWeight: "bold",
    color: "#424242",
  },
  outerContainer:{
    padding: '16px',
    background: '#f3f3f3',
    borderRadius: '8px'
  }
});

const InfoDetails = ({ title, details }) => {
  const classes = useStyles();

  // Helper function to group fields into pairs of 2
  const groupEntries = (entries) => {
    const grouped = [];
    for (let i = 0; i < entries.length; i += 2) {
      grouped.push(entries.slice(i, i + 2));
    }
    return grouped;
  };

  return (
    <Box className={classes.outerContainer}>
      {/* Title for the container */}
      <Typography variant="h5" className={classes.title}>
        {title}
      </Typography>

      {/* Sections container */}
      <Box className={classes.container}>
        {details.map((detail, idx) => {
          const overviewEntries = Object.entries(detail);
          const groupedEntries = groupEntries(overviewEntries);

          return (
            <Box className={classes.section} key={idx}>
              {/* Render grouped fields */}
              {groupedEntries.map((group, index) => (
                <Grid container spacing={2} key={index} style={{ marginBottom: "8px" }}>
                  {group.map(([k, v]) => (
                    <Grid item xs={6} key={k}>
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
        })}
      </Box>
    </Box>
  );
};

export default InfoDetails;
