import { Box, Button, Grid, makeStyles, MenuItem, Paper, TextField, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { renderImage } from "./letter"

function App() {


    const [inputs, setInputs] = useState({
        pattern: "",
        size: "3",
        direction: "horizontal"
    })
    const [error1, setError1] = useState(true)
    const [error2, setError2] = useState(true)
    const [error3, setError3] = useState(true)

    const [btnClicked, setBtnClicked] = useState(false)

    const [result, setResult] = useState([]);

    useEffect(() => {
        //VERIFICATION OF VALUES

        let { pattern, size, direction } = inputs;

        let patternToArray = pattern.split("");
        let invalidChars = patternToArray.filter(char => (char !== "X" && char !== "Y" && char !== "Z"));

        setError1((invalidChars.length === 0 && pattern !== "") ? false : true)

        setError2(((size % 2 && size >= 3) ? false : true))

        setError3(direction === "" ? true : false)

    }, [inputs])


    const generate = () => {

        setBtnClicked(true);

        //GENERATION!!
        if (!error1 && !error2 && !error3) {
            setResult(renderImage(inputs));
        }
    }


    const clearInputs = () => {
        setInputs({
            pattern: "",
            size: "",
            direction: "horizontal"
        })
        setError1(false)
        setError2(false)
        setError3(false)
        setBtnClicked(false)
        setResult([])
    }


    const handleChange = (e) => {
        const { name, value } = e.target

        setInputs({ ...inputs, [name]: value })

    }

    const directions = ["vertical", "horizontal"];


    // ---------------STYLES-------------------------
    const useStyles = makeStyles((theme) => ({
        main__container: {
            marginTop: theme.spacing(7),
        },
        main__grid: {
            height: "100vh"
        },
        main__left: {
            backgroundColor: theme.palette.info.light
        },
        main__right: {
            marginTop: 50
        },
        title__paper: {
            padding: theme.spacing(5),
            maxHeight: "80vh"
        },
        form__paper: {
            padding: theme.spacing(5),
            width: "80%",
            height: "90vh"
        },
        buttons: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(3)
        },
        result__container: {
            padding: theme.spacing(3),
            maxHeight: "65vh"
        },
        result__content: {
            fontFamily: [
                'Space Mono', "monospace",
            ].join(','),
        }

    }));
    const classes = useStyles();


    return (
        <div className="app">
            <Box height="100vh">
                <Grid container className={classes.main__grid}>

                    <Grid item sm={6} xs={12} container alignItems="center" justify="center" className={classes.main__left}>
                        <Grid item xs={10}>
                            <Paper className={classes.title__paper} elevation={2}>
                                <Typography variant="h2">XYZ Machine Problem</Typography>
                                <Typography variant="subtitle1">
                                    by Miguel Angelo P. Laplana
                            </Typography>
                                <Typography variant="subtitle1">
                                    for 98 Labs' job interview/application
                            </Typography>
                            </Paper>
                        </Grid>
                    </Grid>

                    <Grid item sm={6} xs={12} container justify="center" className={classes.main__right}>

                        <Paper className={classes.form__paper}>
                            <form noValidate autoComplete="off">
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={4}>
                                        <TextField name="pattern" label="Pattern"
                                            onChange={handleChange} value={inputs.pattern}
                                            error={(btnClicked && error1) ? true : false}
                                            helperText={
                                                btnClicked
                                                &&
                                                (error1 ?
                                                    (inputs.pattern === "" ?
                                                        "No input."
                                                        :
                                                        "Only use X, Y and Z")
                                                    : "")
                                            }

                                        />

                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField type="number" name="size" label="Size"
                                            onChange={handleChange} value={inputs.size}
                                            error={(btnClicked && error2) ? true : false}
                                            helperText={
                                                btnClicked
                                                &&
                                                (error2 ?
                                                    (inputs.size === "" ?
                                                        "No input."
                                                        :
                                                        "Must be odd and >= 3")
                                                    :
                                                    "")
                                            }
                                        />

                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField name="direction" label="Direction" select className={classes.input__direction}
                                            onChange={handleChange} value={inputs.direction}
                                            error={(btnClicked && error3) ? true : false}
                                            helperText={
                                                btnClicked
                                                && (error3 && "No input.")
                                            }
                                        >
                                            {directions.map((option) => (
                                                <MenuItem key={option} value={option}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </TextField>

                                    </Grid>

                                    <Grid item xs={12} container spacing={3} justify="center" className={classes.buttons}>

                                        <Grid item md={4} sm={6} xs={12}>
                                            <Button variant="contained" color="primary" onClick={generate} fullWidth >
                                                Generate
                                        </Button>

                                        </Grid>
                                        <Grid item md={4} sm={6} xs={12}>
                                            <Button variant="outlined" color="primary" onClick={clearInputs} fullWidth>
                                                Clear Inputs
                                        </Button>

                                        </Grid>

                                    </Grid>

                                </Grid>



                                <Box overflow="auto">
                                    <Paper className={classes.result__container}>

                                        {result.map(row => (
                                            <Typography align="center" variant="subtitle1" className={classes.result__content}>
                                                {row.map(char => (
                                                    char === "o" ? "o" : <span>&nbsp;</span>
                                                ))}
                                            </Typography>
                                        ))}


                                    </Paper>
                                </Box>
                            </form>
                        </Paper>

                    </Grid>

                </Grid>
            </Box>
        </div>
    );
}

export default App;
