import React, { useState, useEffect } from 'react';
import ShortTextInputField from '../components/ShortTextInputField';

const Name = () => {
  const validateName = (value) => {
    return value.length > 0;
  };


  return (
    <ShortTextInputField
        number={1}
        question="Enter your name."
        validateFunc={validateName}
    />
  );
};

export default Name;