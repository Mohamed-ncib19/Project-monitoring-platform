import { useRouter } from "next/navigation";
import "./button.styles.css";
import { useState, useEffect } from "react";

const Button = ({ content, link }) => {
    const [linkIsValid, setLinkIsValid] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (link) {
            setLinkIsValid(true);
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
        <div className="col-8 col-md-6 col-lg-6 col-xl- mx-auto py-3">
            <button
                type="button"
                onClick={linkIsValid ? navTo : null}
                className="btn col-lg-6 col-md-8 col-sm-8 col-10 m-auto py-2 btn-primary-custom border-none rounded text-light button-custom-css d-flex flex-row justify-content-center align-items-center gap-2"
            >
                {content}
            </button>
        </div>
    );
};

export default Button;
