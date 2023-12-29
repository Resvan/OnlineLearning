import { useSelector } from "react-redux";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Box, createTheme, ThemeProvider } from '@mui/material';
import Navbar from "./Components/Navbar/Navbar";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Home from "./Pages/Home/Home";
import AddCourseForm from "./Pages/AddCourse/AddCourse";
import AddLevels from "./Pages/AddLevels/AddLevels";
import AdminHome from "./Pages/Admin/Admin";
import EnrolledList from "./Pages/EnrolledList/EnrolledList";
import CourseCard from "./Pages/Course/Course";
import CourseDetails from "./Pages/Course/Course";
import CourseLevel from "./Pages/Level/Level";
import LeadersBoard from "./Pages/LeadersBoard/LeadersBoard";

function App() {
  const currentUser = useSelector((state) => Boolean(state.token));

  const mode = useSelector((state) => state.mode);

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  const Layout = () => {
    return (
      <>
        <ThemeProvider theme={darkTheme}>
          <Box bgcolor={'background.default'} color={'text.primary'}>
            <Navbar />
            <Outlet />
          </Box>
        </ThemeProvider>
      </>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };



  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/add-course" element={<AddCourseForm />} />
        <Route path="/add-levels" element={<AddLevels />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/:id" element={<EnrolledList />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/level/:id" element={<CourseLevel />} />
        <Route path="/leaders-board/:id" element={<LeadersBoard />} />
       
      </Route>
      <Route
        path="/login"
        element={currentUser ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/signup"
        element={currentUser ? <Navigate to="/" /> : <Signup />}
      />
    </Routes>
  );
}

export default App;
