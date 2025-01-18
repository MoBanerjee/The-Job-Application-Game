import React from 'react';
import Email from '../src/JobFields/Email';
import LongTextInputField from '../src/components/LongTextInputField';
import AboutYourselfNoI from '../src/JobFields/AboutYourselfNoI';
const Step1Basics = ({ formData, updateFormData, updateValidation }) => (
  <div>
    <h2 style={{ color: '#f8fafc', marginBottom: '24px' }}>Step 1: The Basics</h2>
    <Email
      onValidation={(isValid) => updateValidation('email', isValid)}
      onChange={(value) => updateFormData('email', value)}
      value={formData.email}
    />
    <AboutYourselfNoI
      onValidation={(isValid) => updateValidation('introduction', isValid)}
      onChange={(value) => updateFormData('introduction', value)}
      value={formData.introduction}
    />
  </div>
);

export default Step1Basics;
