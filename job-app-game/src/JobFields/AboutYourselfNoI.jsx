import React, { useState, useEffect } from "react";
import SuccessMessage from '../components/SuccessMessage';

const AboutYourselfNoI = ({ number = 2, onValidation }) => {
  const [inputValue, setInputValue] = useState("");
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visibleRules, setVisibleRules] = useState(1);

  useEffect(() => {
    onValidation(valid);
  }, [valid]);

  const [rulesPassed, setRulesPassed] = useState({
    charCount: false,
    noI: false,
    properSentences: false,
  });

  const getCharCount = (text) => {
    return text.length;
  };

  const validateField = async (input) => {
    setLoading(true);

    // Character count validation
    const charCount = getCharCount(input);
    const hasExactChars = charCount === 200;
    setRulesPassed((prev) => ({ ...prev, charCount: hasExactChars }));

    if (!hasExactChars) {
      setVisibleRules(1);
      setLoading(false);
      return;
    }

    setVisibleRules(2);

    // No 'i' validation
    const noI = !input.toLowerCase().includes('i');
    setRulesPassed((prev) => ({ ...prev, noI }));

    if (!noI) {
      setLoading(false);
      return;
    }

    setVisibleRules(3);

    // Sentence validation
    const sentences = input.split(/[.!?]\s+/).filter(s => s.trim());
    const properSentences = sentences.every(sentence => {
      const trimmed = sentence.trim();
      return trimmed && /^[A-Z]/.test(trimmed);
    });

    setRulesPassed((prev) => ({
      ...prev,
      properSentences,
    }));

    setValid(hasExactChars && noI && properSentences);
    setLoading(false);
  };

  useEffect(() => {
    if (inputValue) {
      validateField(inputValue);
    } else {
      setValid(false);
      setRulesPassed({
        charCount: false,
        noI: false,
        properSentences: false,
      });
      setVisibleRules(1);
    }
  }, [inputValue]);

  const getMotivationalMessage = () => {
    if (!inputValue) return "Ready to prove there's no 'i' in team? 🤝";
    if (inputValue.length < 100) return "You're halfway there! Keep the team spirit going! 🎯";
    if (inputValue.toLowerCase().includes('i')) return "Watch out for those sneaky i's... 👀";
    return "Now that's some team-first writing! 🌟";
  };

  return (
    <div className="field-container" style={{ marginBottom: "20px" }}>
      <label style={{ display: "block", marginBottom: "16px", fontWeight: "500" }}>
        {number}. Ntroduce Yourself
      </label>

      <textarea
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Team members advance together each day. A leader helps the club excel."
        style={{
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          width: "400px",
          minHeight: "200px",
          resize: "vertical",
          fontFamily: "monospace",
        }}
      />

      <div style={{ marginTop: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
          <span style={{
            color: rulesPassed.charCount ? "#22c55e" : "#ef4444",
            fontSize: "1.2em",
          }}>
            {rulesPassed.charCount ? "✓" : "✗"}
          </span>
          <span>Exactly 200 characters (currently at {getCharCount(inputValue)}) - every character counts!</span>
        </div>

        {visibleRules >= 2 && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span style={{
              color: rulesPassed.noI ? "#22c55e" : "#ef4444",
              fontSize: "1.2em",
            }}>
              {rulesPassed.noI ? "✓" : "✗"}
            </span>
            <span>No letter 'i' allowed (because there's no "i" in team, obviously)</span>
          </div>
        )}

        {visibleRules >= 3 && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{
              color: rulesPassed.properSentences ? "#22c55e" : "#ef4444",
              fontSize: "1.2em",
            }}>
              {rulesPassed.properSentences ? "✓" : "✗"}
            </span>
            <span>Complete sentences (start with capitals, just like your career aspirations)</span>
          </div>
        )}
      </div>

      <div style={{
        marginTop: "12px",
        fontSize: "0.9em",
        color: "#666",
        fontStyle: "italic",
      }}>
        {getMotivationalMessage()}
      </div>

      {valid && <SuccessMessage message="Now that's what we call a team player!" emoji="🤝" />}

      <div style={{
        marginTop: "12px",
        fontSize: "0.875em",
        color: "#666",
        display: "flex",
        alignItems: "center",
        gap: "4px",
      }}>
        <span>Pro tip:</span>
        <code style={{
          backgroundColor: "#f1f1f1",
          padding: "2px 4px",
          borderRadius: "4px",
          fontSize: "0.9em",
        }}>
          Use 'we', 'team', 'group' instead of 'I'
        </code>
        <span>(because self-promotion is so last year)</span>
      </div>
    </div>
  );
};

export default AboutYourselfNoI;