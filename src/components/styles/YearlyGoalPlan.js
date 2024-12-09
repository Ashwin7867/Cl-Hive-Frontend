import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    goalHeaderContainer: {
        width: "100%",
        padding: "16px",
        backgroundColor: "#FFFFFF",
      },
      headerSection: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "16px",
      },
      headerText: {
        fontWeight: 600,
        color: "#000000",
        // textDecoration: "underline"
      },
      headerControls: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
      },
      selectDropdown: {
        minWidth: "250px",
        height: "40px",
        backgroundColor: "#F8F9FA",
        borderRadius: "4px",
      },
      uploadIcon: {
        color: "#000000",
      },
      summaryBox: {
        backgroundColor: "#F5F5F5",
        borderRadius: "8px",
        padding: "16px",
      },
      summaryContent: {
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        gap: "10px",
      },
      totalGoals: {
        fontWeight: 700,
        fontSize: "24px",
        color: "#3F51B5",
      },
      summaryText: {
        color: "#000000",
        fontSize: "16px",
      },
  goalPlanContainer: {
    padding: "2%",
    width: "100%",
    height: "100%",
    backgroundColor: "#f8f9fa",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  selectPlanButton: {
    backgroundColor: "#6200EE",
    color: "#FFFFFF",
    "&:hover": {
      backgroundColor: "#4b00b0",
    },
  },
  goalCard: {
    margin: "10px 0",
    padding: "10px",
    backgroundColor: "#FFFFFF",
    borderRadius: "8px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  goalCardContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "350px",
    // border: "1px solid red"
  },
  goalTitle: {
    fontWeight: 500,
    fontSize: "16px",
  },
  goalWeightage: {
    fontWeight: 700,
    fontSize: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingRight: 250
  },
  goalActions: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "flex-end",
  },
  divider: {
    margin: "20px 0",
  },
  addGoalContainer: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
  },
  addGoalButton: {
    fontWeight: 500,
  },
}));

export default useStyles;
