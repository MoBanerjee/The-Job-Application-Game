import React, { useState, useEffect } from 'react';

const RhymingTeamwork = ({ number, onValidation, onChange, value = '' }) => {
  const [isValid, setIsValid] = useState(false);

  const validateField = (input) => {
    // Word count validation
    const wordCount = getCleanWordCount(input);
    const hasEnoughWords = wordCount >= 50;

    // Rhyming validation
    let rhymesValid = false;
    if (input.trim()) {
      const sentences = input
        .split(/[.!?]\s+/)
        .map(s => s.trim())
        .filter(s => s.length > 0);

      const lastWords = sentences.map(sentence => {
        const words = sentence.split(/\s+/);
        const lastWord = words[words.length - 1];
        return lastWord ? lastWord.replace(/[^a-zA-Z]/g, '').toLowerCase() : '';
      }).filter(word => word.length > 0);

      if (lastWords.length >= 2) {
        const commonEnding = lastWords[0].slice(-3);
        rhymesValid = lastWords.every(word => word.endsWith(commonEnding));
      }
    }

    // Combined validation
    const isValidInput = hasEnoughWords && rhymesValid;
    setIsValid(isValidInput);

    // Always call onValidation with current state
    if (onValidation) {
      console.log(onValidation)
      onValidation(isValidInput);
    }
  };

  // Validate whenever value changes
  useEffect(() => {
    validateField(value);
  }, [value]);

  const getCleanWordCount = (text) => {
    const cleanedText = text.replace(/[^\w\s]/g, "");
    return cleanedText.trim().split(/\s+/).filter((word) => word.length > 0).length;
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="field-container" style={{ marginBottom: "20px" }}>
      <label style={{ display: "block", marginBottom: "8px"}}>
        {number}. In 50 words, tell us why teamwork is important. The last word of every sentence must rhyme.
      </label>
      <textarea
        value={value}
        onChange={handleChange}
        placeholder="Write at least 50 words. The last words of every sentence must rhyme."
        style={{
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          width: "100%",
          minHeight: "200px",
          resize: "vertical",
        }}
      />
      
      <div style={{ marginTop: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
          <span style={{ 
            color: getCleanWordCount(value) >= 50 ? "#22c55e" : "#ef4444",
            fontSize: "1.2em"
          }}>
            {getCleanWordCount(value) >= 50 ? "✓" : "✗"}
          </span>
          <span>At least 50 words ({getCleanWordCount(value)} / 50)</span>
        </div>
        
        <div style={{ display: "flex", alignItems: "center", gap: "8px"}}>
          <span style={{ 
            color: isValid ? "#22c55e" : "#ef4444",
            fontSize: "1.2em"
          }}>
            {isValid ? "✓" : "✗"}
          </span>
          <span>Sentences rhyme</span>
        </div>
      </div>
    </div>
  );
};

export default RhymingTeamwork;