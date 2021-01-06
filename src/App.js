import React from 'react';
import { Button, Typography, Grid, Divider, Slider, CardContent, CssBaseline, Input } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import InputSlider from './components/InputSlider';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import SliderCard from './components/SliderCard';

import Taxee from 'taxee-tax-statistics';


const useStyles = makeStyles((state) => ({
  container: {
    direction: "row",
    justify: "center",
    alignItems: "center",
  },
  root: {
    flexGrow: 1
  },
  paper: {
    padding: state.spacing(2),
    textAlign: "center",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
    display: 'flex',
  },
  card: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  topBar: {
    marginTop: 20,
    marginRight: 50
  },
  input: {
    fontSize: 40,
  }
}));


const defaultMarginalRate = 9.3;
const defaultPostTaxIncome = 42629;
const defaultNumericalHousingPercentage = 30;
const defaultNumericalHousingAllocation = Math.trunc(Number((defaultNumericalHousingPercentage / 100) * defaultPostTaxIncome));
const defaultNumericalUtilitiesPercentage = 5;
const defaultNumericalUtilitiesAllocation = Math.trunc(Number((defaultNumericalUtilitiesPercentage / 100) * defaultPostTaxIncome));

const defaultNumericalFoodPercentage = 10;
const defaultNumericalFoodAllocation = Math.trunc(Number((defaultNumericalFoodPercentage / 100) * defaultPostTaxIncome));

const defaultNumericalSavingsPercentage = 5;
const defaultNumericalSavingsAllocation = Math.trunc(Number((defaultNumericalSavingsPercentage / 100) * defaultPostTaxIncome));

const defaultNumericalDiscretionaryIncomePercentage = 10;
const defaultNumericalDiscretionaryIncomeAllocation = Math.trunc(Number((defaultNumericalDiscretionaryIncomePercentage / 100) * defaultPostTaxIncome));
const defaultFilingStatus = 'single';
const defaultNumericalAnnualIncome = 47000;
const defaultAnnualIncome = "$" + String(defaultNumericalAnnualIncome).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const defaultUSState = "california";

export default function App() {
  const classes = useStyles();

  const taxes = Taxee[2019];

  const [state, setState] = React.useState({
    palette: {
      type: "light"
    },
    filingStatus: defaultFilingStatus,
    annualIncome: defaultAnnualIncome,
    numericalAnnualIncome: defaultNumericalAnnualIncome,
    usState: defaultUSState,
    marginalRate: defaultMarginalRate,
    postTaxIncome: defaultPostTaxIncome,
    numericalHousingPercentage: defaultNumericalHousingPercentage,
    numericalHousingAllocation: defaultNumericalHousingAllocation,
    numericalUtilitiesPercentage: defaultNumericalUtilitiesPercentage,
    numericalUtilitiesAllocation: defaultNumericalUtilitiesAllocation,

    numericalFoodPercentage: defaultNumericalFoodPercentage,
    numericalFoodAllocation: defaultNumericalFoodAllocation,

    numericalSavingsPercentage: defaultNumericalSavingsPercentage,
    numericalSavingsAllocation: defaultNumericalSavingsAllocation,

    numericalDiscretionaryIncomePercentage: defaultNumericalDiscretionaryIncomePercentage,
    numericalDiscretionaryIncomeAllocation: defaultNumericalDiscretionaryIncomeAllocation,

  });
  const getAllocatedIncomePercentage = () => {
    return Math.trunc(state.numericalDiscretionaryIncomePercentage + state.numericalSavingsPercentage + state.numericalFoodPercentage + state.numericalUtilitiesPercentage + state.numericalHousingPercentage);
  };

  const updateDiscretionaryIncomePercentage = (percentage) => {
    if (!percentage)
      return;
    percentage = String(percentage);
    percentage = percentage.replace(/[\%]/g, "");

    setState({
      ...state,
      numericalDiscretionaryIncomeAllocation: Math.trunc(Number((Number(percentage) / 100) * state.numericalAnnualIncome / 12)),
      numericalDiscretionaryIncomePercentage: Number(percentage)
    });
  };

  const updateSavingsPercentage = (percentage) => {
    if (!percentage)
      return;
    percentage = String(percentage);
    percentage = percentage.replace(/[\%]/g, "");

    setState({
      ...state,
      numericalSavingsAllocation: Math.trunc(Number((Number(percentage) / 100) * state.numericalAnnualIncome / 12)),
      numericalSavingsPercentage: Number(percentage)
    });
  };

  const updateFoodPercentage = (percentage) => {
    if (!percentage)
      return;
    percentage = String(percentage);
    percentage = percentage.replace(/[\%]/g, "");

    setState({
      ...state,
      numericalFoodAllocation: Math.trunc(Number((Number(percentage) / 100) * state.numericalAnnualIncome / 12)),
      numericalFoodPercentage: Number(percentage)
    });
  };

  const updateUtilitiesPercentage = (percentage) => {
    if (!percentage)
      return;
    percentage = String(percentage);
    percentage = percentage.replace(/[\%]/g, "");

    setState({
      ...state,
      numericalUtilitiesAllocation: Math.trunc(Number((Number(percentage) / 100) * state.numericalAnnualIncome / 12)),
      numericalUtilitiesPercentage: Number(percentage)
    });

  };

  const updateHousingPercentage = (percentage) => {
    if (!percentage)
      return;

    percentage = String(percentage);
    percentage = percentage.replace(/[\%]/g, "");

    setState({
      ...state,
      numericalHousingAllocation: Math.trunc(Number((Number(percentage) / 100) * state.numericalAnnualIncome / 12)),
      numericalHousingPercentage: Number(percentage),
    });
  };

  // we change the palette type of the theme in state
  const toggleDarkTheme = () => {
    let newPaletteType = state.palette.type === "light" ? "dark" : "light";
    setState({
      ...state,
      palette: {
        type: newPaletteType
      }
    });
  };

  const handleFilingStatusChange = (event) => {
    const value = event.target.value;
    setState({
      ...state,
      "filingStatus": value,
    });
  };

  const handleUSStateChange = (event) => {
    const value = event.target.value;
    setState({
      ...state,
      "usState": value
    });
  }


  const handleAnnualIncomeInputChange = (event) => {
    var regex = /^\$?[0-9,]*$/;
    var input = event.target.value;
    var valid = regex.test(input);

    if (!valid) {
      return;
    }

    // Remove dollar sign and commas
    input = input.replace(/[\$|,]/g, "");

    // Don't allow a bunch of zeros as an input
    if (Number(input) === 0 && input.length > 0) {
      return;
    }

    const numericalAnnualIncome = Number(input);

    // Add comma in every thousandths place 
    input = input.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    input = "$" + input;

    setState({
      ...state,
      "annualIncome": input,
      "numericalAnnualIncome": numericalAnnualIncome,
    });
  };

  const calculateHousingAllocation = () => {
    console.log(taxes);
    return Math.trunc(Number((Number(state.numericalHousingPercentage) / 100) * (calculatePostTaxIncome() / 12)));

  };

  const calculateUtilitiesAllocation = () => {
    return Math.trunc(Number((
      (state.numericalUtilitiesPercentage / 100) * (calculatePostTaxIncome() / 12)
    )));
  };


  const calculateFoodAllocation = () => {
    return Math.trunc(Number((
      (state.numericalFoodPercentage / 100) * (calculatePostTaxIncome() / 12)
    )));
  };

  const calculateSavingsAllocation = () => {
    return Math.trunc(Number((
      (state.numericalSavingsPercentage / 100) * (calculatePostTaxIncome() / 12)
    )));
  };

  const calculateDiscretionaryIncomeAllocation = () => {
    return Math.trunc(Number((
      (state.numericalDiscretionaryIncomePercentage / 100) * (calculatePostTaxIncome() / 12)
    )));
  };

  const get_tax = (brackets, income) => {

    var total_tax = 0;
    var upper, lower;

    for (var i = 0; i < brackets.length; ++i) {
      if (i === brackets.length - 1)
        upper = income;
      else
        upper = brackets[i + 1]['bracket'];

      lower = brackets[i]['bracket'];
      if (income < lower)
        break;

      if (income < upper)
        upper = income;

      total_tax += (upper - lower) * (brackets[i]['marginal_rate'] / 100);
    }
    return total_tax;
  };

  const calculateFederalTax = () => {
    const federal_tax_brackets = taxes["federal"]["tax_withholding_percentage_method_tables"]["annual"][state.filingStatus].income_tax_brackets;

    const federal_tax_deduction = taxes["federal"]["tax_withholding_percentage_method_tables"]["annual"]["single"]["deductions"][0]["deduction_amount"];

    const federal_taxable_income = state.numericalAnnualIncome - federal_tax_deduction;
    const federal_taxes = get_tax(federal_tax_brackets, federal_taxable_income);
    return federal_taxes;
  };

  const calculateStateTax = () => {
    var state_taxes;
    if (taxes[state.usState][state.filingStatus]["type"] === "none") {
      state_taxes = 0;
    } else {
      const state_tax_brackets = taxes[state.usState][state.filingStatus].income_tax_brackets;
      const state_tax_deduction = taxes[state.usState][state.filingStatus]['deductions'][0]['deduction_amount'];
      const state_taxable_income = state.numericalAnnualIncome - state_tax_deduction;
      state_taxes = get_tax(state_tax_brackets, state_taxable_income);
    }

    return state_taxes;
  };

  const calculateFICATax = () => {
    return state.numericalAnnualIncome * (7.65 / 100);
  };

  const calculatePostTaxIncome = () => {
    const federal_taxes = calculateFederalTax();
    const state_taxes = calculateStateTax();
    const fica_taxes = calculateFICATax();
    return Math.trunc(state.numericalAnnualIncome - (federal_taxes + state_taxes + fica_taxes));
  };

  const muiTheme = createMuiTheme(state);

  return (

    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <div className={classes.root}>

        <Grid container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={4}
        >
          <Grid container
            direction="row"
            justify="space-between"
            alignItems="center"
            spacing={10}
          >
            <Grid item />
            <Grid item>
              <Grid container
                direction="column"
                justify="center"
                alignItems="center"
                className={classes.topBar}
              >
                <Switch color="default" onChange={toggleDarkTheme} />
                <Typography variant="subtitle2">Toggle Dark Mode</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Typography variant="h3">Simple Budgeting App</Typography>
          </Grid>

          <Grid container
            direction="row"
            justify="center"
            spacing={4}
          >
            <Grid item xs={10} sm={3}>
              <Grid container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={4}
              >
                <Grid item className={classes.card}>
                  <Paper className={classes.paper}>
                    <Grid container
                      direction="column"
                    >
                      <Typography variant="body1">
                        Step 1.
                      </Typography>

                      <Typography variant="h6">
                        Your Annual Income
                      </Typography>

                      <Typography variant="subtitle2">
                        (2020)
                      </Typography>

                      <Input
                        className={classes.input}
                        value={state.annualIncome}
                        onChange={handleAnnualIncomeInputChange}
                        inputProps={{
                          style: {
                            textAlign: "center"
                          },
                          name: 'annualIncome'
                        }}
                      />
                    </Grid>
                  </Paper>
                </Grid>

                <Grid item className={classes.card}>
                  <Paper className={classes.paper}>
                    <Grid container
                      direction="column"
                    >
                      <Typography variant="body1">
                        Step 2.
                        </Typography>

                      <Typography variant="h6">
                        Your State
                      </Typography>

                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-native-simple">Your State</InputLabel>
                        <Select
                          native
                          value={state.usState}
                          onChange={handleUSStateChange}
                          inputProps={{
                            name: 'usState',
                            id: 'age-native-simple',
                          }}
                        >
                          <option aria-label="None" value="" />
                          <option value='alabama'>Alabama</option>
                          <option value='alaska'>Alaska</option>
                          <option value='arizona'>Arizona</option>
                          <option value='arkansas'>Arkansas</option>
                          <option value='california'>California</option>
                          <option value='colorado'>Colorado</option>
                          <option value='connecticut'>Connecticut</option>
                          <option value='delaware'>Delaware</option>
                          <option value='florida'>Florida</option>
                          <option value='georgia'>Georgia</option>
                          <option value='hawaii'>Hawaii</option>
                          <option value='idaho'>Idaho</option>
                          <option value='illinois'>Illinois</option>
                          <option value='indiana'>Indiana</option>
                          <option value='iowa'>Iowa</option>
                          <option value='kansas'>Kansas</option>
                          <option value='kentucky'>Kentucky</option>
                          <option value='louisiana'>Louisiana</option>
                          <option value='maine'>Maine</option>
                          <option value='maryland'>Maryland</option>
                          <option value='massachusetts'>Massachusetts</option>
                          <option value='michigan'>Michigan</option>
                          <option value='minnesota'>Minnesota</option>
                          <option value='mississippi'>Mississippi</option>
                          <option value='missouri'>Missouri</option>
                          <option value='montana'>Montana</option>
                          <option value='nebraska'>Nebraska</option>
                          <option value='nevada'>Nevada</option>
                          <option value='new_hampshire'>New Hampshire</option>
                          <option value='new_jersey'>New Jersey</option>
                          <option value='new_mexico'>New Mexico</option>
                          <option value='new_york'>New York</option>
                          <option value='north carolina'>North Carolina</option>
                          <option value='north dakota'>North Dakota</option>
                          <option value='ohio'>Ohio</option>
                          <option value='oklahoma'>Oklahoma</option>
                          <option value='oregon'>Oregon</option>
                          <option value='pennsylvania'>Pennsylvania</option>
                          <option value='rhode_island'>Rhode Island</option>
                          <option value='south_carolina'>South Carolina</option>
                          <option value='south_dakota'>South Dakota</option>
                          <option value='tennessee'>Tennessee</option>
                          <option value='texas'>Texas</option>
                          <option value='utah'>Utah</option>
                          <option value='vermont'>Vermont</option>
                          <option value='virginia'>Virginia</option>
                          <option value='washington'>Washington</option>
                          <option value='west_virginia'>West Virginia</option>
                          <option value='wisconsin'>Wisconsin</option>
                          <option value='wyoming'>Wyoming</option>
                        </Select>
                      </FormControl>

                    </Grid>
                  </Paper>
                </Grid>

                <Grid item style={{ width: "100%", textAlign: "center" }}>
                  <Paper className={classes.paper}>
                    <Grid container
                      direction="column"
                    >
                      <Typography variant="body1">
                        Step 3.
                      </Typography>

                      <Typography variant="h6">
                        Filing Status
                      </Typography>

                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-native-simple">Filing Status</InputLabel>
                        <Select
                          native
                          value={state.filingStatus}
                          onChange={handleFilingStatusChange}
                          inputProps={{
                            id: 'age-native-simple',
                          }}
                        >
                          <option aria-label="None" value="" />
                          <option value="single">Single</option>
                          <option value="married">Married Filing Jointly</option>
                          <option value="married_separately">Married Filing Separately</option>
                          <option value="head_of_household">Head of Household</option>

                        </Select>
                      </FormControl>

                    </Grid>
                  </Paper>
                </Grid>


              </Grid>
            </Grid>

            <Grid item className={classes.card} xs={10} sm={7}>

              <Grid container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={4}
              >
                <Grid item className={classes.card}>

                  <Grid container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={4}
                  >

                    <Grid item>
                      <Paper className={classes.paper}>
                        <Grid container
                          direction="column"
                        >

                          <Typography variant="h6">
                            Estimated Annual Take Home Pay
                          </Typography>


                          <Typography variant="h4">
                            {
                              "$" + String(calculatePostTaxIncome()).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            }
                          </Typography>

                        </Grid>
                      </Paper>
                    </Grid>

                    <Grid item>
                      <Paper className={classes.paper}>
                        <Grid container
                          direction="column"
                        >

                          <Typography variant="h6">
                            Percent of Income Allocated
                          </Typography>


                          <Typography variant="h4">
                            {getAllocatedIncomePercentage()}%
                          </Typography>

                        </Grid>
                      </Paper>
                    </Grid>

                  </Grid>
                </Grid>

                <Grid container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  spacing={4}
                >

                  <Grid item>
                    <SliderCard amount={calculateHousingAllocation()} lineItem="Housing" lineItemEmoji="🏡" numericalPercentage={state.numericalHousingPercentage} onChange={updateHousingPercentage} />
                  </Grid>
                  <Grid item>
                    <SliderCard amount={calculateUtilitiesAllocation()} lineItem="Utilities" lineItemEmoji="⚡️💧" numericalPercentage={state.numericalUtilitiesPercentage} onChange={updateUtilitiesPercentage} />
                  </Grid>
                  <Grid item>
                    <SliderCard amount={calculateFoodAllocation()} lineItem="Food" lineItemEmoji="🌯" numericalPercentage={state.numericalFoodPercentage} onChange={updateFoodPercentage} />
                  </Grid>
                  <Grid item>
                    <SliderCard amount={calculateSavingsAllocation()} lineItem="Savings" lineItemEmoji="💰" numericalPercentage={state.numericalSavingsPercentage} onChange={updateSavingsPercentage} />
                  </Grid>
                  <Grid item>
                    <SliderCard amount={calculateDiscretionaryIncomeAllocation()} lineItem="Wants" lineItemEmoji="🔥" numericalPercentage={state.numericalDiscretionaryIncomePercentage} onChange={updateDiscretionaryIncomePercentage} />
                  </Grid>

                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </MuiThemeProvider>

  );
}
