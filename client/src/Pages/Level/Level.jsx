import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import QuizQuestion from "../../Components/Quiz/Quizquestion";

const CourseLevel = () => {
  const token = useSelector((state) => state.token);
  const { id } = useParams();
  const [level, setLevel] = useState({});
  const navigate = useNavigate();
  const [quizResults, setQuizResults] = useState([]);
  const [start, setStart] = useState(false);
  const [startTime, setStartTime] = useState(null);

  const getCourseLevel = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:6001/course/level-details/${id}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLevel(data);
    } catch (error) {
      console.error("Error fetching course level:", error);
    }
  };

  useEffect(() => {
    getCourseLevel();
  }, [id]);

  const handleAnswered = ({ correctCount }) => {
    if (correctCount == 1) {
      setQuizResults([...quizResults, correctCount]);
    }
  };

  const handleStartAssignment = () => {
    setStart(true);
    setStartTime(performance.now());
  };

  const handleSubmitAnswers = () => {
    // Calculate the time duration
    const endTime = performance.now();
    const duration = endTime - startTime;
    const progress = (quizResults?.length / level?.assignments?.length) * 100;
    const data = {
      levelId: level?._id,
      courseId: level?.course,
      progress: progress || 0,
      timeTaken: duration,
    };
    axios
      .post("http://localhost:6001/course/update-progress", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        navigate(`/course/${level?.course}`);
      });
  };

  return (
    <Container>
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
          image={level?.video}
          alt={level?.title}
        />
        <CardContent
          sx={{
            textAlign: "center",
            marginTop: "1rem",
          }}
        >
          <Typography variant="h5" component="div">
            {level?.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {level?.description}
          </Typography>
        </CardContent>
      </Card>
      {!start && (
        <Box marginTop={5}>
          <Button onClick={handleStartAssignment}>Start Assignment</Button>
        </Box>
      )}
      {start && (
        <Box sx={{ marginTop: "1rem" }}>
          {level?.assignments?.map((question, indx) => (
            <QuizQuestion
              key={indx}
              questionData={question}
              onAnswered={handleAnswered}
            />
          ))}
        </Box>
      )}
      <Box marginTop={5}>
        <Button onClick={handleSubmitAnswers}>Submit Answers</Button>
      </Box>
    </Container>
  );
};

export default CourseLevel;
