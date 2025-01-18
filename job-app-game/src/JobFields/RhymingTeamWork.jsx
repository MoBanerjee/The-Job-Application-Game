import React, { useState, useEffect } from "react";

const RhymingTeamwork = ({ number, question, errMsg, wordCountErrMsg }) => {
  const [inputValue, setInputValue] = useState("");
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (inputValue) {
      validateField(inputValue);
    } else {
      setValid(false);
    }
  }, [inputValue]);

  const validateField = async (input) => {
    setLoading(true);

    // If no input, everything is false
    if (!input.trim()) {
      setValid(false);
      setLoading(false);
      return;
    }

    // Split into sentences but handle consecutive periods properly
    const sentences = input
      .split(/[.!?]\s+/) // Split on punctuation followed by whitespace
      .map(s => s.trim())
      .filter(s => s.length > 0);

    // Get last word of each sentence and clean them up
    const lastWords = sentences.map(sentence => {
      const words = sentence.split(/\s+/);
      const lastWord = words[words.length - 1];
      // Remove any punctuation and convert to lowercase
      return lastWord ? lastWord.replace(/[^a-zA-Z]/g, '').toLowerCase() : '';
    }).filter(word => word.length > 0);

    // Check rhyming - all words should end in 'ate' in your example
    let rhymesValid = true;
    
    // Only check rhyming if we have at least 2 words
    if (lastWords.length >= 2) {
      const commonEnding = lastWords[0].slice(-3);
      rhymesValid = lastWords.every(word => word.endsWith(commonEnding));
    } else {
      rhymesValid = false;
    }

    console.log("Last words:", lastWords);
    console.log("Rhymes valid:", rhymesValid);

    setValid(rhymesValid);
    setLoading(false);
  };

  const checkRhyming = async (word1, word2) => {
    try {
      // Clean the words
      word1 = word1.toLowerCase().trim();
      word2 = word2.toLowerCase().trim();

      // If the words are the same, they rhyme
      if (word1 === word2) return true;

      // Common rhyming patterns in English
      const rhymePatterns = {
        'ate': ['ate', 'eight', 'eit', 'ete'],
        'eat': ['eat', 'eet', 'ete'],
        'ite': ['ite', 'ight', 'yte'],
        'ate': ['ate', 'ait', 'eight'],
        'ain': ['ain', 'ane', 'eign'],
        'igh': ['igh', 'ie', 'y', 'i'],
        'ound': ['ound', 'owned'],
        'own': ['own', 'one'],
        'ome': ['ome', 'oam'],
        'ool': ['ool', 'ule'],
        'er': ['er', 'or', 'ar'],
        'ation': ['ation', 'asian']
      };

      // Check for common rhyming patterns
      for (const [base, variations] of Object.entries(rhymePatterns)) {
        if (variations.some(v => word1.endsWith(v)) && 
            variations.some(v => word2.endsWith(v))) {
          return true;
        }
      }

      // Check for exact ending matches (3 or more characters)
      for (let i = 3; i <= Math.min(word1.length, word2.length); i++) {
        if (word1.slice(-i) === word2.slice(-i)) {
          return true;
        }
      }

      // Use Datamuse API as backup
      const response = await fetch(
        `https://api.datamuse.com/words?rel_rhy=${encodeURIComponent(word1)}&max=100`
      );
      const data = await response.json();
      const rhymes = data.map((item) => item.word.toLowerCase().trim());

      if (rhymes.includes(word2)) {
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error validating rhymes:", error);
      // If API fails, fall back to ending comparison
      return word1.slice(-3) === word2.slice(-3);
    }
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };

  const getCleanWordCount = (text) => {
    const cleanedText = text.replace(/[^\w\s]/g, "");
    return cleanedText.trim().split(/\s+/).filter((word) => word.length > 0).length;
  };

  return (
    <div className="field-container" style={{ marginBottom: "20px" }}>
      <label
        htmlFor={`rhyming-teamwork-${number}`}
        style={{ display: "block", marginBottom: "8px" }}
      >
        {number}. {question}
      </label>
      <textarea
        id={`rhyming-teamwork-${number}`}
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Write at least 50 words. The last words of every two consecutive sentences must rhyme."
        style={{
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          width: "100%",
          minHeight: "200px",
          resize: "vertical",
        }}
      />
      
      {/* Requirements checklist */}
      <div style={{ marginTop: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
          <span style={{ 
            color: getCleanWordCount(inputValue) >= 50 ? "#22c55e" : "#ef4444",
            fontSize: "1.2em"
          }}>
            {getCleanWordCount(inputValue) >= 50 ? "✓" : "✗"}
          </span>
          <span>At least 50 words ({getCleanWordCount(inputValue)} / 50)</span>
        </div>
        
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {loading ? (
            <span style={{ color: "#3b82f6" }}>⟳</span>
          ) : (
            <span style={{ 
              color: valid ? "#22c55e" : "#ef4444",
              fontSize: "1.2em"
            }}>
              {valid ? "✓" : "✗"}
            </span>
          )}
          <span>Sentences rhyme</span>
        </div>
      </div>
    </div>
  );
};

RhymingTeamwork.defaultProps = {
  number: 1,
  question:
    "In 50 words, describe what teamwork means to you. The last word of every sentence must rhyme.",
  errMsg:
    "The last word of every two consecutive sentences does not rhyme. Please try again!",
  wordCountErrMsg: "You must write at least 50 words. Please try again!",
};

export default RhymingTeamwork;