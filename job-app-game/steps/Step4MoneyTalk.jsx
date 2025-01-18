import React from 'react';
import SalaryValidator from '../src/JobFields/SalaryValidator';

const Step4MoneyTalk = ({ formData, updateFormData, updateValidation }) => (
  <div>
    <h2 style={{ color: '#f8fafc', marginBottom: '24px' }}>Step 4: The Money Talk</h2>
    <SalaryValidator
      onValidation={(isValid) => updateValidation('salaryValidator', isValid)}
      onChange={(value) => updateFormData('salary', value)}
      value={formData.salary}
    />
  </div>
);

export default Step4MoneyTalk;
