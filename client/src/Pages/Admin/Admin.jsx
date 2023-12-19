import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import axios from 'axios';
import CourseCard from '../../Components/CourseCard/CourseCard';

const AdminHome = () => {

    const [courses, setCourses] = useState([]);
    const token = useSelector((state) => state.token);


    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:6001/course',
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${token}`,
                        }
                    }
                );
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    return (
        <Container sx={{marginTop:"2rem", }}>
            <Grid container>
            {courses.map((course, i) => (
               <Grid key={i} item xs={12} md={3}>
                     <CourseCard
                    key={i}
                    id={course._id}
                    image={course.image}
                    author={course.owner.username}
                    title={course.title}
                    description={course.description}
                />
               </Grid>
            ))}
            </Grid>
        </Container>
    );
};

export default AdminHome;
