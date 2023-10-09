import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import useMediaQuery from '@mui/material/useMediaQuery'; // Import useMediaQuery

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isMobile = useMediaQuery('(max-width:800px)'); // Check if the screen size is mobile

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex',  }}>
      <img
          src="\logo512.png"
          alt="Your Logo"
          style={{ width: '45px', height: 'auto' }} // Adjust the width and height as needed
        />
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }} style={{ textDecoration: 'none', color: 'orange' }}>
          ars
        </Typography>
        {/* Conditionally render links based on the screen size */}
        {!isMobile && (
          <>
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
              <Typography variant="h6" component="div" sx={{ mr: 2 }}>
                Home
              </Typography>
            </Link>
            <Link to="/auth/login" style={{ textDecoration: 'none', color: 'white' }}>
              <Typography variant="h6" component="div" sx={{ mr: 2 }}>
                Login
              </Typography>
            </Link>
            <Link to="/userprofile" style={{ textDecoration: 'none', color: 'white' }}>
              <Typography variant="h6" component="div" sx={{ mr: 2 }}>
                Profile
              </Typography>
            </Link>
            <Link to="/cart" style={{ textDecoration: 'none', color: 'white' }}>
              <Typography variant="h6" component="div" sx={{ mr: 2 }}>
                Cart
              </Typography>
            </Link>
          </>
        )}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ display: { xs: 'block', md: 'none' } }}
          onClick={handleMenuClick}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
            Home
          </Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link to="/auth/login" style={{ textDecoration: 'none', color: 'black' }}>
            Login
          </Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link to="/userprofile" style={{ textDecoration: 'none', color: 'black' }}>
            Profile
          </Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link to="/cart" style={{ textDecoration: 'none', color: 'black' }}>
            Cart
          </Link>
        </MenuItem>
      </Menu>
    </AppBar>
  );
}

export default Navbar;
