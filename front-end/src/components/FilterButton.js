import React, { useState } from 'react';
import "../css/filter_button.css";
import { Typography } from '@mui/material';


export default function FilterButton() {
    const [style, setStyle] = useState("filter_btn_unselected")

    const handleClick = () => {
        if (style === 'filter_btn_unselected') {
            setStyle("filter_btn_selected")
        } else {
            setStyle("filter_btn_unselected")
        }
}
  return (
    <button className={style} onClick={handleClick}>
         <Typography variant='h3'>day block</Typography>
    </button>
  )
}
