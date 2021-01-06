import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import InputSlider from './InputSlider';

const useStyles = makeStyles((state) => ({
    paper: {
        padding: state.spacing(2),
        textAlign: "center",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto",
        display: 'flex',
        // maxWidth: "282px"
    }
}));

export default function SliderCard(props) {
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <Grid container
                direction="column"
            >

                <Typography variant="subtitle">
                    You should allocate about
                </Typography>

                <Typography variant="h4">
                    ${String(props.amount).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/mo
                </Typography>

                <Typography variant="subtitle">
                    on
                </Typography>

                <Typography variant="h4">
                    {props.lineItem} {props.lineItemEmoji}
                </Typography>

                <Typography variant="subtitle">
                    which is
                </Typography>

                <InputSlider numericalPercentage={props.numericalPercentage} onChange={props.onChange}/>

                <Typography variant="subtitle">
                    of your post tax income
                </Typography>

            </Grid>
        </Paper>
    );
};

