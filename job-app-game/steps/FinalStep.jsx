import React from 'react';

const FinalStep = ({ formData }) => (
  <div style={{ textAlign: 'center', padding: '40px 20px' }}>
    <h2 style={{ marginBottom: '24px' }}>Application Complete!</h2>
    <div style={{
      padding: '20px',
      backgroundColor: 'rgba(51, 65, 85, 0.5)',
      borderRadius: '8px',
      maxWidth: '600px',
      margin: '0 auto',
      border: '1px solid rgba(148, 163, 184, 0.2)'
    }}>
      <p style={{ fontSize: '1.1em', marginBottom: '20px', color: '#f8fafc' }}>
        Congratulations on completing our uniquely challenging application process! 🎉
      </p>
      <p style={{ color: '#cbd5e1', marginBottom: '10px' }}>
        Unfortunately, while your application was entertaining, we've decided to go with a candidate 
        who has 15 years of experience in a programming language that was invented 3 years ago.
      </p>
      <p style={{ fontStyle: 'italic', color: '#94a3b8' }}>
        Feel free to apply again when you've gained some impossible experience requirements!
      </p>
    </div>
  </div>
);

export default FinalStep;
