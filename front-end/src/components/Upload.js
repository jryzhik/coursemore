import React from 'react'
import { Box } from '@mui/system'
import Imageww from '../img/upload_icon.svg'
import { Typography } from '@mui/material'
import Grid from '@mui/material/Grid';



function Upload() {
  return (
    <Box
      sx={{
        height: '25rem',
        borderStyle:'dashed',
        borderRadius: 5,
        borderWidth: 4,
        transition: '.4s',
        '&:hover': {
            backgroundColor: 'secondary.main',
            opacity: [.3, .3, .7],
        },
      }}
    > 
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Box paddingTop={10}
                    component="img"
                    sx={{
                        height: 233,
                    }}
                    alt="Upload here"
                    src={Imageww}
                />
            </Grid>
            <Grid item xs={12}>
                <Typography variant='h5Thin'>UPLOAD DEGREE WORKS PDF</Typography>
            </Grid>
        </Grid>

    </Box>

  )
}

export default Upload