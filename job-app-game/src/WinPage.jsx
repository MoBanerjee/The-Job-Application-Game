import React, { useState } from 'react';

const WinPage = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "20px",
    }}
    >
      <h1>🎉 Congratulations! 🎉</h1>
      <h2>Good job on successfully submitting your job application.</h2>
      <h2>Unfortunately there were so many talented candidates so we had to reject you.</h2>
      <h2>We wish you the best of luck on your future endeavors.</h2>
    </div>
  )
};

export default WinPage;