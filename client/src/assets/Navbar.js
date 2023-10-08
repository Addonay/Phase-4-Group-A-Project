import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import useMediaQuery from '@mui/material/useMediaQuery';

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isMobile = useMediaQuery('(max-width:800px)');

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex' }}>
        <img
          src="\logo512.png"
          alt="Your Logo"
          style={{ width: '45px', height: 'auto' }}
        />
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }} style={{ textDecoration: 'none', color: 'orange' }}>
          Car Dealership App
        </Typography>
        {!isMobile && (
          <>
            <Link to="/reviews" style={{ textDecoration: 'none', color: 'white' }}>
              <Typography variant="h6" component="div" sx={{ mr: 2 }}>
                Reviews
              </Typography>
            </Link>
            <Link to="/ratings" style={{ textDecoration: 'none', color: 'white' }}>
              <Typography variant="h6" component="div" sx={{ mr: 2 }}>
                Ratings
              </Typography>
            </Link>
            <Link to="/inquiries" style={{ textDecoration: 'none', color: 'white' }}>
              <Typography variant="h6" component="div" sx={{ mr: 2 }}>
                Inquiries
              </Typography>
            </Link>
            <Link to="/notifications" style={{ textDecoration: 'none', color: 'white' }}>
              <Typography variant="h6" component="div" sx={{ mr: 2 }}>
                Notifications
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
          <Link to="/reviews" style={{ textDecoration: 'none', color: 'black' }}>
            Reviews
          </Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link to="/ratings" style={{ textDecoration: 'none', color: 'black' }}>
            Ratings
          </Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link to="/inquiries" style={{ textDecoration: 'none', color: 'black' }}>
            Inquiries
          </Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link to="/notifications" style={{ textDecoration: 'none', color: 'black' }}>
            Notifications
          </Link>
        </MenuItem>
      </Menu>
    </AppBar>
  );
}

export default Navbar