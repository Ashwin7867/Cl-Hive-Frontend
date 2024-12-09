import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    height: "100%", // Full height of the viewport
    // Width of the dialog (adjust as needed)
    margin: 0, // No margin around the dialog
    position: "absolute", // Allow alignment
    right: 0, // Align to the right of the screen
    borderRadius: "8px 0 0 8px", // Rounded left-side corners
    // border: "1px solid red"
  },
  dialogHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px",
  },
  dialogBody: {
    padding: "16px",
    overflowY: "auto", // Allow scrolling if content overflows
    height: "calc(100% - 112px)", // Adjust height considering header and footer
  },
  sectionTitle: {
    fontWeight: 600,
    marginBottom: "16px",
  },
  fieldLabel: {
    fontWeight:500,
  },

  inputField: {
    marginBottom: "16px",
  },
  dateRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    marginBottom: "16px",
  },
  dateInput: {
    flex: 1,
  },
  hintText: {
    fontSize: "8px",
    color: "#888",
    marginBottom: "16px",
  },
  dialogFooter: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "16px",
  },
  saveButton: {
    backgroundColor: "#9c27b0", // Purple color as in the save button
    color: "#fff",
    "&:hover": {
      backgroundColor: "#7b1fa2",
    },
  },
}));

export default useStyles;
