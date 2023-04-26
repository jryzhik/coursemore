import React, { useState } from 'react';
import "../../css/filter_button.css";
import { Typography } from '@mui/material';
import { Box } from '@mui/system'





export default function ButtonIcon(props) {
    const [style, setStyle] = useState("unselected")

    const handleClick = () => {
        if (style === 'unselected') {
            setStyle("selected")
        } else {
            setStyle("unselected")
        }
}
  return (
    <button className={'filter_btn_' + style} onClick={handleClick}>
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
    </button>
  )
}
