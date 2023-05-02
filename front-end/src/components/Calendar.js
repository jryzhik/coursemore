import React from 'react'
import Stack from '@mui/joy/Stack';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';



export default function Calendar(props) {
    const schedule = props.schedule
  return (
        <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {schedule.CourseTitle}
        </Typography>
        <Typography variant="h5" component="div">
          CS {schedule.CRN} &nbsp; | &nbsp;{schedule.Section}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {schedule.InstructorName} GPA: {schedule.GPA}
        </Typography>
        <Typography variant="body2">
            {schedule.TimeText}
          <br />
            Day: {schedule.Days}
        <br />
            {schedule.Location}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>

  )
}
