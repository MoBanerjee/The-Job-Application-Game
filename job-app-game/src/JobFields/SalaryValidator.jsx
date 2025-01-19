import React, { useState, useEffect } from 'react';
import SuccessMessage from '../components/SuccessMessage';

const SalaryValidator = ({ number = 1, onValidation }) => {
  const [salary, setSalary] = useState('');
  const [overtime, setOvertime] = useState('');
  const [visibleRules, setVisibleRules] = useState(1);
  const [rulesPassed, setRulesPassed] = useState({
    fiveDigits: false,
    firstLastMatch: false,
    middleSum: false,
    containsLuckyNumber: false,
    overtimeBalance: false
  });

    useEffect(() => {
      onValidation(rulesPassed.fiveDigits && rulesPassed.firstLastMatch && rulesPassed.middleSum && rulesPassed.containsLuckyNumber && rulesPassed.overtimeBalance)
  }, [rulesPassed]);

  const validateInputs = () => {
    // Rule 1: Must be exactly 5 digits
    const isFiveDigits = /^\d{5}$/.test(salary);
    
    // Initialize other rule values
    let firstLastMatch = false;
    let middleSum = false;
    let containsLuckyNumber = false;
    let overtimeBalance = !overtime || overtime === 'sometimes';

    if (isFiveDigits) {
      // Rule 2: First and last digit match
      firstLastMatch = salary[0] === salary[4];

      // Rule 3: Middle digits sum
      const sumOfMiddle = parseInt(salary[1]) + parseInt(salary[2]) + parseInt(salary[3]);
      const targetSum = parseInt(salary[0]) * 3;
      middleSum = sumOfMiddle === targetSum;

      // Rule 4: Contains lucky number
      containsLuckyNumber = salary.includes('7') || salary.includes('8');
    }

    setRulesPassed({
      fiveDigits: isFiveDigits,
      firstLastMatch: firstLastMatch,
      middleSum: middleSum,
      containsLuckyNumber: containsLuckyNumber,
      overtimeBalance: overtimeBalance
    });

    // Update visible rules
    if (!isFiveDigits) setVisibleRules(1);
    else if (!firstLastMatch) setVisibleRules(2);
    else if (!middleSum) setVisibleRules(3);
    else if (!containsLuckyNumber) setVisibleRules(4);
    else setVisibleRules(5);
  };

  useEffect(() => {
    validateInputs();
  }, [salary, overtime]);

  const getSalaryComment = () => {
    if (!salary) return "Dream big! (But keep it realistic... sort of)";
    if (salary.length < 5) return "Is this your hourly rate? 😅";
    if (parseInt(salary) < 30000) return "Self-deprecation at its finest!";
    if (parseInt(salary) > 90000) return "Someone's been practicing their negotiation skills!";
    return "That's... actually quite reasonable (fix that!)";
  };

  return (
    <div className="field-container" style={{ marginBottom: "20px" }}>
      <label style={{ display: "block", marginBottom: "16px", fontWeight: "500" }}>
        {number}. What is your expected Salary?
      </label>
      <div  style={{ display: "flex", gap: "12px", marginBottom: "16px", justifyContent: "center" }}>
        <div>
          <label style={{ fontSize: "0.9em", color: "#666" }}>Expected Salary:</label>
          <input
            type="text"
            value={salary}
            onChange={(e) => setSalary(e.target.value.replace(/[^\d]/g, '').slice(0, 5))}
            placeholder="Be optimistic!"
            style={{
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              width: "120px",
              display: "block",
              marginTop: "4px"
            }}
          />
        </div>

        <div>
          <label style={{ fontSize: "0.9em", color: "#666" }}>Overtime Willingness:</label>
          <select
            value={overtime}
            onChange={(e) => setOvertime(e.target.value)}
            style={{
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              width: "150px",
              display: "block",
              marginTop: "4px"
            }}
          >
            <option value="">Select...</option>
            <option value="none">What's overtime?</option>
            <option value="sometimes">Only for emergencies</option>
            <option value="always">Sleep is for the weak</option>
          </select>
        </div>
      </div>

      <div style={{ marginTop: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
          <span style={{ color: rulesPassed.fiveDigits ? "#22c55e" : "#ef4444", fontSize: "1.2em" }}>
            {rulesPassed.fiveDigits ? "✓" : "✗"}
          </span>
          <span>Must be 5 digits (because 4 digits is so entry-level)</span>
        </div>

        {visibleRules >= 2 && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span style={{ color: rulesPassed.firstLastMatch ? "#22c55e" : "#ef4444", fontSize: "1.2em" }}>
              {rulesPassed.firstLastMatch ? "✓" : "✗"}
            </span>
            <span>First digit must equal last digit (for poetic symmetry)</span>
          </div>
        )}

        {visibleRules >= 3 && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span style={{ color: rulesPassed.middleSum ? "#22c55e" : "#ef4444", fontSize: "1.2em" }}>
              {rulesPassed.middleSum ? "✓" : "✗"}
            </span>
            <span>Middle digits must sum to first digit × 3 (because math impresses recruiters)</span>
          </div>
        )}

        {visibleRules >= 4 && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span style={{ color: rulesPassed.containsLuckyNumber ? "#22c55e" : "#ef4444", fontSize: "1.2em" }}>
              {rulesPassed.containsLuckyNumber ? "✓" : "✗"}
            </span>
            <span>Must contain at least one lucky number (7 or 8) for good fortune</span>
          </div>
        )}

        {visibleRules >= 5 && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ color: rulesPassed.overtimeBalance ? "#22c55e" : "#ef4444", fontSize: "1.2em" }}>
              {rulesPassed.overtimeBalance ? "✓" : "✗"}
            </span>
            <span>Your overtime preferences must be in moderation - we value work life balance (tilted a bit towards us) </span>
          </div>
        )}
      </div>

      <div style={{ marginTop: "12px", fontSize: "0.9em", color: "#666", fontStyle: "italic" }}>
        {getSalaryComment()}
      </div>

      {Object.values(rulesPassed).every(v => v) && (
        <SuccessMessage 
          message="Your salary expectations are as realistic as your dating standards!" 
          emoji="💸"
        />
      )}

      <div style={{ marginTop: "12px", fontSize: "0.875em", color: "#666", fontStyle: "italic" }}>
        Pro tip: Always add an extra digit when negotiating, just in case they mistake it for a typo and accept anyway!
      </div>
    </div>
  );
};

export default SalaryValidator;