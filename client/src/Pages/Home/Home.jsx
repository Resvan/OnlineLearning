import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { setUser } from '../../state';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const [courses, setCourses] = useState([]);
    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getCourses = async () => {

        const { data } = await axios.get("http://localhost:6001/course", {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            }
        });

        setCourses(data);

    }
    const handleEnroll = async (courseId) => {
        try {
            if (!courseId) {
                toast.error('Please select a course before enrolling');
                return;
            }

            let { data } = await axios.post(
                'http://localhost:6001/course/enroll',
                { courseId },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            dispatch(setUser({ user: data }));

            toast.success('Successfully enrolled');
        } catch (error) {
            console.error('Error enrolling in the course:', error);
            toast.error('Error enrolling in the course');
        }
    };
    useEffect(() => {
        getCourses()
    }, []);
    return (

        <Box margin="5rem" >
            {
                courses?.map((course, i) =>
                    <Card key={i} sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component="img"
                            src={course.image}
                            alt="Paella dish"
                            sx={{ objectFit: "contain", height: "15rem" }}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {course?.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                            </Typography>
                        </CardContent>
                        <CardActions>
                            {
                                user?.courses?.includes(course._id) ?
                                    <Button onClick={() => {
                                        handleEnroll(course._id);
                                    }} size="small">Enroll</Button> :
                                    <Button onClick={() => {
                                        navigate(`/course/${course._id}`);
                                    }} size="small" sx={{ backgroundColor: "rgba(39, 11, 96, 0.5)", color: 'white' }}>Watch</Button>
                            }
                        </CardActions>
                    </Card>
                )
            }


        </Box>

    )
}

export default Home
