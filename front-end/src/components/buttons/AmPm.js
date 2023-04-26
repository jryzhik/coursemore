import React from 'react'
import { useState, useEffect } from 'react'

export default function AmPm() {
    const [am, setAM] = useState(false)
    const [pm, setPM] = useState(false)
    const [amClass, setAMClass] = useState('unselected')
    const [pmClass, setPMClass] = useState('unselected')

    const handleClick = (block, event) => {
        event.stopPropagation();
        if (am === false && pm === false) {
            if (block === 'am') {
                setAM(true)
            } else if (block === 'pm') {
                setPM(true)
            }
        } else {
            if (block === 'am' && am) {
                setAM(false)
                setPM(true)
            } else if (block === 'pm' && pm) {
                setAM(true)
                setPM(false)
            } if (block === 'am' && !am) {
                setAM(true)
                setPM(false)
            } else if (block === 'pm' && !pm) {
                setAM(false)
                setPM(true)
            }
        }
    }

    useEffect(() => {
        if (am) {
            setAMClass('selected')
        } else {
            setAMClass('unselected')
        }
        if (pm) {
            setPMClass('selected')
        } else {
            setPMClass('unselected')
        }
    }, [am, pm])

    return (
        <div className='am_pm_container'>
            <div onClick={(event) => handleClick('am', event)} className={'ampm_' + amClass}>am</div>
            <div onClick={(event) => handleClick('pm', event)} className={'ampm_' + pmClass}>pm</div>
        </div>
    )
}
