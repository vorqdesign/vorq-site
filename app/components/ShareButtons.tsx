"use client";

import React, { useState } from "react";
import { Check, Link as LinkIcon, Linkedin, Facebook, Twitter } from "lucide-react";

interface ShareButtonsProps {
    title: string;
    url?: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false);

    // Use window.location.href if url is not provided (client-side only)
    const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");

    const handleCopy = () => {
        if (!shareUrl) return;
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShare = (platform: string) => {
        if (!shareUrl) return;

        let link = "";
        switch (platform) {
            case "twitter":
                link = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`;
                break;
            case "facebook":
                link = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
                break;
            case "linkedin":
                link = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
                break;
        }

        if (link) {
            window.open(link, "_blank", "width=600,height=400");
        }
    };

    return (
        <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400 font-medium mr-2">Share:</span>

            <button
                onClick={() => handleShare("twitter")}
                aria-label="Share on X (Twitter)"
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-sm font-bold"
            >
                <Twitter size={16} />
            </button>

            <button
                onClick={() => handleShare("facebook")}
                aria-label="Share on Facebook"
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-sm font-bold"
            >
                <Facebook size={16} />
            </button>

            <button
                onClick={() => handleShare("linkedin")}
                aria-label="Share on LinkedIn"
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-sm font-bold"
            >
                <Linkedin size={16} />
            </button>

            <button
                onClick={handleCopy}
                aria-label="Copy Link"
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-sm font-bold relative"
            >
                {copied ? <Check size={16} className="text-green-600" /> : <LinkIcon size={16} />}
            </button>
        </div>
    );
}
