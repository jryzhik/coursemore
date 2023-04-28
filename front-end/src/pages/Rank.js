import React, { useState } from 'react'
import { ThemeProvider, Typography } from '@mui/material';
import { MainTheme } from '../theme';
import CssBaseline from "@mui/material/CssBaseline";
import Header from '../components/Header';
import Grid from '@mui/material/Grid';
import Footer from '../components/Footer';
import GPA from '../img/arrow_up.svg'
import DayBlock from '../img/dayblock.svg'
import CrossBlock from '../img/cross_block.svg'
import IconNoClick from '../components/buttons/IconNoClick';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import Stack from '@mui/joy/Stack';
import { Box } from '@mui/system'

const coursesList = [
    {
        id: 'day',
        name: 'day block',
        icon: DayBlock
    },
    {
        id: 'hour',
        name: 'hour block',
        icon: DayBlock
    },
    {
        id: 'gpa',
        name: 'professor GPA',
        icon: GPA
    },
    {
        id: 'tech',
        name: 'tech square',
        icon: CrossBlock
    }
]



function Rank() {
    const [courses, updateCourses] = useState(coursesList);
    function handleOnDragEnd(result) {
        if (!result.destination) return;

        const items = Array.from(courses);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        updateCourses(items);
    }

    return (
        <ThemeProvider theme={MainTheme}>
            <Header />
            <Grid
                paddingTop={15}
                container
                spacing={0}
                direction="column"
            >
                <Grid paddingLeft={20}>
                    <Typography variant='h1'>Now <Typography variant='h1emph'>rank</Typography> your preferences in priority… </Typography>
                </Grid>

                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="characters">
                        {(provided) => (
                            <div className="courses" {...provided.droppableProps} ref={provided.innerRef}>
                                <Stack paddingTop={10}paddingLeft={30} paddingRight={30} spacing={3}>
                                    {courses.map(({ id, name, icon }, index) => {
                                        return (
                                            <Draggable key={id} draggableId={id} index={index}>
                                                {(provided) => (
                                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                        <IconNoClick text={name} comp={icon} />
                                                    </div>
                                                )}
                                            </Draggable>
                                        );
                                    })}
                                    {provided.placeholder}
                                </Stack>
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                <Grid padding={3} align={"center"}>
                    <Footer />
                </Grid>

            </Grid>
            <CssBaseline />
            {/* <BrandButton color={"secondary"}>Secondary</BrandButton>
      <BrandButton color={"primary"}>Primary</BrandButton> */}
        </ThemeProvider>
    )
}

export default Rank