import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement>{
    label: string;
}

const Button = ({label, ...props} : Props) => {

    return (
        <button  {...props} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 my-2 rounded mx-1 ">{label}</button>

    )
}

export default Button