import React, { useState } from 'react';

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
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <button onClick={handleNextStep}>Next</button>
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