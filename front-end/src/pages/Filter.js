import React from 'react'
import BrandButton from '../components/buttons/BrandButton'
import { ThemeProvider, Typography } from '@mui/material';
import { MainTheme } from '../theme';
import CssBaseline from "@mui/material/CssBaseline";
import Header from '../components/Header';
import Grid from '@mui/material/Grid';
import Footer from '../components/Footer';
import UserImage from '../img/user.svg'
import FilterIcon from '../img/filter_icon.svg'
import FilterButton from '../components/buttons/FilterButton';

import { Box } from '@mui/system'
import Divider from '@mui/material/Divider';
import ButtonIcon from '../components/buttons/ButtonIcon';




function Filter() {
  return (
    <ThemeProvider theme={MainTheme}>
      <Header />
      <Grid
        paddingTop={15}
        container
        spacing={0}
        direction="column"
      >
        <Grid
          paddingLeft={20}
          container
          spacing={0}
          direction="row"
        >
          <Box
            component="img"
            sx={{
              height: 233,
            }}
            alt="user_image"
            src={UserImage}
          />
          <Typography paddingTop={10} variant='h1'>Please <Typography variant='h1emph'>select</Typography> your preferences </Typography>
        </Grid>

        <Grid paddingTop={0} align={"center"}>
          <Typography variant='h4Info'>suggested filters </Typography>
          <Box
            paddingLeft={1}
            component="img"
            sx={{
              height: 20,
            }}
            alt="filter_icon"
            src={FilterIcon}
          />
          <Divider sx={{
            borderStyle: 'dashed',
            borderColor: '#ffffff',
            width: '14rem'
          }} />
        </Grid>

        <FilterButton width='default' max_length='2' text='day block' />
        <FilterButton width='default' max_length='2' text='max credits' />
        <FilterButton width='default' max_length='2' text='min credits' />
        <FilterButton width='long' max_length='4' text='mandatory course' />
        <ButtonIcon image='/Users/jamesryzhkov/Library/CloudStorage/OneDrive-GeorgiaInstituteofTechnology/Georgia Tech/Spring 2023/CS4440/coursemore/front-end/src/img/arrow_up.svg'/>



        <Grid>
          <Footer />
        </Grid>

      </Grid>
      <CssBaseline />
      {/* <BrandButton color={"secondary"}>Secondary</BrandButton>
      <BrandButton color={"primary"}>Primary</BrandButton> */}
    </ThemeProvider>
  )
}

export default Filter