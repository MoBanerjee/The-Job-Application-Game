import React, { useState, useEffect } from 'react';
import ShortTextInputField from '../components/ShortTextInputField';

const Email = () => {
  const validateEmail = (value) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value);
  };


  return (
    <ShortTextInputField
        number={2}
        question="Enter your email"
        validateFunc={validateEmail}
        errMsg="Please enter a valid email"
    />
  );
};

export default Email;