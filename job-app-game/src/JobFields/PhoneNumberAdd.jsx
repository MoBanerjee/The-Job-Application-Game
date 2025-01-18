import React, { useState, useEffect } from 'react';

const PhoneNumberAdd = ({ number, onValidation }) => {
  // Generate a feasible random target sum (between 20 and 40 for 8 digits)
  const [targetSum] = useState(() => Math.floor(Math.random() * 21) + 20);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [currentSum, setCurrentSum] = useState(0);

  useEffect(() => {
    // Calculate sum of digits
    const sum = phoneNumber
      .split('')
      .map(Number)
      .reduce((acc, curr) => acc + curr, 0);
    
    setCurrentSum(sum);
    
    // Validate phone number format and sum
    setIsValid(
      phoneNumber.length === 8 && 
      /^\d{8}$/.test(phoneNumber) && 
      sum === targetSum
    );
  }, [phoneNumber, targetSum]);

  const handleChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and limit to 8 digits
    if (/^\d*$/.test(value) && value.length <= 8) {
      setPhoneNumber(value);
    }
  };

  useEffect(() => {
    onValidation(isValid);
  }, [isValid]);

  return (
    <div className="field-container" style={{ marginBottom: "20px" }}>
      <label style={{ display: "block", marginBottom: "8px" }}>
        {number}. Enter an 8-digit phone number where digits sum to {targetSum}
      </label>
      <div>
        <input
          type="text"
          value={phoneNumber}
          onChange={handleChange}
          placeholder="Enter 8 digits"
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            width: "200px",
            fontSize: "16px"
          }}
        />
        
        {/* Validation display */}
        <div style={{ marginTop: "12px" }}>
          {/* Length check */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span style={{ 
              color: phoneNumber.length === 8 ? "#22c55e" : "#ef4444",
              fontSize: "1.2em"
            }}>
              {phoneNumber.length === 8 ? "✓" : "✗"}
            </span>
            <span>8 digits ({phoneNumber.length} / 8)</span>
          </div>
          
          {/* Sum check */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ 
              color: currentSum === targetSum ? "#22c55e" : "#ef4444",
              fontSize: "1.2em"
            }}>
              {currentSum === targetSum ? "✓" : "✗"}
            </span>
            <span>Sum equals {targetSum} </span>
          </div>
        </div>

        

        {/* Helper text */}
        <div style={{ 
          marginTop: "8px",
          fontSize: "0.875em",
          color: "#666"
        }}>
        </div>
      </div>
    </div>
  );
};

PhoneNumberAdd.defaultProps = {
  number: 1
};

export default PhoneNumberAdd;