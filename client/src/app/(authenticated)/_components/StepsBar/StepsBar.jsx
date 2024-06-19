import React, { useEffect, useState } from 'react';
import { useNotifications } from 'reapop';

export const StepsBar = ({ listLength, labels, labelIcons, currentStep, setCurrentStep, StepsVerifier }) => {
  const steps = Array.from({ length: listLength }, (_, index) => index + 1);
  const { notify } = useNotifications();
  const [passCondition, setPassCondition] = useState(false);

  useEffect(() => {
    function checkStep() {
      setPassCondition(StepsVerifier[0][`step${currentStep}`]);
    }
    
    checkStep();
  }, [currentStep, StepsVerifier]);

  const handleClick = (stepNumber) => {
    if (stepNumber > currentStep && !passCondition) {
      notify({ message: "Please complete the current step", status: "danger" });
    } else {
      setCurrentStep(stepNumber);
    }
  };

  return (
    <div className="w-100 z-0">
      <ul className="steps position-relative">
        {steps.map((stepNumber, index) => (
          <li
            key={stepNumber}
            id={`step-${stepNumber}`}
            className={`step-item ${currentStep === stepNumber ? "active" : ""}`}
            onClick={() => handleClick(stepNumber)}
          >
            <div className="step-icon">{labelIcons[index]}</div>
            <div className="step-content">
              <span className="step-label">{labels[index]}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
