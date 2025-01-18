import React, { useState, useEffect } from 'react';

const LongTextInputField = ({ number, question, validateFunc, errMsg, onValidation }) => {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    const valid = validateFunc(newValue);
    setIsValid(valid);
    // Call the parent's validation callback
    if (onValidation) {
      onValidation(valid);
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <label style={{ display: "block", marginBottom: "8px" }}>
        {number}. {question}
      </label>
      <textarea
        value={value}
        onChange={handleChange}
        style={{
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          width: "100%",
          minHeight: "100px",
        }}
      />
      {value && !isValid && (
        <div style={{ color: "#ef4444", marginTop: "4px" }}>{errMsg}</div>
      )}
      {isValid && (
        <div style={{ color: "#22c55e", marginTop: "4px" }}>Good job!</div>
      )}
    </div>
  );
};

export default LongTextInputField;