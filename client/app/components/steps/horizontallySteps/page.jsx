import { useEffect, useState } from "react";
import "./steps.styles.css";
const StepsBar = ({ listNmbers, StepsNames, currentStep, nextStep, previousStep, StepsVerifier }) => {
  const steps = Array.from({ length: listNmbers }, (_, index) => index + 1);
  const [passCondition, setPassCondition] = useState(false);

  useEffect(() => {
    function checkStep() {
      if (StepsVerifier[0][`step${currentStep}`]) {
        setPassCondition(true);
      } else if(StepsVerifier[0][`step${currentStep-currentStep+1}`]) {
        setPassCondition(false);
      }
    }

    checkStep();
  }, [currentStep, StepsVerifier]);

  return (
    <div className="w-100 ">
      <ul className="steps steps-green steps-counter my-4 ">
        {steps.map((stepNumber, index) => (
          <li
            key={stepNumber}
            id={`step-${stepNumber}`}
            className={`step-item ${
              currentStep === stepNumber ? "active" : ""
            }   `}
            onClick={() => {
              if(!passCondition && currentStep === 1){
                alert('you need to complete registartion on thta form')
              }else{
              if (stepNumber !== currentStep) {
                if (stepNumber > currentStep && passCondition) {
                  nextStep();
                } else if(stepNumber < currentStep && !passCondition) {
                  previousStep();
                }
              }
            }
            }}
          >
            {StepsNames[index]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StepsBar;