import React, { useState } from 'react';
import "../../css/filter_button.css";
import { Typography } from '@mui/material';
import ButtonInput from './ButtonInput';
import AmPm from './AmPm';

export default function ButtonTime(props) {
    const [style, setStyle] = useState("unselected")
    const [timeBlockAction, settimeBlockAction] = useState(false)
    var millisecondsToWait = 10000;
    const [currentEvent, setCurrentEvent] = useState()

    const handleClick = () => {
        if (style === 'unselected' && !timeBlockAction) {
            setStyle("selected")
        } else if (style === 'selected' && !timeBlockAction) {
            setStyle("unselected")
        }

    }
    function childCallBack () {
        console.log("Timeblock action before", timeBlockAction)
        settimeBlockAction(true)
        console.log("Timeblock action after", timeBlockAction)
    }

  return (
    <button className={'filter_btn_' + style} onClick={handleClick}>
          <ButtonInput max_length={props.max_length} class_name={style + '_' + props.width}/>
          <AmPm/>

          <ButtonInput  max_length={props.max_length} class_name={style + '_' + props.width}/>
          <AmPm/>
         <Typography variant='h3'>{props.text}</Typography>
    </button>
  )
}
