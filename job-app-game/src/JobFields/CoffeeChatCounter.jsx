// CoffeeChatCounter.jsx
import React, { useState, useEffect } from 'react';
import SuccessMessage from '../components/SuccessMessage';

const CoffeeChatCounter = ({ number = 1, onValidation}) => {
  const [chatsScheduled, setChatsScheduled] = useState('');
  const [ghosted, setGhosted] = useState('');
  const [coffeeSpent, setCoffeeSpent] = useState('');
  const [visibleRules, setVisibleRules] = useState(1);
  
  const [rulesPassed, setRulesPassed] = useState({
    minChats: false,
    ghostRatio: false,
    coffeeExpense: false
  });
    useEffect(() => {
      onValidation(rulesPassed.minChats && rulesPassed.ghostRatio && rulesPassed.coffeeExpense)
  }, [rulesPassed]);

  const validateInputs = (chats, ghosts, coffee) => {
    const numChats = parseInt(chats);
    const numGhosts = parseInt(ghosts);
    const numCoffee = parseInt(coffee);

    // Rule 1: Must have at least 10 chats scheduled
    const hasMinChats = numChats && numChats >= 10;
    
    // Rule 2: Number of ghosted meetings must be exactly half of scheduled
    const hasCorrectGhostRatio = numChats && numGhosts && (numGhosts === Math.floor(numChats / 2));
    
    // Rule 3: Coffee expense must be a fibonacci number
    const isFibonacci = (num) => {
      const isPerfectSquare = (n) => Math.sqrt(n) % 1 === 0;
      return num && isPerfectSquare(5 * num * num + 4) || isPerfectSquare(5 * num * num - 4);
    };
    const hasFibCoffee = numCoffee && isFibonacci(numCoffee);

    setRulesPassed({
      minChats: hasMinChats,
      ghostRatio: hasCorrectGhostRatio,
      coffeeExpense: hasFibCoffee
    });

    // Update visible rules
    if (!hasMinChats) {
      setVisibleRules(1);
    } else if (!hasCorrectGhostRatio) {
      setVisibleRules(2);
    } else if (!hasFibCoffee) {
      setVisibleRules(3);
    }
  };

  useEffect(() => {
    validateInputs(chatsScheduled, ghosted, coffeeSpent);
  }, [chatsScheduled, ghosted, coffeeSpent]);

  const getChatComment = () => {
    if (!chatsScheduled) return "Ready to network? 🤝";
    if (chatsScheduled < 5) return "Those are rookie numbers! 😅";
    if (chatsScheduled < 10) return "Getting warmer! ☕";
    return "Now that's what I call networking! 🌟";
  };

  return (
    <div className="field-container" style={{ marginBottom: "20px" }}>
      <label style={{ display: "block", marginBottom: "16px", fontWeight: "500" }}>
        {number}. Networking history...
      </label>

      <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
        <div>
          <label style={{ fontSize: "0.9em", color: "#666" }}>Chats Scheduled:</label>
          <input
            type="number"
            value={chatsScheduled}
            onChange={(e) => setChatsScheduled(e.target.value)}
            placeholder="Be proud of this!"
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
          <label style={{ fontSize: "0.9em", color: "#666" }}>Times Ghosted:</label>
          <input
            type="number"
            value={ghosted}
            onChange={(e) => setGhosted(e.target.value)}
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
          <label style={{ fontSize: "0.9em", color: "#666" }}>$ Spent on Coffee:</label>
          <input
            type="number"
            value={coffeeSpent}
            onChange={(e) => setCoffeeSpent(e.target.value)}
            placeholder="Ouch..."
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
      </div>

      {/* Rules display */}
      <div style={{ marginTop: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
          <span style={{ 
            color: rulesPassed.minChats ? "#22c55e" : "#ef4444",
            fontSize: "1.2em"
          }}>
            {rulesPassed.minChats ? "✓" : "✗"}
          </span>
          <span>Must have scheduled at least 10 coffee chats (networking is key!)</span>
        </div>

        {visibleRules >= 2 && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span style={{ 
              color: rulesPassed.ghostRatio ? "#22c55e" : "#ef4444",
              fontSize: "1.2em"
            }}>
              {rulesPassed.ghostRatio ? "✓" : "✗"}
            </span>
            <span>Number of ghosted meetings must be exactly half of scheduled (perfectly balanced!)</span>
          </div>
        )}

        {visibleRules >= 3 && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ 
              color: rulesPassed.coffeeExpense ? "#22c55e" : "#ef4444",
              fontSize: "1.2em"
            }}>
              {rulesPassed.coffeeExpense ? "✓" : "✗"}
            </span>
            <span>Coffee expenses must be a Fibonacci number (1, 2, 3, 5, 8, 13, 21, 34, 55, 89...)</span>
          </div>
        )}
      </div>

      {/* Dynamic comment */}
      <div style={{ 
        marginTop: "12px",
        fontSize: "0.9em",
        color: "#666",
        fontStyle: "italic"
      }}>
        {getChatComment()}
      </div>

      {/* Success message */}
      {rulesPassed.minChats && rulesPassed.ghostRatio && rulesPassed.coffeeExpense && (
        <SuccessMessage 
          message="You're a networking ninja! Time to expense those coffees!" 
          emoji="☕"
        />
      )}

      {/* Footer message */}
      <div style={{ 
        marginTop: "12px",
        fontSize: "0.875em",
        color: "#666",
        fontStyle: "italic"
      }}>
        Pro tip: "Let's keep in touch" usually means "Good luck with your job search!" 
        (But hey, at least you got coffee!)
      </div>
    </div>
  );
};

export default CoffeeChatCounter;