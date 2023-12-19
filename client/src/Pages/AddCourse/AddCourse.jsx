import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setCourse } from '../../state';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  image: Yup.mixed().required('Image is required'),
});

const AddCourse = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);



  const handleFormSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(true);

    axios
    .post('http://localhost:6001/course/add', values, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
        }
    })
    .then((response) => {
        dispatch(setCourse({ course:  response.data}));
        toast.success('Added Success fully', {
            position: "top-center",});
            navigate('/add-levels');

    })
    .catch((err) => {
        console.log(err);
        ((error) => {
            toast.error(error.response.data.msg, {
                position: "top-center",
            });
        })(err);
    });
    setSubmitting(false);
  };

  return (
    <Container>
      <Formik
        initialValues={{
          title: '',
          description: '',
          image: null,
        }}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <Typography variant="h4" color="#555" fontWeight="bold">
             Add Course Detatils
            </Typography>

            <Field
              name="title"
              as={TextField}
              label="Title"
              variant="standard"
              fullWidth
              margin="normal"
              error={isSubmitting}
            />

            <Field
              name="description"
              as={TextField}
              label="Description"
              variant="standard"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              error={isSubmitting}
            />

            <input
              type="file"
              accept="image/*"
              onChange={(event) => setFieldValue('image', event.currentTarget.files[0])}
              style={{ marginTop: '8px', marginBottom: '8px' }}
            />

            <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default AddCourse;
