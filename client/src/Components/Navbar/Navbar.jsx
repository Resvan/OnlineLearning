import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';
import Mail from "@mui/icons-material/Mail";
import Notification from '@mui/icons-material/Notifications';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setLogout, setMode, } from '../../state';
import { Button } from '@mui/material';





const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
});



const Icons = styled(Box)(({ theme }) => ({
    display: "none",
    gap: "2rem",
    alignItems: "center",
    [theme.breakpoints.up("md")]: {
        display: "flex"
    }
}));

const MobileIcons = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    [theme.breakpoints.up("md")]: {
        display: "none"
    }
}));



const Navbar = () => {
    const [open, setOpen] = useState(false);
   
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const navigate = useNavigate()



    return (
        <AppBar sx={{ backgroundColor: "rgba(39, 11, 96, 0.5)" }} position='sticky' >
            <StyledToolbar>
                <Typography variant='h6' sx={{ display: { xs: "none", md: "block" } }}>
                    Online Learning
                </Typography>
                <Icons>
                <Button  onClick={()=>navigate('/admin')}>
                    Admin
                </Button>
                    <DarkModeIcon onClick={() => dispatch(setMode())} color='white' />
                    <Avatar sx={{ width: 30, height: 30 }} src={user?.profilePic} onClick={e => setOpen(true)} />
                </Icons>
            </StyledToolbar>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                open={open}
                onClose={e => setOpen(false)}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={() => dispatch(setLogout())} >Logout</MenuItem>
            </Menu>
        </AppBar>
    );
};

export default Navbar;
