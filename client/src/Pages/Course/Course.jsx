import React, { useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Button, Card, CardContent, CardMedia, Container, Typography, useEventCallback } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const CourseDetails = () => {
  const token = useSelector((state) => state.token);
  const { id } = useParams();
  const [course, setCourse] = useState({});
  const navigate = useNavigate();

  const getCourseDetails = async () => {

    const { data } = await axios.get(`http://localhost:6001/course/course-details/${id}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      }
    });
    console.log(data);
    setCourse(data);

  }


  useEffect(() => {
    getCourseDetails();
  },[])

  return (
    <Container>
          <Card sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '75vh',
    }}>
      <CardMedia component="img" sx={{
        width: '100%',
        height: '75%',
        objectFit: 'cover',
      }} image={course?.image} alt={course?.title} />
      <CardContent sx={{
        textAlign: 'center',
        marginTop: '1rem',
      }}>
        <Typography variant="h5" component="div">
          {course?.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Author: {course?.owner?.username}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {course?.description}
        </Typography>
      </CardContent>
    </Card>
    {
      course?.levels?.map((level)=>(
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{level?.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {level?.description}
          </Typography>
          <Button onClick={()=>navigate(`/level/${level._id}`)} variant="contained" color="primary">
                            Watch
                        </Button>
        </AccordionDetails>
      </Accordion>
      ))
    }
    </Container>
  );
};

export default CourseDetails;
