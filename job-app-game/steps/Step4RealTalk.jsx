import React from 'react';
import RejectionCounter from '../src/JobFields/RejectionCounter';
import CoffeeChatCounter from '../src/JobFields/CoffeeChatCounter';

const Step4RealTalk = ({ formData, updateFormData, updateValidation }) => (
  <div>
    <h2 style={{ color: '#f8fafc', marginBottom: '24px' }}>Step 4: The Real Talk</h2>
    <RejectionCounter
      onValidation={(isValid) => updateValidation('rejectionCounter', isValid)}
      onChange={(value) => updateFormData('rejectionCount', value)}
      value={formData.rejectionCount}
    />
    <CoffeeChatCounter
      onValidation={(isValid) => updateValidation('coffeeChatCounter', isValid)}
      onChange={(value) => updateFormData('coffeeChats', value)}
      value={formData.coffeeChats}
    />
  </div>
);

export default Step4RealTalk;
