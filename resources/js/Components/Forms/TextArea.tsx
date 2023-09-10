import React from 'react'

const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({ className, ...props }) => {
    return (
        <textarea {...props}
            className={
                'textarea w-full border placeholder:text-base_secondary border-base_secondary' +
                ' dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm ' +
                className
            }
        >
        </textarea>
    )
}

export default TextArea