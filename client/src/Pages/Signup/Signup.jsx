import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios'







const Signup = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .min(3, 'Name must be at least 3 characters')
            .required('Name is required'),
        email: Yup.string()
            .email('Invalid email')
            .required('Email is required'),
        phone: Yup.string()
            .matches(/^\d{10}$/, 'Invalid phone number')
            .required('Phone is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters long')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[0-9]/, 'Password must contain at least one number')
            .matches(/[^a-zA-Z0-9]/, 'Password must contain at least one symbol'),
    });


    const handleSubmit = (values) => {
        console.log(values);
        setIsSubmitting(true);

        axios.post("http://localhost:6001/auth/signup", values, {
                headers: { "Content-Type": "application/json" },
            })
            .then((response) => {

                navigate("/");

            })
            .catch((err) => {

                ((error) => {
                    toast.error(error.response.data.msg, {
                        position: "top-center",
                    });
                })(err);
            })
        setIsSubmitting(false);

    };

    return (
        <Grid container sx={{
            height: "100vh",
            backgroundColor: "rgb(193, 190, 255)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <Grid item xs={12} md={6}>
                <Card sx={{
                    marginTop: { xs: "6rem", sm: "0" }
                }}>
                    <Stack direction={{ xs: "column", sm: "row" }}>
                        <Box flex={1} sx={{
                            padding: "3rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "1.5rem",
                            justifyContent: "center"
                        }} >
                            <Typography variant='h4' color="#555" fontWeight="bold" >
                                Register
                            </Typography>
                            <Formik
                                initialValues={{ username: '', email: '', phone: '', password: '' }}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ errors, touched }) => (
                                    <Form style={{display: 'flex', flexDirection:"column"}}>
                                        <Field 
                                            name="username"
                                            as={TextField}
                                            label="User Name"
                                            variant="standard"
                                            error={touched.username && Boolean(errors.username)}
                                            helperText={touched.username && errors.username}
                                        />
                                        <Field
                                            name="email"
                                            as={TextField}
                                            label="Email"
                                            variant="standard"
                                            error={touched.email && Boolean(errors.email)}
                                            helperText={touched.email && errors.email}
                                        />
                                        <Field
                                            name="password"
                                            as={TextField}
                                            variant="standard"
                                            label="Password"
                                            type="password"
                                            error={touched.password && Boolean(errors.password)}
                                            helperText={touched.password && errors.password}
                                        />
                                        <Field
                                            name="phone"
                                            as={TextField}
                                            variant="standard"
                                            label="Phone Number"
                                            error={touched.phone && Boolean(errors.phone)}
                                            helperText={touched.phone && errors.phone}
                                        />
                                        <Button sx={{
                                            width: "50%",
                                            backgroundColor: "#938eef",
                                            color: "white",
                                            fontWeight: "bold",
                                            cursor: "pointer",
                                            marginTop: '1rem',
                                            "&:hover": {
                                                backgroundColor: "rebeccapurple"
                                            }
                                        }}
                                            type="submit"
                                            variant="contained"
                                            disabled={isSubmitting}>
                                            Signup
                                        </Button>
                                    </Form>
                                )}
                            </Formik>
                        </Box>
                        <Box flex={1} sx={{
                            background: `linear-gradient(rgba(39, 11, 96, 0.5), rgba(39, 11, 96, 0.5)),  url(${"https://dcblog.b-cdn.net/wp-content/uploads/2021/01/how-to-engage-students-online-1024x575.jpg"}), center`,
                            backgroundSize: "cover",
                            height: "70vh",
                            padding: "3rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: '1.5rem',
                            color: "white"
                        }}>
                            <Typography fontWeight={500} variant='h2' lineHeight={1} >
                                Lorem Ipsum
                            </Typography>
                            <Typography variant='p' >
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            </Typography>
                            <Typography variant='span' fontSize={14} >
                                Do you have an account ?
                            </Typography>
                            <Link to="/login">
                                <Button sx={{
                                    width: "50%",
                                    backgroundColor: "white",
                                    color: "rebeccapurple",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                    textDecoration: "none",
                                    "&:hover": {
                                        backgroundColor: "white"
                                    }
                                }}
                                    variant="contained">
                                    Login
                                </Button>
                            </Link>
                            <Toaster />
                        </Box>
                    </Stack>
                </Card>
            </Grid>
        </Grid>
    );
};

export default Signup
