import { ReactNode } from "react";

interface Props{
    border: boolean;
    children: ReactNode;
}

const Card = ({border, children} : Props) => {

    return(
        <div className={`${border && 'rounded border-slate-600 border'} p-4`}>
            {children}
        </div>
    )
        
}    

export default Card