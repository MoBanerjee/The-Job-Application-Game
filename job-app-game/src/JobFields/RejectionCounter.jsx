// RejectionCounter.jsx
import React, { useState, useEffect } from 'react';
import SuccessMessage from '../components/SuccessMessage';

const RejectionCounter = ({ number = 1 }) => {
  const [count, setCount] = useState('');
  const [visibleRules, setVisibleRules] = useState(1);
  const [yearsExp, setYearsExp] = useState('');
  const [connections, setConnections] = useState('');
  
  const [rulesPassed, setRulesPassed] = useState({
    doubleExp: false,
    underConnections: false,
    painfullyFunny: false
  });

  // Validate all rules
  const validateCount = (value, exp, conn) => {
    const numValue = parseInt(value);
    const numExp = parseInt(exp);
    const numConn = parseInt(conn);

    // Rule 1: Double experience
    const isDoubleExp = numValue && numExp && numValue >= (numExp * 2);
    
    // Rule 2: Less than connections
    const isUnderConnections = numValue && numConn && numValue < numConn;
    
    // Rule 3: Painfully funny (divisible by 404 or ends in 99)
    const isPainfullyFunny = numValue && (numValue % 404 === 0 || numValue % 100 === 99);

    setRulesPassed({
      doubleExp: isDoubleExp,
      underConnections: isUnderConnections,
      painfullyFunny: isPainfullyFunny
    });

    // Update visible rules based on which ones are passed
    if (!isDoubleExp) {
      setVisibleRules(1);
    } else if (!isUnderConnections) {
      setVisibleRules(2);
    } else if (!isPainfullyFunny) {
      setVisibleRules(3);
    }
  };

  useEffect(() => {
    validateCount(count, yearsExp, connections);
  }, [count, yearsExp, connections]);

  const handleCountChange = (e) => {
    const value = e.target.value;
    if (!value || (Number(value) >= 0 && Number(value) <= 9999)) {
      setCount(value);
    }
  };

  const handleExpChange = (e) => {
    const value = e.target.value;
    if (!value || (Number(value) >= 0 && Number(value) <= 99)) {
      setYearsExp(value);
    }
  };

  const handleConnectionsChange = (e) => {
    const value = e.target.value;
    if (!value || (Number(value) >= 0 && Number(value) <= 9999)) {
      setConnections(value);
    }
  };

  const getEncouragement = () => {
    if (!count) return "Go ahead, we don't judge here...";
    if (count < 10) return "That's... suspiciously low. Are you counting correctly?";
    if (count < 50) return "Oh, you sweet summer child...";
    if (count < 100) return "Now we're getting to realistic numbers!";
    return "Ah, a seasoned veteran of the application wars!";
  };

  return (
    <div className="field-container" style={{ marginBottom: "20px" }}>
      <label style={{ display: "block", marginBottom: "16px", fontWeight: "500" }}>
        {number}. The Rejection Collection™
      </label>

      <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
        <div>
          <label style={{ fontSize: "0.9em", color: "#666" }}>Years of Experience:</label>
          <input
            type="number"
            value={yearsExp}
            onChange={handleExpChange}
            placeholder="Be honest..."
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
          <label style={{ fontSize: "0.9em", color: "#666" }}>LinkedIn Connections:</label>
          <input
            type="number"
            value={connections}
            onChange={handleConnectionsChange}
            placeholder="Including bots"
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
          <label style={{ fontSize: "0.9em", color: "#666" }}>Rejection Count:</label>
          <input
            type="number"
            value={count}
            onChange={handleCountChange}
            placeholder="It's okay, we've all been there"
            style={{
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              width: "150px",
              display: "block",
              marginTop: "4px"
            }}
          />
        </div>
      </div>

      {/* Rules display */}
      <div style={{ marginTop: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
          <span style={{ 
            color: rulesPassed.doubleExp ? "#22c55e" : "#ef4444",
            fontSize: "1.2em"
          }}>
            {rulesPassed.doubleExp ? "✓" : "✗"}
          </span>
          <span> at least double your experience (we all start somewhere)</span>
        </div>

        {visibleRules >= 2 && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span style={{ 
              color: rulesPassed.underConnections ? "#22c55e" : "#ef4444",
              fontSize: "1.2em"
            }}>
              {rulesPassed.underConnections ? "✓" : "✗"}
            </span>
            <span>Number of rejections must be less than your LinkedIn connections (stay optimistic!)</span>
          </div>
        )}

        {visibleRules >= 3 && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ 
              color: rulesPassed.painfullyFunny ? "#22c55e" : "#ef4444",
              fontSize: "1.2em"
            }}>
              {rulesPassed.painfullyFunny ? "✓" : "✗"}
            </span>
            <span>Number of rejections must be divisible by 404 or end in 99 (because job searching is ERROR_FUNNY)</span>
          </div>
        )}
      </div>

      {/* Dynamic encouragement message */}
      <div style={{ 
        marginTop: "12px",
        fontSize: "0.9em",
        color: "#666",
        fontStyle: "italic"
      }}>
        {getEncouragement()}
      </div>

      {/* Success message when all rules are passed */}
      {rulesPassed.doubleExp && rulesPassed.underConnections && rulesPassed.painfullyFunny && (
        <SuccessMessage 
          message="Congratulations! Your rejection count is perfectly tragic!" 
          emoji="🎉"
        />
      )}

      {/* Footer message */}
      <div style={{ 
        marginTop: "12px",
        fontSize: "0.875em",
        color: "#666",
        fontStyle: "italic"
      }}>
        Remember: Every rejection is just a redirection to better opportunities! 
        (At least that's what we tell ourselves)
      </div>
    </div>
  );
};

export default RejectionCounter;