import React, { useState, useEffect } from 'react';
import "../../css/filter_button.css";
import { Typography } from '@mui/material';
import ButtonInput from './ButtonInput';

export default function FilterButton(props) {
  const [valueEntered, setValueEntered] = useState(null);
  const [style, setStyle] = useState("unselected");

  function childCallBackInputs(attribute, value) {
    if (style === 'selected') {
      props.handleCallBack(props.attribute, value);
    }
    setValueEntered(value);
  }
  

 const handleClick = () => {
  if (style === 'unselected') {
    setStyle("selected");
    props.handleCallBack(props.attribute, valueEntered);
  } else {
    setStyle("unselected");
    props.handleCallBack(props.attribute, null);
  }
}


  return (
    <button className={'filter_btn_' + style} onClick={handleClick}>
      <ButtonInput attribute={props.attribute} handleCallBack={childCallBackInputs} max_length={props.max_length} class_name={style + '_' + props.width} />
      <Typography variant='h3'>{props.text}</Typography>
    </button>
  )
}