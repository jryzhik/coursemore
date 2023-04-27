import React, { useState } from 'react'
import BrandButton from '../components/buttons/BrandButton'
import { ThemeProvider, Typography } from '@mui/material';
import { MainTheme } from '../theme';
import CssBaseline from "@mui/material/CssBaseline";
import Header from '../components/Header';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Upload from '../components/Upload';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom'
import { Alert, AlertTitle } from '@mui/material';

function Home() {
  const navigate = useNavigate();

  function uploadCallBack(degreeWorksResult) {
    navigate('/filter', { state: degreeWorksResult });
  };
  const [instructionHelper, setInstructionHelper] = useState('instruction_inactive')
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
          <Typography variant='h1'>Get <Typography variant='h1emph'>more</Typography> out of your schedule... </Typography>
        </Grid>

        <Grid paddingTop={10} align={"center"}>
          <Typography onMouseLeave={() => setInstructionHelper('instruction_inactive') }onMouseEnter={() => setInstructionHelper('instruction_active')} variant='h4Info'>instructions <i>(Help)</i></Typography>
        <div className={instructionHelper}>
          <Alert severity="info">
            <AlertTitle>Degree Works Export</AlertTitle>
            (Chrome Browser) Select <strong>Registration Checklist</strong> in Degree Works. Then, <code>cmd+s</code> and select <code>web page complete</code>. Finally, upload the file name <code>SD_GeneralIntroduction.html</code> found in the downloaded folder.
          </Alert>
        </div>

          <Divider sx={{
            borderStyle: 'dashed',
            borderColor: '#ffffff',
            width: '11rem'
          }} />
        </Grid>
        <Grid marginLeft={15} marginRight={15} padding={3} align={"center"}>
          <Upload handleCallBack={uploadCallBack} />
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

export default Home