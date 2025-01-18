import React, { useState, useRef } from "react";
import axios from 'axios';
import '../styles.css'; // Import the CSS file

const Resume = () => {
  const [selectedDocs, setSelectedDocs] = useState(null);
  const [feedbackText, setFeedbackText] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef();

  const allowDrag = (event) => {
    event.preventDefault();
  };

  const handleFileDrop = (event) => {
    event.preventDefault();
    setSelectedDocs(event.dataTransfer.files);
  };

  const initiateUpload = async () => {
    setIsProcessing(true);
    const uploadPayload = new FormData();
    Array.from(selectedDocs).forEach((doc) => {
      uploadPayload.append("Files", doc);
    });
    uploadPayload.append("nameEmp", "Resume");
    try {
      const serverResponse = await axios.post("http://localhost:5000/api/upload", uploadPayload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Upload response:', serverResponse.data);
      if (serverResponse.data && serverResponse.data.roast) {
        setFeedbackText(serverResponse.data.roast);
      }
    } catch (err) {
      console.error('Error uploading files:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isProcessing) {
    return (
      <div className="container">
        <div className="item-container">
          <div className="custom-loader"></div>
        </div>
      </div>
    );
  }

  if (feedbackText) {
    return (
      <div className="container">
        <div className="item-container">
          <h2>yuck, that's a resume??</h2>
          <p>{feedbackText}</p>

        </div>
      </div>
    );
  }

  return (
    <div className="container" onDragOver={allowDrag} onDrop={handleFileDrop}>
      <div className="item-container dropzone">
        <h1>Step 6: Resume</h1>
        <input 
          type="file"
          multiple
          onChange={(event) => setSelectedDocs(event.target.files)}
          hidden
          accept="application/pdf, image/png, image/jpeg"
          ref={fileInputRef}
        />
        <button onClick={() => fileInputRef.current.click()}>
          Select Files
        </button>
        {selectedDocs && (
          <div className="actions">
            <button onClick={() => setSelectedDocs(null)}>
              Cancel
            </button>
            <button onClick={initiateUpload}>
              Upload
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resume;
