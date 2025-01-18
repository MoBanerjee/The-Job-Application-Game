import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import JobApplicationForm from './JobApplicationForm';
import Progress from './Progress';

function App() {
  const [step, setStep] = useState(0); // Track the current step

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1); // Move to next step
  };

  return (
    <div className="App">
      <h1>Job Application Game</h1>
      <JobApplicationForm step={step} handleNextStep={handleNextStep} />
      
      <Progress step={step} />
    </div>
  );
};


export default App
