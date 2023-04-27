import React, { useState } from 'react';
import "../../css/filter_button.css";
import { Typography } from '@mui/material';
import ButtonInput from './ButtonInput';
import AmPm from './AmPm';

export default function ButtonTime(props) {
    const [style, setStyle] = useState("unselected")
    const [timeBlockAction, settimeBlockAction] = useState(false)
    const [time_period_selection, setTimePeriodSelection] = useState(
        {
            start_tp: '',
            start_hour: null,
            end_tp: '',
            end_hour: null

        }
    )
    function childCallBack(attribute, value) {
        setTimePeriodSelection(prevInputFields => ({ ...prevInputFields, [attribute]: value }))
    }

    function childCallBackInputs(attribute, value) {
        setTimePeriodSelection(prevInputFields => ({ ...prevInputFields, [attribute]: value }))
    }

    function military_time(time_period, hour) {
        if (time_period === 'pm' && hour != '12') {
            return Number(hour) + 12
        } else {
            return Number(hour)
        }
    }
    const handleClick = () => {
        if (style === 'unselected' && !timeBlockAction) {
            setStyle("selected")
        } else if (style === 'selected' && !timeBlockAction) {
            setStyle("unselected")
        }
        props.handleCallBack('start', military_time(time_period_selection.start, time_period_selection.start_hour))
        props.handleCallBack('end', military_time(time_period_selection.end, time_period_selection.end_hour))

    }
    return (
        <button className={'filter_btn_' + style} onClick={handleClick}>
            <ButtonInput attribute={'start_hour'} handleCallBack={childCallBackInputs} max_length={props.max_length} class_name={style + '_' + props.width} />
            <AmPm time_class='start' handleCallBack={childCallBack} />

            <ButtonInput attribute={'end_hour'} handleCallBack={childCallBackInputs} max_length={props.max_length} class_name={style + '_' + props.width} />
            <AmPm time_class='end' handleCallBack={childCallBack} />
            <Typography variant='h3'>{props.text}</Typography>
        </button>
    )
}
