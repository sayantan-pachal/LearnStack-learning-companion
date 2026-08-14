import React from 'react'

function Logo3() {
    return (
        <div className="flex items-center space-x-3 sm:space-x-4 print:space-x-4 print:scale-125">
            <img
                src="/Logo_images/logo1.png"
                alt="LearnStack Logo"
                // Shrink-0 and explicit print sizes prevent the logo from compressing in the PDF
                className="w-12 h-12 sm:w-16 sm:h-16 print:w-16 print:h-16 object-contain"
            />
            <span className="text-3xl sm:text-4xl print:text-4xl font-bold text-gray-900 dark:text-white tracking-tight print:text-gray-900">
                <span
                    className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-pink-500"
                    // This inline style forces the printer to render the background gradient
                    style={{ WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }}
                >
                    LearnStack
                </span>
            </span>
        </div>
    )
}

export default Logo3