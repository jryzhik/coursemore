import React, { useState } from 'react';
import "../../css/filter_button.css";
import { Typography } from '@mui/material';
import { Box } from '@mui/system'





export default function ButtonIcon(props) {
    const [style, setStyle] = useState("unselected")
    const [padding, setPadding] = useState(3)

    const handleClick = () => {
        if (style === 'unselected') {
            setStyle("selected")
            setPadding(3.1)
            props.handleCallBack(props.attribute, true)
        } else {
            setStyle("unselected")
            setPadding(3)
            props.handleCallBack(props.attribute, false)

        }
}
  return (
    <button className={'filter_btn_' + style} onClick={handleClick}>
        <Box
            marginTop={.7}
            paddingRight={padding}
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
