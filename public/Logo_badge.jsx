import React from 'react';

function Logo_badge() {
    return (
        <div className="flex items-center justify-center w-full">
            <img
                src="/Logo_images/logo2.png"
                alt="LearnStack Logo"
                className="w-32 h-32 sm:w-40 sm:h-40 print:w-32 print:h-32 object-contain"
            />
        </div>
    );
}

export default Logo_badge;