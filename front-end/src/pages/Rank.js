import React, { useState, useEffect } from 'react'
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
import { useLocation } from 'react-router-dom'
import ArrowNext from '../img/arrow_next.svg'
import { Box } from '@mui/system'
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const coursesList = [
    {
        id: 'dayBlock',
        name: 'day block',
        icon: DayBlock
    },
    {
        id: 'hourBlock',
        name: 'hour block',
        icon: DayBlock
    },
    {
        id: 'profGPA',
        name: 'professor GPA',
        icon: GPA
    },
    {
        id: 'techSquare',
        name: 'tech square',
        icon: CrossBlock
    }
]



function Rank() {
    // Get info from filter page
    const location = useLocation()
    const parameters = location.state
    // console.log("passed down filter page", parameters)
    const navigate = useNavigate();

    const parametersFiltered = coursesList.filter(object_element => {
        if (object_element.id === 'hourBlock') {
            if (parameters[object_element.id]?.start !== null && parameters[object_element.id]?.start !== 0 && parameters[object_element.id]?.end !== 0) {
                return true
            } else {
                return false
            }
        } else {
            if (parameters[object_element.id] !== null) {
                return true;
            } else {
                return false;
            }
        }
    });
    useEffect(() => {
        console.log("OBJECT", parameters)
        // if (parametersFiltered.length === 1 || parametersFiltered.length === 0) {
        //     console.log("take me to nextpage");
        //     navigate('/results', { state: parameters });
        // }
        const apiUrl = 'http://localhost:5050/schedule/getSchedule';

            // const data = {
            //     dayBlock: 'TW',
            //     degreeWorksCourses: [['4460'], ['2050', '2051'], ['1332'], ['2340'], ['3001', '4001', '4002', '4003', '4726'], ['2110']],
            //     hourBlock: {
            //         start: '11',
            //         end: '13',
            //     },
            //     mandatoryCourse: '3510',
            //     maxCredits: '18',
            //     minCredits: '12',
            //     profGPA: null,
            //     ranking: ['techSquare', 'hourBlock', 'dayBlock'],
            //     techSquare: true,
            // };
            const data = {
                dayBlock: parameters.dayBlock,
                degreeWorksCourses: parameters.degreeWorksCourses,
                hourBlock: parameters.hourBlock,
                mandatoryCourse: parameters.mandatoryCourse,
                maxCredits: parameters.maxCredits,
                minCredits: parameters.minCredits,
                profGPA: parameters.profGPA,
                ranking: parameters.ranking,
                techSquare: parameters.techSquare,
            };

            axios.post(apiUrl, data)
                .then(response => {
                    console.log('Response:', response.data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
                navigate('/results', { state: parameters });

    }, []);

    const [courses, updateCourses] = useState(parametersFiltered);
    function handleOnDragEnd(result) {
        if (!result.destination) return;

        const items = Array.from(courses);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        updateCourses(items);
    }

    function nextHandle() {
        const newArr = []
        courses.forEach((element) => {
            newArr.push(element.id)
        })
        parameters['ranking'] = newArr
        console.log("Final Object", parameters)
        navigate('/results', { state: parameters });
    };
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
                                <Stack paddingTop={10} paddingLeft={30} paddingRight={30} spacing={3}>
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
                <Grid onClick={nextHandle} paddingTop={4} align={"center"}>
                    <Typography color='#EAAA00' variant='h4Info'>next</Typography>
                    <Box
                        paddingLeft={1}
                        component="img"
                        sx={{
                            height: 20,
                        }}
                        alt="next_icon"
                        src={ArrowNext}
                    />
                    <Divider sx={{
                        borderStyle: 'dashed',
                        borderColor: '#EAAA00',
                        width: '5rem'
                    }} />
                </Grid>
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