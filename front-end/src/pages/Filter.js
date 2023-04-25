import React from 'react'
import BrandButton from '../components/BrandButton'
import { ThemeProvider, Typography } from '@mui/material';
import { MainTheme } from '../theme';
import CssBaseline from "@mui/material/CssBaseline";
import Header from '../components/Header';
import Grid from '@mui/material/Grid';
import Footer from '../components/Footer';
import UserImage from '../img/user.svg'
import FilterIcon from '../img/filter_icon.svg'

import { Box } from '@mui/system'
import Divider from '@mui/material/Divider';




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

        <Grid paddingTop= {0} align={"center"}>
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
            borderStyle:'dashed',
            borderColor: '#ffffff',
            width: '14rem'
            }}/>
        </Grid>

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

export default Filter