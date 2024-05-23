import './welcomeBack.styles.css';
const WelcomeBackComponent = ({ back, username, size, content }) => {
  return (
    <div className=" col-10 mt-5  custom-transition">
      <p className={`  welcome custom-letter-spacing-wider text-dark ${size} `}>
        Welcome {back ? 'Back , ' : ''}{' '}
        <span className="text-custom-primary">{username}!</span>
      </p>
      <p className="content light-text-custom-color ">{content}</p>
    </div>
  );
};

export default WelcomeBackComponent;
