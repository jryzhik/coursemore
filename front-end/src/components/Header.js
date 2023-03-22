import React from 'react'
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

function Header() {
  return (
    <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '10vh' }}
        >

        <Grid item xs={3}>
            <Typography variant='logo'>coursemore</Typography>
        </Grid>   
        
        </Grid> 
    )
}
export default Header