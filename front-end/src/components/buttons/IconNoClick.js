import React, { useState } from 'react';
import "../../css/filter_button.css";
import { Typography } from '@mui/material';
import { Box } from '@mui/system'





export default function IconNoClick(props) {

  return (
    <div className={'icon_noselect_btn_unselected'}>
        <Box
            marginTop={.7}
            paddingRight={3}
            component="img"
            sx={{
              height: 30,
            }}
            alt="icon"
            src={props.comp}
          />
         <Typography variant='h3'>{props.text}</Typography>
    </div>
  )
}
