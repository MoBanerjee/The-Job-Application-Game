import React, { useState } from "react";

const SubmitButton = ({ isValid, setIsWin }) => {
    console.log("isValid:", isValid);  // Check the value of isValid
    console.log("setIsWin:", setIsWin);  // Check if setIsWin is a function
    const handleClick = () => {
    if (isValid) {
        alert("Application is not valid yet. Try again!");
    }
    else {
        console.log(setIsWin)
        console.log(isValid)
        setIsWin(true);
    }
    
    };

    return (
        <button
        onClick={handleClick}
        disabled={isValid}
        style={{
            padding: "10px 20px",
            backgroundColor: isValid ? (isHovered ? "#ff6347" : "#4CAF50") : "#ddd",
            color: isValid ? "white" : "gray",
            border: "none",
            borderRadius: "5px",
            cursor: isValid ? "pointer" : "not-allowed",
            transition: "background-color 0.3s ease",
        }}
        >Submit Application</button>
    );
};

export default SubmitButton;
