import React from 'react';
import { Typography, Button } from '@mui/material';


function Profile() {


  return (
    <div>
      <Typography variant="h5" align="center" gutterBottom>
        Welcome to your Profile
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
       
      </Typography>
      <Button variant="contained" color="primary">
        Edit Profile
      </Button>
      {/* Add more content or components as needed */}
    </div>
  );
}

export default Profile;
