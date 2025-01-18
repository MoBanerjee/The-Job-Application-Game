import React, { useState, useEffect } from "react";
import axios from "axios";

const PastExperienceReverse = ({ number, question, errMsg }) => {
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

    // Split the input into words
    const words = input.trim().split(/\s+/);

    // Validate each word starting with 'D'
    for (const word of words) {
      if (word[0]?.toLowerCase() === "d") {
        const reversedWord = word.split("").reverse().join("");
        const isValid = await isValidWord(reversedWord);
        if (!isValid) {
          setValid(false);
          setLoading(false);
          return;
        }
      }
    }

    // If all validations pass
    setValid(true);
    setLoading(false);
  };

  const isValidWord = async (word) => {
    try {
      const response = await axios.get(
        `https://api.datamuse.com/words?sp=${word}&max=1`
      );
      return response.data.length > 0; // Valid if the API returns at least one match
    } catch (error) {
      console.error("Error validating word:", error);
      return false; // Default to invalid if the API call fails
    }
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };

  return (
    <div className="field-container" style={{ marginBottom: "20px" }}>
      <label
        htmlFor={`past-experience-reverse-${number}`}
        style={{ display: "block", marginBottom: "8px" }}
      >
        {number}. {question}
      </label>
      <textarea
        id={`past-experience-reverse-${number}`}
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Reverse words starting with 'D' here..."
        style={{
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          width: "100%",
          resize: "vertical",
        }}
      />
      {loading && <p style={{ color: "blue", marginTop: "8px" }}>Validating...</p>}
      {inputValue && !valid && !loading && (
        <p style={{ color: "red", marginTop: "8px" }}>{errMsg}</p>
      )}
      {inputValue && valid && !loading && (
        <p style={{ color: "green", marginTop: "8px" }}>Valid!</p>
      )}
    </div>
  );
};

// Default props for the component
PastExperienceReverse.defaultProps = {
  number: 1,
  question:
    "Describe your past experience, but reverse only the words that start with 'D'.",
  errMsg: "Words starting with 'D' are not reversed correctly. Try again!",
};

export default PastExperienceReverse;
