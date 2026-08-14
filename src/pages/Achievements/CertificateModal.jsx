import React, { useEffect, useState } from "react";
import { Download, Share2, X, Linkedin, Facebook, Instagram, Info } from "lucide-react";
import { useToast } from "../../components/Other/ToastContext";
import CertificateTemplate from "./CertificateTemplate";

const CertificateModal = ({ badge, user, onClose }) => {
    const showToast = useToast();
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    
    // New state for the custom mobile print warning
    const [isMobileAlertOpen, setIsMobileAlertOpen] = useState(false);

    useEffect(() => {
        if (badge) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [badge]);

    if (!badge) return null;

    // Detect if the user is on a mobile screen (width <= 768px)
    const handleDownloadClick = () => {
        if (window.innerWidth <= 768) {
            setIsMobileAlertOpen(true);
        } else {
            proceedToPrint();
        }
    };

    // The actual print execution
    const proceedToPrint = () => {
        setIsMobileAlertOpen(false);
        showToast("Download process is beginning. Preparing PDF...", "success");
        setTimeout(() => {
            window.print();
        }, 800);
    };

    const courseName = badge.courseName || badge.Title || "Certification";
    const shareText = `I just earned the ${courseName} certificate on LearnStack! 🚀`;

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

    // STRICT DATE LOGIC
    const rawDate = badge.date || badge.Date;
    let formattedDate = "N/A";

    if (rawDate) {
        const parsedDate = new Date(rawDate);
        if (!isNaN(parsedDate.getTime())) {
            formattedDate = parsedDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } else {
            formattedDate = rawDate;
        }
    }

    const formatName = (name) => {
        if (!name) return "Dedicated Learner";
        return name
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const candidateName = formatName(user?.name);
    const qrPayload = `LEARNSTACK VERIFICATION\n\nCandidate: ${candidateName}\nCourse: ${courseName}\nStatus: Successfully Completed\nDate: ${formattedDate}\nIssuer: LearnStack Platform`;

    return (
        <div className="fixed inset-0 z-[500] flex justify-center items-start sm:items-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto print:p-0 cert-modal-container">

            <div className="flex flex-col items-center gap-6 w-full max-w-4xl my-auto py-8 print:py-0 print:block print:w-auto print:max-w-none relative scrollbar-hide">

                <CertificateTemplate
                    candidateName={candidateName}
                    courseName={courseName}
                    formattedDate={formattedDate}
                    qrPayload={qrPayload}
                    onClose={onClose}
                />

                <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3 sm:gap-4 print-hide mt-2">
                    <button
                        onClick={handleDownloadClick}
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

                {/* ======================================================= */}
                {/* CUSTOM MOBILE PRINT ALERT MODAL                         */}
                {/* ======================================================= */}
                {isMobileAlertOpen && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 sm:p-8 rounded-3xl shadow-2xl z-[600] w-11/12 max-w-sm text-center border border-gray-100 animate-in zoom-in-95 duration-200 print-hide">
                        <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-indigo-100">
                            <Info className="w-8 h-8 text-indigo-600" />
                        </div>
                        <h3 className="text-xl font-black text-gray-900 mb-3 tracking-tight">Print Settings</h3>
                        <p className="text-sm text-gray-600 mb-8 font-medium leading-relaxed">
                            For the best layout on a mobile device, please ensure you select 
                            <span className="text-gray-900 font-bold bg-gray-100 px-2 py-0.5 rounded mx-1">A4 Size</span> 
                            and 
                            <span className="text-gray-900 font-bold bg-gray-100 px-2 py-0.5 rounded mx-1">Landscape</span> 
                            in your print settings.
                        </p>

                        <div className="flex flex-col gap-3">
                            <button 
                                onClick={proceedToPrint} 
                                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-colors shadow-lg shadow-indigo-600/20"
                            >
                                Got it, Print Now
                            </button>
                            <button 
                                onClick={() => setIsMobileAlertOpen(false)} 
                                className="w-full py-3.5 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl font-bold transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {/* ======================================================= */}
                {/* SHARE MODAL                                             */}
                {/* ======================================================= */}
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
        </div>
    );
};

export default CertificateModal;