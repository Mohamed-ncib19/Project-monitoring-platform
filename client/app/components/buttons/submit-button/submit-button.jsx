import "./login-button.styles.css"
const SubmitButton = ({content}) => {
    return ( 
<div className="col-8 col-md-6 col-lg-6 col-xl- mx-auto py-3 ">
        <button type="submit" className=" btn  w-100 py-2 shadow btn-primary-custom border-none rounded text-light login-button-custom-css d-flex flex-row justify-content-center align-items-center gap-2 " >
            {content}
            </button>
        </div>
     );
}
 
export default SubmitButton;