import React from 'react'
import Logo from '../img/Bezazel_Original_WHITE_PNG.png'
import { Box } from '@mui/system'

function Footer() {
  return (
    <Box
        position={'absolute'}
        
        component="img"
        sx={{
            left:0,
            right:0,
            height: 30,
            bottom:30,
            marginLeft:"auto",
            marginRight:"auto",
        }}
        alt="Bezalel Studio ®"
        src={Logo}
    />
  )
}

export default Footer