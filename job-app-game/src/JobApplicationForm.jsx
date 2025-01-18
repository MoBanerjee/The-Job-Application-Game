import React, { useState } from 'react';
import Step1Basics from '../steps/Step1Basics';
import Step2Experience from '../steps/Step2Experience';
import Step3RealTalk from '../steps/Step3RealTalk';
import Step4MoneyTalk from '../steps/Step4MoneyTalk';
import FinalStep from '../steps/FinalStep';
import Navigation from './components/Navigation';

const JobApplicationForm = () => {
  const [step, setStep] = useState(0);

  // Form data for all steps
  const [formData, setFormData] = useState({
    email: '',
    introduction: '',
    fortune500: '',
    htmlExperience: '',
    rejectionCount: '',
    coffeeChats: '',
    salary: ''
  });

  // Validation states for all steps
  const [validationStates, setValidationStates] = useState({
    email: false,
    introduction: false,
    fortune500: false,
    htmlExperience: false,
    rejectionCounter: false,
    coffeeChatCounter: false,
    salaryValidator: false
  });

  // Update form data
  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  // Update validation state
  const updateValidation = (field, isValid) => {
    setValidationStates((prev) => ({
      ...prev,
      [field]: isValid
    }));
  };

  // Check if the current step is valid
  const isStepValid = () => {
    switch (step) {
      case 0:
        return validationStates.email && validationStates.introduction;
      case 1:
        return validationStates.fortune500 && validationStates.htmlExperience;
      case 2:
        return validationStates.rejectionCounter && validationStates.coffeeChatCounter;
      case 3:
        return validationStates.salaryValidator;
      default:
        return true;
    }
  };

  // Navigate to the next or previous step
  const handleNextStep = (direction) => {
    setStep((prevStep) => Math.max(0, Math.min(prevStep + direction, 4)));
  };

  // Render the appropriate step
  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <Step1Basics
            formData={formData}
            updateFormData={updateFormData}
            updateValidation={updateValidation}
          />
        );
      case 1:
        return (
          <Step2Experience
            formData={formData}
            updateFormData={updateFormData}
            updateValidation={updateValidation}
          />
        );
      case 2:
        return (
          <Step3RealTalk
            formData={formData}
            updateFormData={updateFormData}
            updateValidation={updateValidation}
          />
        );
      case 3:
        return (
          <Step4MoneyTalk
            formData={formData}
            updateFormData={updateFormData}
            updateValidation={updateValidation}
          />
        );
      case 4:
        return <FinalStep formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div>
      {renderStep()}
      {step < 4 && (
        <Navigation
          step={step}
          handleNextStep={handleNextStep}
          isStepValid={isStepValid}
        />
      )}
    </div>
  );
};

export default JobApplicationForm;
