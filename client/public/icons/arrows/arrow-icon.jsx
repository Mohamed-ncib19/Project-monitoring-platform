const ArrowIcons = {
  ArrowRightIcon: () => {
    return (
      <i className="text-dark custom-hover-icon fs-2 p-1">
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 24 24"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"></path>
        </svg>
      </i>
    );
  },
  ArrowLeftIcon: () => {
    return (
      <i className="text-dark custom-hover-icon fs-2 p-1">
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 24 24"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"></path>
        </svg>
      </i>
    );
  },

  ArrowDownIcon: () => {
    return (
      <i>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="m7 10l5 5l5-5"
          />
        </svg>
      </i>
    );
  },
};

export default ArrowIcons;
