// RejectionCounter.jsx
import React, { useState, useEffect } from 'react';
import SuccessMessage from '../components/SuccessMessage';

const AboutYourselfNoI = ({ number = 2, onValidation}) => {
  const [inputValue, setInputValue] = useState("");
  const [valid, setValid] = useState(false);
  const [visibleRules, setVisibleRules] = useState(1);

    useEffect(() => {
      onValidation(valid);
    }, [valid]);

  const [rulesPassed, setRulesPassed] = useState({
    noI: true,
    exactly200Chars: false,
    properSentences: false
  });

  useEffect(() => {
    onValidation(rulesPassed.noI && rulesPassed.exactly200Chars && rulesPassed.properSentences)
}, [rulesPassed]);

const getCharCount = (text) => {
    return text.length;
  };
  const validateNoI = (val) => {!val.toLowerCase().includes('i')}
  const isValidSentence = (text) => {
    const content = text.trim();
    if (!content || !content.match(/[A-Z][^.!?]*[.!?]$/)) {
      return false
    }
  };

  const validateField = async (input) => {
    const charCount = getCharCount(input);
    const exactly200Chars = charCount == 200;
    const noI = validateNoI(input)
    const properSentences = isValidSentence(input)
    setRulesPassed((prev) => ({ ...prev, exactly200Chars: exactly200Chars }));
    if (! noI) {
      setVisibleRules(2);
      return;
    }
    if (!exactly200Chars) {
      setVisibleRules(1);
      return;
    }
    setRulesPassed((prev) => ({ ...prev, noI: noI }));
    if (! isValidSentence) {
        setVisibleRules(3);
        return;
    }
    setRulesPassed((prev) => ({
      ...prev,
      noI: noI,
      properSentences: properSentences,
    }));

    setValid(htmlValid && sentencesValid && hasEnoughWords);

  }

  useEffect(() => {
      if (inputValue) {
        validateField(inputValue);
      } else {
        setValid(false);
        setRulesPassed({
          wordCount: false,
          htmlValid: false,
          properSentences: false,
        });
        setVisibleRules(1);
      }
      console.log(rulesPassed)
    }, [inputValue]);
  


 
  return (
    <div className="field-container" style={{ marginBottom: "20px" }}>
      <label style={{ display: "block", marginBottom: "16px", fontWeight: "500" }}>
        {number}. Introduce Yourself
      </label>

      <textarea
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Do it"
        style={{
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          width: "100%",
          minHeight: "200px",
          resize: "vertical",
          fontFamily: "monospace",
        }}
      />

      <div style={{ marginTop: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
          <span
            style={{
              color: rulesPassed.exactly200Chars ? "#22c55e" : "#ef4444",
              fontSize: "1.2em",
            }}
          >
            {rulesPassed.exactly200Chars ? "✓" : "✗"}
          </span>
          <span>Exactly 200 characters (currently at {getCharCount(inputValue)})</span>
        </div>

        {visibleRules >= 1 && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span
              style={{
                color: rulesPassed.noI ? "#22c55e" : "#ef4444",
                fontSize: "1.2em",
              }}
            >
              {rulesPassed.noI ? "✓" : "✗"}
            </span>
            <span>Must not contain the letter I (because there is no "I" in "TEAM"!)</span>
          </div>
        )}

        {visibleRules >= 2 && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                color: rulesPassed.properSentences ? "#22c55e" : "#ef4444",
                fontSize: "1.2em",
              }}
            >
              {rulesPassed.properSentences ? "✓" : "✗"}
            </span>
            <span>Complete sentences (capitalize and punctuate, just like those follow-up emails you never got)</span>
          </div>
        )}
      </div>

      <div
        style={{
          marginTop: "12px",
          fontSize: "0.9em",
          color: "#666",
          fontStyle: "italic",
        }}
      >
      </div>

      {valid && <SuccessMessage message="You seem to be a good team player!" emoji="🎨" />}

      <div
        style={{
          marginTop: "12px",
          fontSize: "0.875em",
          color: "#666",
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
      </div>
    </div>
  );

};

export default AboutYourselfNoI;