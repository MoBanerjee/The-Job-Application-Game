import React, { useState } from 'react';
import LongTextInputField from './components/LongTextInputField'
import ShortTextInputField from './components/ShortTextInputField';
import Email from './JobFields/Email';
import PreviousCompanyFortune500 from './JobFields/PreviousCompanyFortune500';

const JobApplicationForm = ({ step, handleNextStep }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    skills: '',
    coverLetter: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Step 1: Name and Email
  if (step === 0) {
    return (
      <div>
        <Email />
        <PreviousCompanyFortune500 />
        <LongTextInputField number={1} question="Be a team player. introduce yourself without letter i" validateFunc={(val)=> {return !val.includes('i');}} errMsg="no i"/>
      </div>
    );
  }

  // Step 2: Skills Section
  if (step === 1) {
    return (
      <div>
        <label>Skills:</label>
        <input
          type="text"
          name="skills"
          value={formData.skills}
          onChange={handleInputChange}
        />
        <button onClick={handleNextStep}>Next</button>
      </div>
    );
  }

  // Step 3: Cover Letter Section
  if (step === 2) {
    return (
      <div>
        <label>Cover Letter:</label>
        <textarea
          name="coverLetter"
          value={formData.coverLetter}
          onChange={handleInputChange}
        />
        <button onClick={handleNextStep}>Next</button>
      </div>
    );
  }

  // Step 4: Final confirmation
  return (
    <div>
      <h3>Congratulations! You've completed the application! Unfortunately there are so many talented candidates so we have to reject you.</h3>
      <p>Name: {formData.name}</p>
      <p>Email: {formData.email}</p>
      <p>Skills: {formData.skills}</p>
      <p>Cover Letter: {formData.coverLetter}</p>
    </div>
  );
};

export default JobApplicationForm;