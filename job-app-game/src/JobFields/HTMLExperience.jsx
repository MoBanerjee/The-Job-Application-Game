import React, { useState, useEffect } from "react";

const HTMLExperience = ({ number, question, errMsg, wordCountErrMsg }) => {
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

  const getCleanWordCount = (text) => {
    // Remove HTML tags for word counting
    const cleanedText = text.replace(/<[^>]*>/g, "");
    return cleanedText.trim().split(/\s+/).filter((word) => word.length > 0).length;
  };

  const validateField = async (input) => {
    setLoading(true);

    // Basic content check
    if (!input.trim()) {
      setValid(false);
      setLoading(false);
      return;
    }

    // Split into separate HTML tag sections
    const sections = input.trim().split(/(?=<[\w-]+>)/);
    const validSections = sections.filter(section => section.trim().length > 0);

    // Validate each section
    let isValid = true;
    const allowedTags = ['div', 'p', 'span', 'article', 'section', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

    for (const section of validSections) {
      // Check if it's a valid HTML structure
      const tagMatch = section.match(/<(\w+)>(.*?)<\/\1>/s);
      if (!tagMatch) {
        console.warn("Invalid HTML structure:", section);
        isValid = false;
        break;
      }

      const [_, tagName, content] = tagMatch;

      // Check if it's an allowed tag
      if (!allowedTags.includes(tagName.toLowerCase())) {
        console.warn("Invalid tag:", tagName);
        isValid = false;
        break;
      }

      // Check if content is present
      if (!content.trim()) {
        console.warn("Empty content in tag:", tagName);
        isValid = false;
        break;
      }

      // Check if content is a complete sentence
      if (!content.trim().match(/[A-Z][^.!?]*[.!?]$/)) {
        console.warn("Content is not a proper sentence:", content);
        isValid = false;
        break;
      }
    }

    setValid(isValid);
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };

  return (
    <div className="field-container" style={{ marginBottom: "20px" }}>
      <label
        htmlFor={`html-experience-${number}`}
        style={{ display: "block", marginBottom: "8px" }}
      >
        {number}. {question}
      </label>
      <textarea
        id={`html-experience-${number}`}
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Write about your experience using HTML tags. Example: <div>I led a team of five developers.</div>"
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
          <span>Valid HTML tags and sentences</span>
        </div>
      </div>

      {/* Helper text */}
      <div style={{ marginTop: "8px", fontSize: "0.875em", color: "#666" }}>
        Allowed tags: div, p, span, article, section, h1-h6
      </div>
    </div>
  );
};

HTMLExperience.defaultProps = {
  number: 1,
  question:
    "In 50 words, describe your past experience. Each sentence must be wrapped in a valid HTML tag.",
  errMsg:
    "Please make sure each sentence is properly wrapped in HTML tags and is a complete sentence.",
  wordCountErrMsg: "You must write at least 50 words. Please try again!",
};

export default HTMLExperience;