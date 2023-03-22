import { Button} from '@mui/material'
import React from 'react';

const BrandButton = ({ color, children }) => {
  return (
    <Button 
        variant="contained" 
        color={color} 
        >
            {children}
    </Button>
  )
}


export default BrandButton;