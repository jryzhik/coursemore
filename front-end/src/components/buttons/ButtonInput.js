import React, { useState } from 'react';
import "../../css/filter_button.css";



export default function ButtonInput(props) {
    var class_name = 'button_input_' + props.class_name
    console.log(class_name)
  return (
    <>
      <input maxLength={props.max_length} className={class_name}/>
    </>

  )
}
