import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Typography,
  Paper,
  Input,
  IconButton,
  Alert,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import NavBar from "./adminNavBar";
import "./Upload.css"; // Import your CSS file for additional styling

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select a file");
      return;
    }
    const formData = new FormData();
    formData.append("csvFile", selectedFile);
    try {
      await axios.post("http://localhost:5000/api/uploadcsv", formData);
      console.log("File uploaded successfully!");
      setUploadStatus("success");
      setShowAlert(true);
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("error");
      setShowAlert(true);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div>
      <NavBar />
      <Container maxWidth="md" className="upload-container">
        <Paper elevation={3} className="upload-paper">
          <Typography variant="h5" component="div" gutterBottom>
            Upload File
          </Typography>
          <form onSubmit={handleSubmit} className="upload-form">
            <Input
              type="file"
              id="fileInput"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              style={{ display: "none" }}
            />
            <label htmlFor="fileInput" className="file-input-label">
              <IconButton component="span">
                {uploadStatus === "success" ? (
                  <CloudDoneIcon />
                ) : (
                  <CloudUploadOutlinedIcon />
                )}
              </IconButton>
              {uploadStatus === "success" ? "File Uploaded" : "Choose File"}
            </label>
            {selectedFile && (
              <span className="selected-file">{selectedFile.name}</span>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<CloudUploadIcon />}
            >
              Upload
            </Button>
          </form>
          <Typography paragraph align="center">
            Upload Only CSV Files
          </Typography>
        </Paper>
        {showAlert && (
          <Alert
            severity={uploadStatus === "success" ? "success" : "error"}
            onClose={handleCloseAlert}
          >
            {uploadStatus === "success"
              ? "File uploaded successfully!"
              : "Error uploading file. Please try again."}
          </Alert>
        )}
      </Container>
    </div>
  );
}

export default Upload;
