import "./steps.styles.css";
const StepsBar = ({listNmbers,StepsNames}) => {
    const steps = Array.from({ length: listNmbers }, (_, index) => index + 1);
    return ( 
             
              <div className="container">    
            <ul className="steps steps-green steps-counter my-4">
          {/* <li className="step-item active" >Cart</li>
          <li className="step-item active">Billing Information</li>
          <li className="step-item active ">Confirmation</li> */}
          {steps.map((stepNumber,index) => (
            
          <li key={stepNumber} id={`step-${stepNumber}`} className="step-item active">
            {StepsNames[index]}
          </li>
        ))}
            </ul>
            </div>
     );
}
 
export default StepsBar;