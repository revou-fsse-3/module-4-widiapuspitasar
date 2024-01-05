import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement>{
    label: string;
    additionalStyle?: string; // Properti tambahan untuk gaya
}

const Button = ({ label, additionalStyle, ...props } : Props) => {
    return (
        <button  {...props} className={`bg-blue-500 hover:bg-blue-700 text-black font-bold py-1 px-2 my-2 rounded mx-1 ${additionalStyle}`}>
            {label}
        </button>
    );
}

export default Button