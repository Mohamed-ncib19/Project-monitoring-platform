'use client';
import './button.styles.css';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const Button = ({ content, link, onClick, disabled, background }) => {
  console.log(background);
  const [linkIsValid, setLinkIsValid] = useState(false);
  const [onClickExists, setOnClickExists] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (link) {
      setLinkIsValid(true);
    } else if (onClick) {
      setOnClickExists(true);
    }
  }, [link]);

  const navTo = () => {
    try {
      router.push(link);
    } catch (error) {
      throw error;
    }
  };
  return (
    <button
      type="button"
      onClick={linkIsValid ? navTo : onClickExists ? onClick : null}
      className={`btn col-lg-6 col-md-8 col-sm-8 col-10 m-auto py-3 ${background ? background : 'btn-primary-custom'} border-none rounded text-light button-custom-css d-flex flex-row justify-content-center align-items-center gap-2 shadow`}
    >
      {content}
    </button>
  );
};

export default Button;
