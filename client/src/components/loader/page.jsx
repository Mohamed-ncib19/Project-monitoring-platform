import './loader.styles.css';

const Loader = () => {
  return ( 
    <div className="backdrop">
      <div className="loader z-index-999" aria-hidden="true" tabIndex={-1}>
      <div className="justify-content-center jimu-primary-loading"></div>

      </div>
    </div>
  );
};
 
export default Loader;
