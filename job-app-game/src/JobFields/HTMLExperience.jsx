import React, { useState, useEffect } from "react";
import SuccessMessage from '../components/SuccessMessage';

const HTMLExperience = ({ number = 4, onValidation }) => {
  const [inputValue, setInputValue] = useState("");
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visibleRules, setVisibleRules] = useState(1);

  useEffect(() => {
    onValidation(valid);
  }, [valid]);

  const [rulesPassed, setRulesPassed] = useState({
    wordCount: false,
    htmlValid: false,
    properSentences: false,
  });

  const getCleanWordCount = (text) => {
    const cleanedText = text.replace(/<[^>]*>/g, "");
    return cleanedText.trim().split(/\s+/).filter((word) => word.length > 0).length;
  };

  const validateField = async (input) => {
    setLoading(true);

    const wordCount = getCleanWordCount(input);
    const hasEnoughWords = wordCount >= 50;
    setRulesPassed((prev) => ({ ...prev, wordCount: hasEnoughWords }));

    if (!hasEnoughWords) {
      setVisibleRules(1);
      setLoading(false);
      return;
    }

    setVisibleRules(2);

    const allowedTags = ['div', 'p', 'span', 'article', 'section', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    let htmlValid = true;
    let sentencesValid = true;

    const sections = input.trim().split(/(?=<[\w-]+>)/);
    for (const section of sections) {
      const tagMatch = section.match(/<(\w+)>(.*?)<\/\1>/s);
      if (!tagMatch || !allowedTags.includes(tagMatch[1].toLowerCase())) {
        htmlValid = false;
        break;
      }

      const content = tagMatch[2].trim();
      if (!content || !content.match(/[A-Z][^.!?]*[.!?]$/)) {
        sentencesValid = false;
        break;
      }
    }

    setRulesPassed((prev) => ({
      ...prev,
      htmlValid: htmlValid,
      properSentences: sentencesValid,
    }));

    if (htmlValid) setVisibleRules(3);
    setValid(htmlValid && sentencesValid && hasEnoughWords);
    setLoading(false);
  };

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
  }, [inputValue]);

  const getMotivationalMessage = () => {
    if (!inputValue) return "Time to wrap your experience in some HTML love! 💻";
    if (getCleanWordCount(inputValue) < 20) return "Keep typing! Your tags are lonely! 🏷️";
    if (!rulesPassed.htmlValid) return "Those tags look sus... 👀";
    return "Now that's some clean markup! 🎯";
  };

  return (
    <div className="field-container" style={{ marginBottom: "20px" }}>
      <label style={{ display: "block", marginBottom: "16px", fontWeight: "500" }}>
        {number}. The HTML Horror Story™
      </label>

      <textarea
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Show us your HTML prowess! Example: <div>I once fixed a bug by turning it off and on again.</div>"
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
              color: rulesPassed.wordCount ? "#22c55e" : "#ef4444",
              fontSize: "1.2em",
            }}
          >
            {rulesPassed.wordCount ? "✓" : "✗"}
          </span>
          <span>At least 50 words (currently at {getCleanWordCount(inputValue)}) - your resume wasn't one line, right?</span>
        </div>

        {visibleRules >= 2 && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span
              style={{
                color: rulesPassed.htmlValid ? "#22c55e" : "#ef4444",
                fontSize: "1.2em",
              }}
            >
              {rulesPassed.htmlValid ? "✓" : "✗"}
            </span>
            <span>Valid HTML tags (because unclosed tags are like unfinished coffee chats)</span>
          </div>
        )}

        {visibleRules >= 3 && (
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
        {getMotivationalMessage()}
      </div>

      {valid && <SuccessMessage message="Your HTML is as clean as your commit history claims to be!" emoji="🎨" />}

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
        <span>Allowed tags:</span>
        <code
          style={{
            backgroundColor: "#f1f1f1",
            padding: "2px 4px",
            borderRadius: "4px",
            fontSize: "0.9em",
          }}
        >
          div, p, span, article, section, h1-h6
        </code>
        <span>(just like your dating options, limited but functional)</span>
      </div>
    </div>
  );
};

export default HTMLExperience;
