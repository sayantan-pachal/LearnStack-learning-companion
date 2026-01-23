import React from 'react'

function Community() {
  return (
    <div className="pt-24 px-4 pb-20 dark:bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            Welcome to LearnStack Community
          </h1>
          <p className="text-xl md:text-2xl mb-8 dark:text-gray-300 text-gray-700">
            Your student-friendly learning companion
          </p>
          <p className="text-lg max-w-2xl mx-auto dark:text-gray-400 text-gray-600">
            Access educational resources, skill-building materials, and guided learning paths 
            to help you grow academically and practically. Whether you're a beginner or looking to enhance your skills,
          </p>
        </div>
        <div className="mt-20 text-center">
          <p className={`text-sm text-gray-500`}>
            ↓ Scroll down to see the header blur effect ↓
          </p>
        </div>

        <div className="mt-96 h-screen"></div>
    </div>
  )
}

export default Community