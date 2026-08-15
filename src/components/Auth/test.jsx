import React from 'react'

function test() {
  return (
    <div className="flex items-center space-x-2 bg-green-500">
      <img src="/Logo_images/logo1.png" alt="LearnStack Logo" className="w-10 h-10" />
      <span className="flex flex-col items-center font-bold text-gray-900 dark:text-white leading-tight">
        <span className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-pink-500 dark:from-blue-700 dark:to-pink-500">LearnStack</span>
        </span>
      </span>
    </div>
  )
}

export default test