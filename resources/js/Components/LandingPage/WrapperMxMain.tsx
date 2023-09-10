import React, { ReactNode } from 'react'
type WrapperMxMainProps = {
    children: ReactNode,
    className?: string
}
const WrapperMxMain: React.FC<WrapperMxMainProps> = ({ children, className }) => {
    return (
        <div className={`mx-72 ` + className} >
            {children}
        </div >
    )
}

export default WrapperMxMain