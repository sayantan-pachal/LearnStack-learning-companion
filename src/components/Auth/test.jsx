import React from 'react'

function test() {
  return (
    <div className="animate-in zoom-in-95 fade-in duration-500 flex flex-col items-center justify-center py-10">
                    <img 
                        src="/Svg/Construction.svg" 
                        alt="Building Workspace" 
                        className="w-32 h-32 sm:w-80 sm:h-80 mx-auto mb-2 sm:mb-4 object-contain drop-shadow-xl"
                    />
                    <h2 className="text-xl font-black text-gray-900 dark:text-white mb-2">Setting up your workspace</h2>
                    <p className="text-sm font-bold text-smart-green-600 dark:text-smart-green-400 animate-pulse">
                        Personalizing your dashboard...
                    </p>
                </div>
  )
}

export default test