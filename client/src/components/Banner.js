import React, { useState } from "react";
import { AppBar, Box, IconButton, Menu, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import NavBar from "./Navbar";

function Banner({user, handleLogout}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

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
                        Banner
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Banner