const WarningCheck = (props) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width={32} height={32} rx={16} fill="#F8DB3E" fillOpacity={0.2} />
    <g clipPath="url(#clip0_1967_6300)">
      <path
        d="M16 6C10.48 6 6 10.48 6 16C6 21.52 10.48 26 16 26C21.52 26 26 21.52 26 16C26 10.48 21.52 6 16 6ZM17 21H15V19H17V21ZM17 17H15V11H17V17Z"
        fill="#FFD21E"
      />
    </g>
    <defs>
      <clipPath id="clip0_1967_6300">
        <rect width={24} height={24} fill="white" transform="translate(4 4)" />
      </clipPath>
    </defs>
  </svg>
);
export default WarningCheck;
