import React, { useState } from 'react';
import "../../css/filter_button.css";
import { Typography } from '@mui/material';
import { Box } from '@mui/system'
import ArrowUp from '../../img/arrow_up.svg'



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
            paddingLeft={1}
            component="img"
            sx={{
              height: 30,
            }}
            alt="icon"
            src={FilterIcon}
          />
         <Typography variant='h3'>{props.text}</Typography>
    </button>
  )
}
