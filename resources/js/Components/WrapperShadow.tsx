import React, { ReactNode } from 'react'

type WrapperShadowProps = {
    children: ReactNode;
    className?: string;
}
const WrapperShadow: React.FC<WrapperShadowProps> = ({ children, className }) => {
    return (
        <div className={`shadow-rounded-2 px-4 py-4 rounded-lg mt-4 overflow-auto bg-stone-50 ${className}`}>
            {children}
        </div>
    )
}

export default WrapperShadow