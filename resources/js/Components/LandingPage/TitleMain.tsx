import React, { ReactNode } from 'react'

type TitleMainProps = {
    className?: string,
    children: string | ReactNode
}
const TitleMain: React.FC<TitleMainProps> = ({ className, children }) => {
    return (
        <h1 className={'text-lg font-montserrat font-semibold text-base_four ' + className}>{children}</h1>
    )
}

export default TitleMain