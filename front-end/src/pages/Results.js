import React, { useState } from 'react'
import { ThemeProvider, Typography } from '@mui/material';
import { MainTheme } from '../theme';
import CssBaseline from "@mui/material/CssBaseline";
import Header from '../components/Header';
import Grid from '@mui/material/Grid';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom'


function Results() {
    const location = useLocation()
    const parameters = location.state
    console.log("Results from ranking algorithm", parameters)
   

    return (
        <ThemeProvider theme={MainTheme}>
            <Header />
            <Grid
                paddingTop={15}
                container
                spacing={0}
                direction="column"
            >
                <Grid paddingLeft={20}>
                    <Typography variant='h1'>Here is your <Typography variant='h1emph'>optimized</Typography> schedules :) </Typography>
                </Grid>
                <h1>schedule 1</h1>
                <h2>{JSON.stringify(parameters[0])}</h2>
                <h1>schedule 2</h1>
                <h2>{JSON.stringify(parameters[1])}</h2>
                <h1>schedule 3</h1>
                <h2>{JSON.stringify(parameters[2])}</h2>
                <Grid padding={3} align={"center"}>
                    <Footer />
                </Grid>

            </Grid>
            <CssBaseline />
            {/* <BrandButton color={"secondary"}>Secondary</BrandButton>
      <BrandButton color={"primary"}>Primary</BrandButton> */}
        </ThemeProvider>
    )
}

export default Results