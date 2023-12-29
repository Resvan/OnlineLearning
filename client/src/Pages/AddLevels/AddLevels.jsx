import React, { useState } from 'react';
import { Formik, Field, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Container, Typography, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    image: Yup.string().required('Image is required'),
    questions: Yup.array().of(
        Yup.object().shape({
            answer: Yup.string().required('Answer is required'),
            options: Yup.array().of(Yup.string().required('Option is required')).min(3, 'Add at least 3 options'),
        })
    ),
});

const AddLevels = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const { _id } = useSelector((state) => state.course);
    const [expanded, setExpanded] = useState(0);
    const [levels, setLevels] = useState([]);


    const handleFormSubmit = (values, { setSubmitting, resetForm  }) => {
        console.log(values);
        setSubmitting(true);
        values.course = _id;
        axios
            .post('http://localhost:6001/course/level', values, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                resetForm();
                setLevels(response.data);
            })
            .catch((err) => {
                console.error(err);
                toast.error(err.response.data.msg, {
                    position: 'top-center',
                });
            })
            .finally(() => {
                setSubmitting(false);
            });
    };


    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <Container>
            <Formik
                initialValues={{
                    title: '',
                    description: '',
                    image: '',
                    questions: [{ question: '', answer: '', options: ['', '', ''] }],
                }}
                validationSchema={validationSchema}
                onSubmit={handleFormSubmit}
            >
                {({ isSubmitting, setFieldValue }) => (
                    <Form>
                        <Typography variant="h4" color="#555" fontWeight="bold">
                            Add Level Details
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
                        <FieldArray name="questions">
                            {({ push, remove, form }) => (
                                <div>
                                    {form.values.questions.map((_, index) => (
                                        <div key={index}>


                                            <Field
                                                name={`questions.${index}.question`}
                                                as={TextField}
                                                label={`Question ${index + 1}`}
                                                variant="standard"
                                                fullWidth
                                                margin="normal"
                                                error={isSubmitting}
                                            />

                                            <Field
                                                name={`questions.${index}.answer`}
                                                as={TextField}
                                                label={`Answer for Question ${index + 1}`}
                                                variant="standard"
                                                fullWidth
                                                margin="normal"
                                                error={isSubmitting}
                                            />

                                            {Array(3).fill().map((_, optionIndex) => (
                                                <Field
                                                    key={optionIndex}
                                                    name={`questions.${index}.options.${optionIndex}`}
                                                    as={TextField}
                                                    label={`Option ${optionIndex + 1}`}
                                                    variant="standard"
                                                    fullWidth
                                                    margin="normal"
                                                    error={isSubmitting}
                                                />
                                            ))}

                                            <Button type="button" onClick={() => remove(index)}>
                                                Remove Question
                                            </Button>
                                        </div>
                                    ))}
                                    <Button
                                        type="button"
                                        onClick={() => push({ answer: '', options: ['', '', ''] })}
                                    >
                                        Add Question
                                    </Button>
                                </div>
                            )}
                        </FieldArray>

                        <Box sx={{display:"flex", justifyContent:"space-between"}}>
                        <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                            Add level
                        </Button>
                        <Button onClick={()=>navigate('/admin')} variant="contained" color="primary">
                            Save
                        </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
            
            <Box marginTop={10}>
                <Typography variant="h5" color="#555" fontWeight="bold">
                    Level Details
                </Typography>

                {
                    levels.map((level, idx) => (
                        <Accordion key={idx} expanded={expanded === idx} onChange={handleChange(idx)}>
                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                <Box sx={{ display: "flex", flexDirection: 'column' }}>
                                    <Typography variant='h5'>{level.title}</Typography>
                                    <Typography>{level.description}</Typography>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                {
                                    level.assignments.map((a, i) => (
                                        <div key={i}>
                                            <img style={{height:'30vh'}} src={level.video}></img>
                                            <p>question: {a.question}</p>
                                            <p>answer: {a.answer}</p>
                                            {
                                                a.options.map((o, j) => (
                                                    <p key={j}>Option{j + 1}: {o}</p>
                                                ))
                                            }
                                        </div>
                                    ))
                                }
                            </AccordionDetails>
                        </Accordion>
                    ))
                }
            </Box>
        </Container>
    );
};

export default AddLevels;
