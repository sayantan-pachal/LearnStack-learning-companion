import React, { useEffect, useState, useRef } from "react";
import { Download, Share2, X, Linkedin, Facebook, Instagram } from "lucide-react";
import { useToast } from "../../components/Other/ToastContext";
import html2canvas from "html2canvas";
import BadgeTemplate from "./BadgeTemplate";

const BadgeModal = ({ badge, user, onClose }) => {
    const showToast = useToast();
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    
    // Create a reference to target the HTML template
    const badgeRef = useRef(null);

    useEffect(() => {
        if (badge) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [badge]);

    if (!badge) return null;

    const badgeName = badge?.badgeTitle || badge?.courseName || badge?.Title || "Skill Badge";
    const shareText = `I just earned the ${badgeName} skill badge on LearnStack! 🚀`;

    const formatName = (name) => {
        if (!name) return "Dedicated Learner";
        return name
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const candidateName = formatName(user?.name);

    // STRICT DATE LOGIC
    const rawDate = badge?.date || badge?.Date;
    let formattedDate = "N/A";
    if (rawDate) {
        const parsedDate = new Date(rawDate);
        if (!isNaN(parsedDate.getTime())) {
            formattedDate = parsedDate.toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
            });
        } else {
            formattedDate = rawDate;
        }
    }

    const qrPayload = `LEARNSTACK BADGE\n\nEarner: ${candidateName}\nSkill: ${badgeName}\nDate: ${formattedDate}`;

    // ==========================================================
    // HTML TO PNG DOWNLOAD LOGIC
    // ==========================================================
    const handleDownloadImage = async () => {
        if (!badgeRef.current) return;
        
        showToast("Generating high-resolution badge...", "success");

        try {
            // Take a snapshot of the HTML element
            const canvas = await html2canvas(badgeRef.current, {
                scale: 3, // Multiplies resolution by 3 for a crisp, HD image
                useCORS: true, // Ensures images and SVGs render correctly
                backgroundColor: null, // Keeps background transparent if needed
            });

            // Convert to PNG and download
            const link = document.createElement("a");
            const cleanFileName = badgeName.replace(/[^a-zA-Z0-9]/g, "-");
            link.download = `${cleanFileName}-Badge.png`;
            link.href = canvas.toDataURL("image/png");
            link.click();
            
        } catch (error) {
            console.error("Error generating image", error);
            showToast("Failed to download image. Try again.", "error");
        }
    };

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
        showToast("Caption copied! Open Instagram to share your badge image.", "success");
        setIsShareModalOpen(false);
    };

    return (
        <div className="fixed inset-0 z-[500] flex justify-center items-start sm:items-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto print:p-0 badge-modal-container">

            <div className="flex flex-col items-center gap-6 w-full max-w-lg my-auto py-8 print:py-0 print:block print:w-auto print:max-w-none relative scrollbar-hide">

                {/* Render your exact HTML template and attach the Ref */}
                <BadgeTemplate
                    badgeRef={badgeRef}
                    candidateName={candidateName}
                    badgeName={badgeName}
                    formattedDate={formattedDate}
                    qrPayload={qrPayload}
                    onClose={onClose}
                />

                <div className="flex flex-col sm:flex-row w-full gap-3 sm:gap-4 print-hide mt-2">
                    <button
                        onClick={handleDownloadImage}
                        className="flex-1 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-xl hover:-translate-y-1"
                    >
                        <Download className="w-5 h-5" /> Download Image
                    </button>
                    <button
                        onClick={() => setIsShareModalOpen(true)}
                        className="flex-1 flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-3.5 rounded-xl font-bold transition-all shadow-xl hover:-translate-y-1 hover:bg-gray-50"
                    >
                        <Share2 className="w-5 h-5" /> Share
                    </button>
                </div>

                {isShareModalOpen && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-2xl shadow-2xl z-[600] w-11/12 max-w-sm text-center border border-gray-100 animate-in zoom-in-95 duration-200 print-hide">
                        <button
                            onClick={() => setIsShareModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Share your Skill</h3>
                        <p className="text-sm text-gray-500 mb-6">Let your network know about your new badge!</p>

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

export default BadgeModal;