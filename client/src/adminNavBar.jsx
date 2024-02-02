import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
//import Login from './components/Login';
//import Upload from './components/UploadFile';

export default function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
        <Button color="inherit" component={Link} to="/upload">
          Upload
        </Button>
        <Button color="inherit" component={Link} to="/">
          Logout
        </Button>
        <Button color="inherit" component={Link} to="/dashboard">
          Dashboard
        </Button>
        <Button color="inherit" component={Link} to="/view">
          ViewData
        </Button>
      </Toolbar>
    </AppBar>
  );
}
