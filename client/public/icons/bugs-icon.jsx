const BugsIcon = ({ width = 26, height = 26, ...props }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.8571 0H2.14286C0.95939 0 0 0.95939 0 2.14286V12.8571C0 14.0406 0.95939 15 2.14286 15H12.8571C14.0406 15 15 14.0406 15 12.8571V2.14286C15 0.95939 14.0406 0 12.8571 0Z"
      fill="#E5493A"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.25 7.49951C11.25 9.57076 9.57125 11.2495 7.5 11.2495C5.42875 11.2495 3.75 9.57076 3.75 7.49951C3.75 5.42826 5.42875 3.74951 7.5 3.74951C9.57125 3.74951 11.25 5.42826 11.25 7.49951Z"
      fill="white"
    />
  </svg>
);
export default BugsIcon;
