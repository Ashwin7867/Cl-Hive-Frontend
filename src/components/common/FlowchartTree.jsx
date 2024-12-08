import React from "react";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

// Create custom styles
const useStyles = makeStyles({
  treeContainer: {
    padding: "16px",
    maxWidth: "100%"
  },
  nodeContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    marginBottom: "16px",
  },
  node: {
    padding: "10px",
    borderRadius: "8px",
    background: 'linear-gradient(120deg, #ffdffe, #ddaefc)',
    textAlign: "center",
    minWidth: "120px",
  },
  horizontalLeaf: {
    display: "flex",
    justifyContent: "center",
    gap: "20px", // Added gap here between sibling nodes
    marginTop: "8px",
  },
  name: {
    fontWeight: "bold",
  },
  role: {
    fontSize: "14px",
    color: "#555",
  },
  department: {
    fontSize: "12px",
    color: "#777",
  },
});

// Dynamic Recursive TreeNode Component
const TreeNode = ({ details, children }) => {
  const classes = useStyles();
  return (
    <Box className={classes.nodeContainer}>
      {/* Render the current node */}
      <Box className={classes.node}>
        <Typography className={classes.name}>{details?.name}</Typography>
        <Typography className={classes.role}>{details?.role}</Typography>
        <Typography className={classes.department}>{details?.department}</Typography>
      </Box>
      {/* Render children recursively with spacing */}
      {children && children.length > 0 && (
        <Box className={classes.horizontalLeaf}>
          {children.map((child, index) => (
            <TreeNode
              key={index}
              details={child?.details}
              children={child?.children}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

// Helper function to dynamically parse the `flowchartobj`
const parseFlowchartLevels = (obj, currentLevel = 0) => {
  const nextLevelKey = `level${currentLevel}`;
  if (!obj[nextLevelKey]) return [];
  const children = Array.isArray(obj[nextLevelKey])
    ? obj[nextLevelKey].map((item) => ({
        details: { name: item.name, role: item.role, department: item.department },
        children: [],
      }))
    : [
        {
          details: { name: obj[nextLevelKey]?.name, role: obj[nextLevelKey]?.role, department: obj[nextLevelKey]?.department },
          children: parseFlowchartLevels(obj, currentLevel + 1),
        },
      ];
  return children;
};

const createDynamicTree = (flowchartobj) => {
  let hierarchicalStructure = [];

  if (flowchartobj[`level0`]) {
    hierarchicalStructure.push({
      details: { name: flowchartobj.level0?.name, role: flowchartobj.level0?.role, department: flowchartobj.level0?.department },
      children: parseFlowchartLevels(flowchartobj, 1),
    });
  }

  return hierarchicalStructure;
};

const FlowchartTree = ({ flowchartobj }) => {
  const hierarchicalTree = createDynamicTree(flowchartobj);

  return (
    <Box className={useStyles().treeContainer}>
      {hierarchicalTree.map((node, index) => (
        <TreeNode
          key={index}
          details={node?.details}
          children={node?.children}
        />
      ))}
    </Box>
  );
};

export default FlowchartTree;
