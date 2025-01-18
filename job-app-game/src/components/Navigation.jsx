import React from 'react';

const Navigation = ({ step, handleNextStep, isStepValid }) => (
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
    padding: '20px 0',
    borderTop: '1px solid rgba(148, 163, 184, 0.2)'
  }}>
    {step > 0 && (
      <button
        onClick={() => handleNextStep(-1)} // Back
        style={{
          padding: '8px 16px',
          backgroundColor: '#475569',
          color: '#f8fafc',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '0.9rem'
        }}
      >
        ← Back
      </button>
    )}
    {step < 5 && (
      <button
        onClick={() => handleNextStep(1)} // Next
        disabled={!isStepValid()}
        style={{
          padding: '8px 16px',
          backgroundColor: isStepValid() ? '#3b82f6' : '#64748b',
          color: '#ffffff',
          border: 'none',
          borderRadius: '4px',
          cursor: isStepValid() ? 'pointer' : 'not-allowed',
          fontSize: '0.9rem'
        }}
      >
        Next →
      </button>
    )}
  </div>
);

export default Navigation;
