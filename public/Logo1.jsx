import React from 'react'

function Logo1() {
    return (
        <div className="flex items-center space-x-2">
            <img
                src="/Logo_images/logo1.png"
                alt="LearnStack Logo"
                // Mobile: 28px, Tablet: 32px, Desktop: 40px
                className="flex w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 object-contain"
            />
            <span className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                <span className="text-blue-600 dark:text-blue-400">Learn</span>
                <span className="text-pink-500 dark:text-pink-400">Stack</span>
            </span>
        </div>
    )
}

export default Logo1