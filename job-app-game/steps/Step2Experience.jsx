import React from 'react';
import PreviousCompanyFortune500 from '../src/JobFields/PreviousCompanyFortune500';
import HTMLExperience from '../src/JobFields/HTMLExperience';
import PhoneNumberAdd from '../src/JobFields/PhoneNumberAdd';

const Step2Experience = ({ formData, updateFormData, updateValidation }) => (
  <div>
    <h2 style={{ color: '#f8fafc', marginBottom: '24px' }}>Step 2: Your Journey</h2>
    <PhoneNumberAdd 
        number={1}
        onValidation={(isValid) => updateValidation('phoneNumber', isValid)}
        onChange={(value) => updateFormData('phoneNumber', value)}
        value={formData.phoneNumber}
      />

    <PreviousCompanyFortune500
      onValidation={(isValid) => updateValidation('fortune500', isValid)}
      onChange={(value) => updateFormData('fortune500', value)}
      value={formData.fortune500}
    />
    <HTMLExperience
      onValidation={(isValid) => updateValidation('htmlExperience', isValid)}
      onChange={(value) => updateFormData('htmlExperience', value)}
      value={formData.htmlExperience}
    />
  </div>
);

export default Step2Experience;
