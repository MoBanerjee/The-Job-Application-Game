import React, { useState, useEffect } from 'react';

const SalaryValidator = ({ number }) => {
  const [salary, setSalary] = useState('');
  const [visibleRules, setVisibleRules] = useState(1); // Start with only first rule visible
  
  // Track which rules are passed
  const [rulesPassed, setRulesPassed] = useState({
    fiveDigits: false,
    firstLastMatch: false,
    middleSum: false
  });

  const validateSalary = (value) => {
    // Rule 1: Must be exactly 5 digits
    const isFiveDigits = /^\d{5}$/.test(value);
    
    // Rule 2: First digit equals last digit
    const firstLastMatch = value.length === 5 && value[0] === value[4];
    
    // Rule 3: Middle three digits sum to first digit × 3
    const middleSum = value.length === 5 && 
      (parseInt(value[1]) + parseInt(value[2]) + parseInt(value[3])) === 
      (parseInt(value[0]) * 3);

    // Update which rules are passed
    setRulesPassed({
      fiveDigits: isFiveDigits,
      firstLastMatch: firstLastMatch,
      middleSum: middleSum
    });

    // Update visible rules based on which rules are passed
    if (!isFiveDigits) {
      setVisibleRules(1);
    } else if (!firstLastMatch) {
      setVisibleRules(2);
    } else if (!middleSum) {
      setVisibleRules(3);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    // Only allow numbers
    if (/^\d*$/.test(value) && value.length <= 5) {
      setSalary(value);
      validateSalary(value);
    }
  };

  return (
    <div className="field-container" style={{ marginBottom: "20px" }}>
      <label style={{ display: "block", marginBottom: "8px" }}>
        {number}. Enter your expected salary:
      </label>
      <input
        type="text"
        value={salary}
        onChange={handleChange}
        placeholder="Enter salary"
        style={{
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          width: "200px",
          fontSize: "16px"
        }}
      />
      
      {/* Progressive requirements display */}
      <div style={{ marginTop: "12px" }}>
        {/* Rule 1 - Always visible */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
          <span style={{ 
            color: rulesPassed.fiveDigits ? "#22c55e" : "#ef4444",
            fontSize: "1.2em"
          }}>
            {rulesPassed.fiveDigits ? "✓" : "✗"}
          </span>
          <span>Must be 5 digits</span>
        </div>

        {/* Rule 2 - Only visible after Rule 1 is passed */}
        {visibleRules >= 2 && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span style={{ 
              color: rulesPassed.firstLastMatch ? "#22c55e" : "#ef4444",
              fontSize: "1.2em"
            }}>
              {rulesPassed.firstLastMatch ? "✓" : "✗"}
            </span>
            <span>First digit must equal last digit</span>
          </div>
        )}

        {/* Rule 3 - Only visible after Rule 2 is passed */}
        {visibleRules >= 3 && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span style={{ 
              color: rulesPassed.middleSum ? "#22c55e" : "#ef4444",
              fontSize: "1.2em"
            }}>
              {rulesPassed.middleSum ? "✓" : "✗"}
            </span>
            <span>Middle three digits must sum to first digit × 3</span>
          </div>
        )}
      </div>

      {/* Success message when all rules are passed */}
      {rulesPassed.fiveDigits && rulesPassed.firstLastMatch && rulesPassed.middleSum && (
        <div style={{ 
          marginTop: "12px",
          padding: "8px",
          backgroundColor: "#22c55e1a",
          color: "#22c55e",
          borderRadius: "4px"
        }}>
          Your salary expectation is valid.
        </div>
      )}
    </div>
  );
};

SalaryValidator.defaultProps = {
  number: 1
};

export default SalaryValidator;