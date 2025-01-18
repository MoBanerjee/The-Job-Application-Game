import React, { useState, useEffect } from 'react';

const ShortTextInputField = ({number, question, validateFunc, errMsg, onValidation, successMsg="Good job!"}) => {
  let [inputValue, setInputValue] = useState('');
  let [valid, setValid] = useState(false);
  
  useEffect(() => {
    validateField(inputValue);
  }, [inputValue]);

  useEffect(() => {
    if (onValidation) {
      onValidation(valid);
    }
  }, [valid]);

  const validateField = () => {
    if (!inputValue) setValid(false);
    if (validateFunc(inputValue)) {
      setValid(true);
    }
    else {
      setValid(false);
    }
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    localStorage.setItem(number, value);
    setInputValue(value);
  };


  return (
    <div className="field-container" style={{ marginBottom: '20px' }}>
      <label htmlFor={question} style={{ display: 'block', marginBottom: '8px' }}>
        {number}. {question}
      </label>
      <input
          id={question}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          style={{
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            width: '100%',
            resize: 'vertical',
          }}
        />


      {inputValue && !valid && <p style={{ color: 'red', marginTop: '8px' }}>{errMsg}</p>}
      {inputValue && valid && <p style={{ color: 'green', marginTop: '8px' }}
                                    dangerouslySetInnerHTML={{
                                      __html: successMsg,
                                    }}
                                />}
    </div>
  );
};

export default ShortTextInputField;