import React from 'react';

const Progress = ({ step, totalSteps=6 }) => {
  return (
    <div style={{
      marginBottom: '20px',
      padding: '20px',
      textAlign: 'center',
      color: '#f8fafc'
    }}>
      Step {step + 1} of {totalSteps}
      <div style={{
        width: '100%',
        height: '4px',
        backgroundColor: '#1e293b',
        marginTop: '10px',
        borderRadius: '2px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${((step + 1) / totalSteps) * 100}%`,
          height: '100%',
          backgroundColor: '#3b82f6',
          transition: 'width 0.3s ease'
        }} />
      </div>
    </div>
  );
};

export default Progress;