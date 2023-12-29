import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
  useEventCallback,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CourseDetails = () => {
  const token = useSelector((state) => state.token);
  const { id } = useParams();
  const [course, setCourse] = useState({});
  const navigate = useNavigate();
  const [progress, setProgress] = useState(null);

  const levels = course?.levels || [];
  const progressLevels = progress?.levels || [];

  const getCourseDetails = async () => {
    const { data } = await axios.get(
      `http://localhost:6001/course/course-details/${id}`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setCourse(data);
  };

  const getCourseProgressByUser = async () => {
    const { data } = await axios.get(
      `http://localhost:6001/course/progress/${id}`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setProgress(data);
  };

  useEffect(() => {
    getCourseDetails();
    getCourseProgressByUser();
  }, [id]);

  return (
    <Container>
      <Button onClick={() => navigate(`/leaders-board/${id}`)}>View Leaders Board</Button>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "75vh",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: "100%",
            height: "75%",
            objectFit: "cover",
          }}
          image={course?.image}
          alt={course?.title}
        />
        <CardContent
          sx={{
            textAlign: "center",
            marginTop: "1rem",
          }}
        >
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
      {levels.map((level, index) => {
        return (
          <Accordion
            key={level._id}
            disabled={index !== 0 && !progressLevels[index - 1]?.passed}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index + 1}-content`}
              id={`panel${index + 1}-header`}
            >
              <Typography>{level?.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{level?.description}</Typography>
              <Button
                onClick={() => navigate(`/level/${level._id}`)}
                variant="contained"
                color="primary"
              >
                Watch
              </Button>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Container>
  );
};

export default CourseDetails;
