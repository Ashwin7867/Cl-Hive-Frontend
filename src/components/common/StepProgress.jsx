import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'flex-start', // Align items at the top initially
  },
  stepContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  circle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    color: 'white',
    fontSize: '12px',
    marginBottom: '5px',
  },
  label: {
    fontSize: '12px',
    maxWidth: '70px',
  },
  line: {
    flexGrow: 1,
    height: '2px',
    backgroundColor: 'grey',
    margin: '0 10px',
    alignSelf: 'center',
  },
});

const StepProgress = ({ steps }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {Object.entries(steps).map(([step, completed], index, arr) => (
        <React.Fragment key={step}>
          <div className={classes.stepContainer}>
            {/* Circle */}
            <div
              className={classes.circle}
              style={{ backgroundColor: completed ? 'green' : 'grey' }}
            >
              {index + 1}
            </div>
            {/* Label */}
            <div className={classes.label}>{step}</div>
          </div>
          {/* Line */}
          {index < arr.length - 1 && <div className={classes.line} />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepProgress;
