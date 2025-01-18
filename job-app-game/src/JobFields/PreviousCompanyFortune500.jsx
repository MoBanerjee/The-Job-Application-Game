import React, { useState, useEffect } from 'react';
import ShortTextInputField from '../components/ShortTextInputField';

const PreviousCompanyFortune500 = () => {
  const [fortune500Companies, setFortune500Companies] = useState([]);

  useEffect(() => {
    const loadFortune500Companies = async () => {
      try {
        const response = await fetch('/fortune500.txt');
        if (!response.ok) {
          throw new Error('Failed to fetch file');
        }
        const text = await response.text();
        const companies = text
          .split('\n')
          .map((company) => company.trim().toLowerCase());
        setFortune500Companies(companies);
      } catch (error) {
        console.error('Error loading Fortune 500 companies:', error);
        // Set fallback companies
        setFortune500Companies([
          'apple',
          'google',
          'microsoft',
          'tiktok',
          'nvidia',
          'amazon',
          'tesla',
        ]);
      }
    };

    loadFortune500Companies();
  }, []);

  const validateCompany = (value) => {
    // Normalize input value before validation
    const normalizedValue = value.trim().toLowerCase();
    return fortune500Companies.includes(normalizedValue);
  };

  return (
    <ShortTextInputField
      number={3}
      question="What is your previous company? (We need prior experience for this entry-level role.)"
      validateFunc={validateCompany}
      errMsg="Hmm, never heard of that company. Prior experience in a Fortune 500 company is highly recommended to show that you are competent enough for the job."
      successMsg={`Nice, your background aligns with our needs!<br/>
                    However, to make sure you're truly committed to us, <strong>your future answers must avoid any 3-character substrings in your ex-company's name. (tbi)</strong>`}
    />
  );
};

export default PreviousCompanyFortune500;
