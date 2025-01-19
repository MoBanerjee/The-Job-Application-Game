import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import JobApplicationForm from './JobApplicationForm'
import Progress from './Progress'
import HTMLExperience from './JobFields/HTMLExperience'
import PhoneNumberAdd from './JobFields/PhoneNumberAdd'
import SalaryValidator from './JobFields/SalaryValidator'
import RejectionCounter from './JobFields/RejectionCounter'
import CoffeeChatCounter from './JobFields/CoffeeChatCounter'

function App() {
  const [step, setStep] = useState(0)

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1)
  }

  return (
    <div className="min-h-screen bg-black text-white" style={{ 
      overflow: 'scroll',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }}>
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold py-8" style={{ 
          color: '#ff0000',
          textShadow: '2px 2px 4px rgba(255, 0, 0, 0.5)'
        }}>
          THE JOB APPLICATION GAME
        </h1>
        <JobApplicationForm step={step} handleNextStep={handleNextStep} />
      </div>
    </div>
  )
}

export default App

/* In App.css you'll need:


*/