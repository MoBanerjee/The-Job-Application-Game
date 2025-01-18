import React from 'react';
import RhymingTeamwork from '../src/JobFields/RhymingTeamWork';

const Step3Teamwork = ({ formData, updateFormData, updateValidation }) => {
  // Log validation updates to debug
  const handleValidation = (field, isValid) => {
    console.log(`${field} validation:`, isValid);
    updateValidation(field, isValid);
  };

  return (
    <div>
      <h2 style={{marginBottom: '24px' }}>Step 3: Teamwork</h2>
      
      

      <RhymingTeamwork 
        number={2}
        onValidation={(isValid) => handleValidation('rhyming', isValid)}
        onChange={(value) => updateFormData('rhyming', value)}
        value={formData.rhyming}
      />
    </div>
  );
};

export default Step3Teamwork;