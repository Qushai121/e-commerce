import { InertiaLinkProps, Link } from '@inertiajs/react';
import React, { ReactNode } from 'react';

type LinkMainProps = {
    children: ReactNode | string,
    className?: string,
    variant?: 'border' | 'no_border',
} & InertiaLinkProps

const LinkMain: React.FC<LinkMainProps> = ({ children, className, variant = 'border', ...props }) => {

    const variants = {
        border: 'border-2 border-green-600 py-2 px-4 rounded-lg text-green-600 font-semibold',
        no_border: 'bg-green-600 border-2 border-green-600  py-2 px-4 rounded-lg text-stone-50 font-semibold',
    }[variant];

    return (
        <Link className={variants + ' ' + className} {...props}>
            {children}
        </Link>
    )
}

export default LinkMain