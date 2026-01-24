import React from 'react'


function Logo() {
    return (
        <div className="flex items-center space-x-2">
            <img src="/Logo_images/logo1.png" alt="LearnStack Logo" className="w-10 h-10" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
                LearnStack
            </span>
        </div>
    )
}

export default Logo