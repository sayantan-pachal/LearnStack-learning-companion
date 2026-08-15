import React from 'react'

function Logo1() {
    return (
        <div className="flex items-center space-x-2">
            <img
                src="/Logo_images/logo1.png"
                alt="LearnStack Logo"
                className="flex w-auto h-8 md:w-auto md:h-10 lg:w-auto lg:h-10 object-contain"
            />
            <span className="text-xl md:text-2xl lg:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-pink-500 dark:from-blue-700 dark:to-pink-500">LearnStack</span>
            </span>
        </div>
    )
}

export default Logo1