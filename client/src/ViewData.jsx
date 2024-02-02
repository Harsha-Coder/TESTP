import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import NavBar from './adminNavBar';
function Viewdata() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/viewdata')
      .then(response => setStudents(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const sortedStudents = [...students].sort((a, b) => a.ID - b.ID);

  return (
    <div>
        <NavBar/>
      <Typography variant="h5" align="center" gutterBottom>
        View Data Here
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Mail</TableCell>
              <TableCell>Mobile Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map(student => (
              <TableRow key={student.ID}>
                <TableCell>{student.ID}</TableCell>
                <TableCell>{student.Name}</TableCell>
                <TableCell>{student.mail}</TableCell>
                <TableCell>{student.mobilenumber}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Viewdata;
