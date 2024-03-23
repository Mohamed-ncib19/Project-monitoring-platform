import './welcomeBack.styles.css'
const WelcomeBackComponent = ({username,size}) => {
    return ( 
        <div className="w-75 text-center custom-transition" >
               <p className={` d-flex flex-column gap-2 text-light ${size} `} >Welcome Back, <span className="text-custom-primary" >{username}!</span></p>
        </div>
     );
}
 
export default WelcomeBackComponent;