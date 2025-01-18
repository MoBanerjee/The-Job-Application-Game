import React, { useState, useEffect } from "react";

const Email = ({ number = 1, onValidation, onChange, value }) => {
  const [inputValue, setInputValue] = useState(value || "");
  const [isValid, setIsValid] = useState(false);

  const validateEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid = emailRegex.test(input);
    setIsValid(valid);
    if (onValidation) {
      onValidation(valid);
    }
  };

  useEffect(() => {
    validateEmail(inputValue);
  }, [inputValue]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="field-container" style={{ marginBottom: "20px" }}>
      <label style={{ 
        display: "block", 
        marginBottom: "16px", 
        fontWeight: "500",
      }}>
        {number}. The Email Validation Experience™
      </label>

      <input
        type="email"
        value={inputValue}
        onChange={handleChange}
        placeholder="yourname@example.com"
        style={{
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          width: "100%",
          fontFamily: "monospace",
        }}
      />
      
      {inputValue && !isValid && (
        <div style={{ 
          marginTop: "8px", 
          fontSize: "0.875em" 
        }}>
          Please enter a valid email address
        </div>
      )}
    </div>
  );
};

export default Email;