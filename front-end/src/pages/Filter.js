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
import ArrowUp from '../img/arrow_up.svg'
import CrossBlock from '../img/cross_block.svg'
import ButtonTime from '../components/buttons/ButtonTime';
import { useState } from 'react';


// const state = {
//   dayBlock: null,
//   profGPA: null,
//   hourBlock: [{start: null, end: null}],
//   techSquare: null,
//   minCredits: null,
//   maxCredit: null,
//   mandatoryCourse: null
// }


function Filter() {
  const [inputFields, setInputFields] = useState(
    { dayBlock: null,
      profGPA: false,
      hourBlock: {start: null, end: null},
      techSquare: false,
      minCredits: null,
      maxCredits: null,
      mandatoryCourse: null
    }
  )
  
  function childCallBack(attribute, value) {
    setInputFields(prevInputFields => ({ ...prevInputFields, [attribute]: value}))
  }

  function childCallBackTime(attribute, value) {
    setInputFields(prevInputFields => ({ 
      ...prevInputFields,
      hourBlock: {...prevInputFields.hourBlock, [attribute]: value},
    }))
  }

  console.log(inputFields)
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
        <Box
          paddingLeft={22}
          paddingRight={22}
          paddingTop={7}
          >
          <Grid container spacing={2} justifyContent={'flex-start'}>
            <Grid item xs={4} md={4}>
              <FilterButton attribute='dayBlock' handleCallBack={childCallBack} width='long' max_length='4' text='day block' />
            </Grid>
            <Grid item xs={4} md={4}>
              <FilterButton attribute='maxCredits' handleCallBack={childCallBack} width='default' max_length='2' text='max credits' />
            </Grid>
            <Grid item xs={4} md={4}>
              <FilterButton attribute='minCredits' handleCallBack={childCallBack} width='default' max_length='2' text='min credits' />
            </Grid>
            <Grid item xs={4} md={5}>
              <FilterButton attribute='mandatoryCourse' handleCallBack={childCallBack} width='long' max_length='4' text='mandatory course' />
            </Grid>
            <Grid item xs={4} md={4}>
              <ButtonIcon attribute='profGPA' handleCallBack={childCallBack} comp={ArrowUp} text='professor GPA' />
            </Grid>
            <Grid item xs={4} md={4}>
              <ButtonIcon attribute='techSquare' handleCallBack={childCallBack} comp={CrossBlock} text='tech square' />
            </Grid>
            <Grid item xs={4} md={6}>
              <ButtonTime handleCallBack={childCallBackTime} width='default' text='hour block' max_length='2' />
            </Grid>
          </Grid>
        </Box>
        {/* <FilterButton width='long' max_length='4' text='day block' />
        <FilterButton width='default' max_length='2' text='max credits' />
        <FilterButton width='default' max_length='2' text='min credits' />
        <FilterButton width='long' max_length='4' text='mandatory course' />
        <ButtonIcon comp={ArrowUp} text='professor GPA' />
        <ButtonIcon comp={CrossBlock} text='tech square' />
        <ButtonTime width='default' text='hour block' max_length='2' /> */}



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