import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // Import the cart icon
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
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'orange' }}>
            ars
          </Link>
        </Typography>
        {!isMobile && (
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            <Typography variant="h6" component="div" sx={{ mr: 2 }}>
              Home
            </Typography>
          </Link>
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
        <IconButton
          color="inherit"
          aria-label="cart"
          component={Link}
          to="/cart"
        >
          <ShoppingCartIcon />
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
      </Menu>
    </AppBar>
  );
}

export default Navbar;
