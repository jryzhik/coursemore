import React, { useState } from 'react';
import "../../css/filter_button.css";
import { Typography } from '@mui/material';
import ButtonInput from './ButtonInput';

export default function FilterButton(props) {
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
          <ButtonInput  max_length={props.max_length} class_name={style + '_' + props.width}/>
         <Typography variant='h3'>{props.text}</Typography>
    </button>
  )
}
