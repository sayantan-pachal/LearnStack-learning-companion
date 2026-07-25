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
            <span className="text-lg md:text-2xl lg:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-pink-500 dark:from-blue-700 dark:to-pink-500">LearnStack</span>
            </span>
        </div>
    )
}

export default Logo1