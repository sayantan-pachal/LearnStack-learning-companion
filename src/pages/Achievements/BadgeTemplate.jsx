import React from "react";
import { ShieldCheck, X } from "lucide-react";
import QRCode from "react-qr-code";
import Logo from "../../../public/Logo_badge";

const BadgeTemplate = ({ candidateName, badgeName, formattedDate, qrPayload, onClose, badgeRef }) => {
    return (
        <>
            {/* 1. The Badge Area - Notice the ref={badgeRef} */}
            <div ref={badgeRef} className="bg-white p-8 md:p-12 print:p-10 rounded-[3rem] w-full relative text-center border-4 border-purple-50 shadow-2xl flex flex-col justify-center items-center overflow-hidden badge-wrapper mx-auto">

                {/* Notice data-html2canvas-ignore="true" so it hides in the PNG download */}
                <button
                    onClick={onClose}
                    data-html2canvas-ignore="true"
                    className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors z-20 print-hide"
                >
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                {/* Modern Abstract Background Elements */}
                <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-br from-purple-50 via-pink-50 to-transparent opacity-80 pointer-events-none" />
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-100 rounded-full blur-3xl opacity-60 pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-60 pointer-events-none" />

                <div className="relative z-10 w-full flex flex-col items-center mt-2">

                    <div className="flex justify-center mb-8">
                        <Logo />
                    </div>

                    <div className="relative flex items-center justify-center w-32 h-32 mb-6">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full blur-lg opacity-40 animate-pulse"></div>
                        <div className="relative w-full h-full bg-gradient-to-br from-white to-purple-50 rounded-full flex items-center justify-center border-4 border-white shadow-xl">
                            <ShieldCheck className="w-14 h-14 text-purple-600" />
                        </div>
                    </div>

                    <h2 className="text-sm font-bold text-purple-600 mb-2 uppercase tracking-[0.2em]">
                        Verified Skill Badge
                    </h2>

                    <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-6 leading-tight px-2">
                        {badgeName}
                    </h3>

                    <div className="w-12 h-1 bg-gray-200 rounded-full mb-6"></div>

                    <p className="text-gray-500 font-medium text-sm mb-1 uppercase tracking-widest">
                        Awarded to
                    </p>

                    <h4 className="text-xl sm:text-2xl font-serif italic text-gray-800 mb-8">
                        {candidateName}
                    </h4>

                    {/* Footer Row with Date and clean QR */}
                    <div className="flex w-full items-center justify-between mt-4 pt-6 border-t border-gray-100">
                        <div className="text-left">
                            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">Issue Date</p>
                            <p className="font-bold text-gray-900 text-sm whitespace-nowrap">
                                {formattedDate}
                            </p>
                        </div>

                        <div className="p-1.5 bg-white border border-gray-100 rounded-lg shadow-sm w-[60px] h-[60px]">
                            <QRCode size={256} style={{ height: "100%", width: "100%" }} value={qrPayload} viewBox={`0 0 256 256`} level="L" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Print CSS targeting a nice portrait card layout */}
            <style dangerouslySetInnerHTML={{
                __html: ` 
                @media print { 
                    @page {  
                        size: portrait;  
                        margin: 0;  
                    } 
                     
                    html, body { 
                        width: 100% !important; 
                        height: 100% !important; 
                        margin: 0 !important; 
                        padding: 0 !important; 
                        background: white !important; 
                        -webkit-print-color-adjust: exact !important; 
                        print-color-adjust: exact !important; 
                    } 
                     
                    body * { visibility: hidden; } 
                     
                    .badge-modal-container { 
                        position: absolute !important; 
                        left: 0 !important; 
                        top: 0 !important; 
                        width: 100% !important; 
                        height: 100% !important; 
                        background: white !important; 
                        display: flex !important;  
                        align-items: center !important; 
                        justify-content: center !important; 
                        padding: 0 !important; 
                        margin: 0 !important; 
                    } 
                     
                    .badge-modal-container *, .badge-modal-container { 
                        visibility: visible; 
                    } 
                     
                    .badge-wrapper {  
                        width: 150mm !important;  
                        height: 200mm !important;  
                        border: 8px solid #fbf5ff !important;  
                        border-radius: 20px !important;  
                        margin: 0 auto !important; 
                        box-shadow: none !important; 
                        box-sizing: border-box !important; 
                        page-break-inside: avoid !important; 
                    } 
                     
                    .print-hide, .print-hide * {  
                        display: none !important;  
                        visibility: hidden !important; 
                    } 
                } 
            `}} />
        </>
    );
};

export default BadgeTemplate;