/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import { ExternalLink } from "lucide-react";

const ResourceCard = ({ resource, IconComponent }) => {
    const navigate = useNavigate();

    const getSafeFirstLink = (linkData) => {
        if (!linkData) return null;
        if (typeof linkData === "string") return linkData.split(',')[0].trim();
        if (Array.isArray(linkData) && linkData.length > 0) return String(linkData[0]).trim();
        return String(linkData).trim();
    };

    const firstResourceLink = getSafeFirstLink(resource.Resource_Link);
    const firstYouTubeId = getSafeFirstLink(resource.YouTube_ID);
    const isCourse = resource.Item_Type === "Course";

    let finalHref = firstResourceLink || (firstYouTubeId ? `https://youtube.com/watch?v=${firstYouTubeId}` : "#");

    if (isCourse) {
        finalHref = `/courses?search=${encodeURIComponent(resource.Title)}`;
    }

    const handleClick = (e) => {
        if (isCourse) {
            e.preventDefault();
            navigate(finalHref);
        }
    };

    return (
        <a
            href={finalHref}
            onClick={handleClick}
            target={isCourse ? "_self" : "_blank"}
            rel={isCourse ? "" : "noopener noreferrer"}
            className="group flex flex-col p-6 rounded-2xl bg-white dark:bg-white/[0.03] border border-black/10 dark:border-white/10 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-blue-50 dark:bg-purple-500/20 text-blue-600 dark:text-purple-400">
                    <IconComponent size={24} />
                </div>
                <ExternalLink size={18} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                {resource.Title}
            </h3>

            <div className="flex gap-2 flex-wrap mb-4 mt-2">
                <span className="text-xs font-bold px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-md">
                    {resource.Department || "General"}
                </span>
                <span className="text-xs font-bold px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-md">
                    {resource.Semester ? `Sem ${resource.Semester}` : "Any"}
                </span>
            </div>

            <div className="flex justify-between items-center mt-auto">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {resource.FrontendCategory}
                </span>
                {resource.Date_Added && (
                    <span className="text-xs font-semibold text-gray-400">
                        {new Date(resource.Date_Added).toLocaleDateString()}
                    </span>
                )}
            </div>
        </a>
    );
};

export default ResourceCard;