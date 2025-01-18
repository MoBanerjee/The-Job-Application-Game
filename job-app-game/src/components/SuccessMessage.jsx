import React from 'react';

const SuccessMessage = ({ message, emoji = '✨' }) => {
  return (
    <div style={{ 
      marginTop: "12px",
      padding: "12px",
      backgroundColor: "#22c55e1a",
      color: "#22c55e",
      borderRadius: "4px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      fontSize: "1.1em"
    }}>
      <span>{message}</span>
      <span>{emoji}</span>
    </div>
  );
};

export default SuccessMessage;