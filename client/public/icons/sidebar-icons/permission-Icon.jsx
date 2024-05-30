const PermissionIcon = (props) => (
  <svg
    width={30}
    height={34}
    viewBox="0 0 26 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_747_3407)" filter="url(#filter0_d_747_3407)">
      <path
        d="M12.9999 3.32861C15.1411 5.22297 17.9357 6.2093 20.7916 6.07861C21.2074 7.49304 21.3346 8.97662 21.1657 10.4412C20.9968 11.9058 20.5352 13.3214 19.8084 14.6041C19.0815 15.8868 18.1043 17.0102 16.9347 17.9077C15.7651 18.8052 14.427 19.4585 12.9999 19.8286C11.5729 19.4585 10.2348 18.8052 9.06518 17.9077C7.89557 17.0102 6.91831 15.8868 6.19148 14.6041C5.46464 13.3214 5.00305 11.9058 4.83415 10.4412C4.66525 8.97662 4.79247 7.49304 5.20826 6.07861C8.06416 6.2093 10.8588 5.22297 12.9999 3.32861Z"
        stroke="black"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.082 10.6618C12.082 10.9049 12.1786 11.1381 12.3505 11.31C12.5224 11.4819 12.7556 11.5785 12.9987 11.5785C13.2418 11.5785 13.475 11.4819 13.6469 11.31C13.8188 11.1381 13.9154 10.9049 13.9154 10.6618C13.9154 10.4187 13.8188 10.1855 13.6469 10.0136C13.475 9.84169 13.2418 9.74512 12.9987 9.74512C12.7556 9.74512 12.5224 9.84169 12.3505 10.0136C12.1786 10.1855 12.082 10.4187 12.082 10.6618Z"
        stroke="black"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 11.5786V13.8703"
        stroke="black"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_747_3407"
        x={-2}
        y={0.578613}
        width={30}
        height={30}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_747_3407"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_747_3407"
          result="shape"
        />
      </filter>
      <clipPath id="clip0_747_3407">
        <rect
          width={22}
          height={22}
          fill="white"
          transform="translate(2 0.578613)"
        />
      </clipPath>
    </defs>
  </svg>
);
export default PermissionIcon;
