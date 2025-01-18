import React from 'react';
import Email from '../src/JobFields/Email';
import LongTextInputField from '../src/components/LongTextInputField';

const Step1Basics = ({ formData, updateFormData, updateValidation }) => (
  <div>
    <h2 style={{ color: '#f8fafc', marginBottom: '24px' }}>Step 1: The Basics</h2>
    <Email
      onValidation={(isValid) => updateValidation('email', isValid)}
      onChange={(value) => updateFormData('email', value)}
      value={formData.email}
    />
    <LongTextInputField
      number={1}
      question="There is no 'I' in 'Team'! Introduce yourself without using the letter 'I'."
      validateFunc={(val) => !val.toLowerCase().includes('i') && val.trim().length > 0}
      errMsg="No 'i's allowed in your introduction (there's no 'i' in team!)"
      onValidation={(isValid) => updateValidation('introduction', isValid)}
      onChange={(value) => updateFormData('introduction', value)}
      value={formData.introduction}
    />
  </div>
);

export default Step1Basics;
