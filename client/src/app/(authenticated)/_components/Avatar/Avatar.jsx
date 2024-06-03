export const Avatar = ({ name, variant, rounded, textColor }) => {
  const initials = name
    ? name
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase())
        .join('')
    : '';
  return (
    <>
    <span
      className={` ${'bg-' + variant} avatar ${'rounded-' + rounded} p-3 text-${textColor} text-decoration-none fw-bold  `}
    >
      {initials}
    </span>
    </>
  );
};
