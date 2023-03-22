import React from 'react'
import Logo from '../img/Bezazel_Original_WHITE_PNG.png'
import { Box } from '@mui/system'

function Footer() {
  return (
    <Box
        component="img"
        sx={{
            height: 30,
        }}
        alt="Bezalel Studio ®"
        src={Logo}
    />
  )
}

export default Footer