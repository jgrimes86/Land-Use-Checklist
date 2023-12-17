import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { AppBar, Box, Card, CardMedia, IconButton, Menu, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';

import NavBar from "./Navbar";
import TheLandUseChecklist from "../images/TheLandUseChecklist.png"

function Banner({user, handleLogout, setProject}) {
    const location = useLocation();
    const params = useParams();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const bannerText = () => {
        if (location.pathname === `/home`) {
            return "Home"
        } else if (location.pathname === `/account`) {
            return "Account"
        } 
        else if (location.pathname === `/projects/${params.id}`) {
            return "Project"
        } else if (location.pathname === `/projects/${params.id}/edit`) {
            return "Project"
        } else return null;
    }

    const bannerContent = user && (location.pathname !== '/login') ? 
        <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu-button"
                sx={{ mr: 2 }}
                aria-controls={open ? 'nav-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <MenuIcon />
            </IconButton>
            <Menu
                id="nav-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': "menu-button"
                }}
            >
                <NavBar user={user} handleLogout={handleLogout} handleClose={handleClose} setProject={setProject}/>
            </Menu>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {bannerText()}
            </Typography>
            <IconButton>
                <CheckBoxOutlinedIcon sx={{color: "white"}}/>
            </IconButton>
        </Toolbar>
        :
        <Card>
            <CardMedia
                component="img"
                image={TheLandUseChecklist}
                alt="The Land Use Checklist"
                sx={{
                    height: 150,
                    objectFit: 'contain',
                    backgroundColor: '#2B2D42'
                }}
            />
        </Card>

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                {bannerContent}
            </AppBar>
        </Box>
    );
}

export default Banner