import React from 'react'
import BrandButton from '../components/BrandButton'
import { ThemeProvider, Typography } from '@mui/material';
import { MainTheme } from '../theme';
import CssBaseline from "@mui/material/CssBaseline";
import Header from '../components/Header';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Upload from '../components/Upload';
import Footer from '../components/Footer';

function Home() {
  return (
    <ThemeProvider theme={MainTheme}>
      <Header/>
      <Grid
        paddingTop={15}
        container
        spacing={0}
        direction="column"
  >
    <Grid paddingLeft={20}>
        <Typography variant='h1'>Get <Typography variant='h1emph'>more</Typography> out of your schedule... </Typography>
    </Grid>

    <Grid paddingTop= {10} align={"center"}>
        <Typography variant='h4Info'>instructions <i>(Help)</i></Typography>
        <Divider sx={{
          borderStyle:'dashed',
          borderColor: '#ffffff',
          width: '11rem'
          }}/>
    </Grid>
    <Grid marginLeft={15} marginRight={15} padding={3} align={"center"}>
        <Upload/>
    </Grid>
    <Grid padding={3} align={"center"}>
        <Footer/>
    </Grid>
    
  </Grid>
      <CssBaseline/>
      {/* <BrandButton color={"secondary"}>Secondary</BrandButton>
      <BrandButton color={"primary"}>Primary</BrandButton> */}
    </ThemeProvider>
  )
}

export default Home