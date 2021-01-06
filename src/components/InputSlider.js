import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';


const useStyles = makeStyles({
  root: {
    width: 250,
  },
  input: {
    fontSize: 40,
    paddingBottom: "0px"
  },
  zeroPadding: {
    padding: "0px"
  }
});


export default function InputSlider(props) {
  const classes = useStyles();

  const [isFocused, setFocused] = React.useState(true);

  const handleSliderChange = (event, newValue) => {
    props.onChange(newValue);
  };

  return (

    <div className={classes.root}>

      <Grid container spacing={0} alignItems="center">
        <Grid item xs={2} />
        <Grid item xs={8}>

            <Typography variant="h4">
              {props.numericalPercentage}%
            </Typography>

          <Grid item xs={2} />

          <Grid item xs={12}>
            <Slider
              value={props.numericalPercentage}
              onChange={handleSliderChange}
              aria-labelledby="input-slider"
            />
  
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}