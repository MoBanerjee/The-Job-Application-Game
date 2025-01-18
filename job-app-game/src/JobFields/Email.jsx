import React, { useState, useEffect } from 'react';

const Email = ({ onValidation, onChange, value }) => {
  const [isValid, setIsValid] = useState(false);

  const validateEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid = emailRegex.test(input);
    setIsValid(valid);
    if (onValidation) {
      onValidation(valid);
    }
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (onChange) {
      onChange(newValue);
    }
    validateEmail(newValue);
  };

  // Validate initial value if provided
  useEffect(() => {
    if (value) {
      validateEmail(value);
    }
  }, []);

  return (
    <div style={{ marginBottom: "20px" }}>
      <label style={{ 
        display: "block", 
        marginBottom: "8px",
        color: "#f8fafc"
      }}>
        Enter your email
      </label>
      <input
        type="email"
        value={value}
        onChange={handleChange}
        style={{
          padding: "8px",
          border: "1px solid #475569",
          borderRadius: "4px",
          width: "100%",
          backgroundColor: "#1e293b",
          color: "#f8fafc"
        }}
      />
      {isValid && (
        <div style={{ color: "#22c55e", marginTop: "4px" }}>Good job!</div>
      )}
    </div>
  );
};

export default Email;