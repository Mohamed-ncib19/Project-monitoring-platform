const WelcomeBackComponent = ({username,size}) => {
    return ( 
        <div>
               <p className={`text-center d-flex flex-column gap-2 text-light ${size} `} >Welcome Back, <span className="text-custom-primary" >{username}!</span></p>
        </div>
     );
}
 
export default WelcomeBackComponent;