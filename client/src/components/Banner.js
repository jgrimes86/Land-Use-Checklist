import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { AppBar, Box, IconButton, Menu, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import NavBar from "./Navbar";

function Banner({user, handleLogout}) {
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
        if (location.pathname === `/users/${params.id}`) {
            return "Home"
        } else if (location.pathname === `/users/${params.id}/account`) {
            return "Account"
        } 
        else if (location.pathname === `/projects/${params.id}`) {
            return "Project"
        } else if (location.pathname === `/projects/${params.id}/edit`) {
            return "Project"
        } else return null;
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
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
                        <NavBar user={user} handleLogout={handleLogout} />
                    </Menu>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {bannerText()}
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Banner