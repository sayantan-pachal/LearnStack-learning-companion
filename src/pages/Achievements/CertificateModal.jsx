import React, { useEffect, useState } from "react";
import { Award, Download, Share2, X, BadgeCheck, Linkedin, Facebook, Instagram } from "lucide-react";
import QRCode from "react-qr-code";
import Logo3 from "../../../public/Logo3";

// IMPORTANT: Adjust this path to wherever your ToastContext is located
import { useToast } from "../../components/Other/ToastContext"; 

const CertificateModal = ({ badge, user, onClose }) => {
    const showToast = useToast();
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    // Prevent background scrolling when modal is open
    useEffect(() => {
        if (badge) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [badge]);

    if (!badge) return null;

    // Triggers the browser's native Print-to-PDF dialogue with Toast
    const handleDownload = () => {
        showToast("Download process is beginning. Preparing PDF...", "success");
        setTimeout(() => {
            window.print();
        }, 800);
    };

    const shareText = `I just earned the ${badge.courseName} certificate on LearnStack! 🚀`;

    const handleShareLinkedIn = () => {
        const url = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(shareText)}`;
        window.open(url, "_blank");
        setIsShareModalOpen(false);
    };

    const handleShareFacebook = () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(shareText)}`;
        window.open(url, "_blank");
        setIsShareModalOpen(false);
    };

    const handleShareInstagram = () => {
        navigator.clipboard.writeText(shareText);
        showToast("Caption copied! Open Instagram to share your certificate image.", "success");
        setIsShareModalOpen(false);
    };

    const formattedDate = badge.date 
        ? new Date(badge.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        : new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    // Function to format name with Capitalized first letters
    const formatName = (name) => {
        if (!name) return "Dedicated Learner";
        return name
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const candidateName = formatName(user?.name);
    const qrPayload = `LEARNSTACK VERIFICATION\n\nCandidate: ${candidateName}\nCourse: ${badge.courseName}\nStatus: Successfully Completed\nDate: ${formattedDate}\nIssuer: LearnStack Platform`;

    return (
        <div className="fixed inset-0 z-[500] flex justify-center items-start sm:items-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto print:p-0 cert-modal-container">
            
            {/* Layout Wrapper */}
            <div className="flex flex-col items-center gap-6 w-full max-w-4xl my-auto py-8 print:py-0 print:block print:w-auto print:max-w-none relative">
                
                {/* 1. The Certificate Area */}
                <div className="bg-white p-8 sm:p-10 md:p-16 rounded-[2rem] w-full relative text-center border-[8px] sm:border-[16px] border-indigo-50 shadow-2xl flex flex-col justify-center items-center overflow-hidden certificate-wrapper">
                    
                    <button 
                        onClick={onClose} 
                        className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors z-20 print-hide"
                    >
                        <X className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>

                    <div className="absolute top-0 left-0 w-32 h-32 sm:w-64 sm:h-64 bg-blue-50 rounded-br-full opacity-50 pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-40 h-40 sm:w-80 sm:h-80 bg-indigo-50 rounded-tl-full opacity-50 pointer-events-none" />
                    
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.03]">
                        <Award className="w-96 h-96 sm:w-[36rem] sm:h-[36rem] text-indigo-900" strokeWidth={0.5} />
                    </div>
                    
                    <div className="relative z-10 w-full flex flex-col items-center mt-4 sm:mt-0">
                        
                        <div className="flex justify-center mb-6 sm:mb-10 print:mb-12">
                            <Logo3 />
                        </div>

                        <h2 className="text-xl sm:text-3xl md:text-5xl font-black text-gray-900 mb-4 sm:mb-6 uppercase tracking-[0.1em] sm:tracking-[0.2em] leading-tight">
                            Certificate of Completion
                        </h2>
                        
                        <p className="text-gray-500 font-bold text-xs sm:text-sm md:text-base mb-4 sm:mb-6 uppercase tracking-widest">
                            This proudly certifies that
                        </p>
                        
                        <h3 className="text-3xl sm:text-5xl md:text-6xl font-serif italic text-indigo-600 mb-6 sm:mb-8 border-b-2 border-indigo-100 inline-block px-4 sm:px-16 pb-2 sm:pb-4 w-full sm:w-auto break-words">
                            {candidateName}
                        </h3>
                        
                        <p className="text-gray-500 font-bold text-xs sm:text-sm md:text-base mb-3 sm:mb-4 uppercase tracking-widest">
                            Has successfully completed the course:
                        </p>
                        
                        <h4 className="text-xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-10 sm:mb-16 px-2 sm:px-4 leading-snug">
                            {badge.courseName}
                        </h4>

                        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end w-full px-4 sm:px-8 md:px-16 pt-6 sm:pt-8 gap-8 sm:gap-0">
                            
                            <div className="text-center sm:text-left w-full sm:w-40 order-2 sm:order-1">
                                <p className="font-bold text-gray-900 text-base sm:text-lg border-b-2 border-gray-300 pb-1 sm:pb-2 mb-1 sm:mb-2 sm:w-32 mx-auto sm:mx-0">
                                    {formattedDate}
                                </p>
                                <p className="text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">Date Earned</p>
                            </div>
                            
                            <div className="flex flex-col items-center order-1 sm:order-2 w-full sm:w-40">
                                <div className="p-2 bg-white border-2 border-gray-200 rounded-xl shadow-sm mb-2 w-[110px]">
                                    <div style={{ height: "auto", margin: "0 auto", maxWidth: "100%", width: "100%" }}>
                                        <QRCode size={256} style={{ height: "auto", maxWidth: "100%", width: "100%" }} value={qrPayload} viewBox={`0 0 256 256`} level="M" />
                                    </div>
                                </div>
                                <p className="text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-center w-full">
                                    Scan to Verify
                                </p>
                            </div>

                            <div className="text-center sm:text-right w-full sm:w-40 order-3 sm:order-3">
                                <p className="flex items-center justify-center sm:justify-end gap-1 font-bold text-gray-900 text-lg sm:text-xl font-serif italic border-b-2 border-gray-300 pb-1 sm:pb-2 mb-1 sm:mb-2">
                                    <span>LearnStack</span>
                                    <BadgeCheck className="w-5 h-5 text-sky-600" />
                                </p>
                                <p className="text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">Authorized By</p>
                            </div>
                            
                        </div>
                    </div>
                </div>

                {/* 2. Action Buttons Area */}
                <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3 sm:gap-4 print-hide mt-2">
                    <button 
                        onClick={handleDownload} 
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-xl hover:-translate-y-1"
                    >
                        <Download className="w-5 h-5" /> Download PDF
                    </button>
                    <button 
                        onClick={() => setIsShareModalOpen(true)}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-3.5 rounded-xl font-bold transition-all shadow-xl hover:-translate-y-1 hover:bg-gray-50"
                    >
                        <Share2 className="w-5 h-5" /> Share
                    </button>
                </div>

                {/* 3. Floating Share Modal */}
                {isShareModalOpen && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-2xl shadow-2xl z-[600] w-11/12 max-w-sm text-center border border-gray-100 animate-in zoom-in-95 duration-200 print-hide">
                        <button 
                            onClick={() => setIsShareModalOpen(false)} 
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Share your Success</h3>
                        <p className="text-sm text-gray-500 mb-6">Let your network know about your new achievement!</p>
                        
                        <div className="flex flex-col gap-3">
                            <button onClick={handleShareLinkedIn} className="flex items-center justify-center gap-3 w-full py-3 bg-[#0A66C2] hover:bg-[#084e96] text-white rounded-xl font-bold transition-colors">
                                <Linkedin className="w-5 h-5" /> Share on LinkedIn
                            </button>
                            <button onClick={handleShareFacebook} className="flex items-center justify-center gap-3 w-full py-3 bg-[#1877F2] hover:bg-[#155dbd] text-white rounded-xl font-bold transition-colors">
                                <Facebook className="w-5 h-5" /> Share on Facebook
                            </button>
                            <button onClick={handleShareInstagram} className="flex items-center justify-center gap-3 w-full py-3 bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-90 text-white rounded-xl font-bold transition-opacity">
                                <Instagram className="w-5 h-5" /> Copy for Instagram
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Print CSS explicitly targeting one perfect landscape page */}
            <style dangerouslySetInnerHTML={{__html: `
                @media print {
                    @page { 
                        size: landscape; 
                        margin: 0 !important; 
                    }
                    html, body {
                        width: 100vw !important;
                        height: 100vh !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        overflow: hidden !important;
                        background: white !important;
                    }
                    body * { visibility: hidden; }
                    
                    .cert-modal-container {
                        position: absolute !important;
                        left: 0 !important;
                        top: 0 !important;
                        width: 100vw !important;
                        height: 100vh !important;
                        background: white !important;
                        display: flex !important; 
                        align-items: center !important;
                        justify-content: center !important;
                        padding: 0 !important;
                        margin: 0 !important;
                    }
                    .cert-modal-container *, .cert-modal-container {
                        visibility: visible;
                    }
                    
                    .certificate-wrapper { 
                        width: 100vw !important; 
                        height: 100vh !important; 
                        max-width: none !important;
                        border: 20px solid #eef2ff !important; 
                        border-radius: 0 !important; 
                        margin: 0 !important;
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
        </div>
    );
};

export default CertificateModal;