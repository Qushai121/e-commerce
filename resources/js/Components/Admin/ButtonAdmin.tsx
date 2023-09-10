import { ButtonHTMLAttributes } from 'react';

export default function ButtonAdmin({ className = '', disabled, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center p-2 bg-base_secondary dark:bg-stone-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-base_secondary uppercase tracking-widest hover:bg-stone-700 dark:hover:bg-white focus:bg-stone-700 dark:focus:bg-white active:bg-stone-900 dark:active:bg-stone-300 focus:outline-none focus:ring-2 focus:ring-base_secondary focus:ring-offset-2 dark:focus:ring-offset-base_secondary transition ease-in-out duration-150 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
