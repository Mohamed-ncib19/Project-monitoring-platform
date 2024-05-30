const   CoreButton = ({
  label,
  type,
  onClick,
  variant = 'btn-primary-custom',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn col-lg-6 col-md-8 col-sm-8 col-10 m-auto py-3 ${variant} border-none rounded text-light button-custom-css d-flex flex-row justify-content-center align-items-center gap-2 shadow`}
    >
      {label}
    </button>
  );
};

export default CoreButton;
