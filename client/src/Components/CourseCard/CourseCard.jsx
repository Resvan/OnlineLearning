import React from 'react';
import { Card, CardContent, CardMedia, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({id, image, author, title, description, }) => {
    const navigate = useNavigate();


    const handleEnrollClick = (id) => {
        navigate(`/admin/${id}`);
     };
  return (
    <Card>
      <CardMedia component="img" height="140" image={image} alt={title} />
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Author: {author}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Button variant="contained" color="primary" onClick={() => handleEnrollClick(id)}>
  Get Details
</Button>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
