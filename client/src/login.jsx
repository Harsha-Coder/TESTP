import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, TextField, Typography } from '@mui/material';
import axios from 'axios';


function Login() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [showVerificationForm, setShowVerificationForm] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/sendotp', data);
      console.log('OTP Sent Successfully');
      // Assuming the server responds with a JWT token
      const { token } = response.data;
      localStorage.setItem('jwtToken', token); // Store the token in local storage
     // Set the authenticated user in the context
      setShowVerificationForm(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const data = {
      otp,
      email,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/verifyotp', data);
      console.log(response);

      if (response.data.success) {
        setMessage('OTP verification successful');
        // Handle successful OTP verification
        // Redirect to the profile page
        navigate('/dashboard');
      } else {
        setMessage('Incorrect OTP');
      }
    } catch (err) {
      console.log(err);
      setMessage('An error occurred during OTP verification');
    }
  };

  return (
    <Container maxWidth="sm" className="sendotp">
      <div className="form-control">
        {showVerificationForm ? (
          <>
            <form onSubmit={handleVerifyOtp}>
              <div style={{ marginBottom: '1rem' }}>
                <TextField
                  fullWidth
                  label="Enter Email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <TextField
                  fullWidth
                  label="Enter OTP"
                  variant="outlined"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>

              <div align="center">
                <Button variant="contained" color="primary" type="submit" style={{ marginTop: '1rem' }}>
                  Submit OTP
                </Button>
              </div>
            </form>

            <div className="mt-3" align="center">
              {message && (
                <p className={message.includes('successful') ? 'text-success' : 'text-danger'}>{message}</p>
              )}
            </div>
          </>
        ) : (
          <form onSubmit={handleSendOtp}>
            <div style={{ marginBottom: '1rem' }}>
              <TextField
                fullWidth
                label="Enter Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div align="center">
              <Button variant="contained" color="secondary" type="submit" style={{ marginTop: '1rem' }}>
                Send OTP
              </Button>
            </div>
          </form>
        )}
      </div>
    </Container>
  );
}

export default Login;
