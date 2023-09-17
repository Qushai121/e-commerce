import React, { ButtonHTMLAttributes } from 'react'

type ButtonMainProps = {
    variant?: 'border' | 'no_border',
} & ButtonHTMLAttributes<HTMLButtonElement>

const ButtonMain: React.FC<ButtonMainProps> = ({ variant = 'border', className = '', disabled, children, ...props }) => {

    const variants = {
        border: 'disabled:bg-stone-100 border-2 border-green-500 w-full duration-300 text-green-500 font-semibold h-[2.5rem] rounded-lg hover:bg-green-100 active:bg-green-500 active:text-white',
        no_border: 'disabled:bg-stone-100 bg-green-500 w-full duration-300 text-white font-semibold h-[2.5rem] rounded-lg hover:bg-green-600 active:bg-white active:text-green-600',
    }[variant];

    return (
        <button
            {...props}
            className={
                ` ${variants}  ` + className
            }
            disabled={disabled}
        >
            <div className='flex gap-3 h-full w-full justify-center items-center'>
                {
                    disabled ?
                        <span className="loading loading-spinner loading-xs bg-green-600"></span>
                        :
                        <p className='w-full'>
                            {children}
                        </p>
                }
            </div>
        </button>
    )
}

export default ButtonMain