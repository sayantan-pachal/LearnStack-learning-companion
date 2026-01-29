import React from 'react'

function Logo2() {
  return (
    <div className="flex items-center space-x-2">
      <img src="/Logo_images/logo1.png" alt="LearnStack Logo" className="w-10 h-10" />
      <span className="flex flex-col items-center font-bold text-gray-900 dark:text-white leading-tight">
        <span className="text-lg max-[900px]:text-sm">
          LearnStack
        </span>
        <span className="text-[11px] max-[900px]:text-[12px] text-gray-600 dark:text-gray-300 -mt-1">
          v.0.9.0
        </span>
      </span>
    </div>
  )
}

export default Logo2