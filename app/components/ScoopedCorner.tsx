
import React from 'react';

interface ScoopedCornerProps {
    className?: string;
    fillColor?: string;
    // If true, creates a "hole" (mask) matching the path. 
    // If false, draws the solid shape.
    invert?: boolean;
}

const ScoopedCorner: React.FC<ScoopedCornerProps> = ({
    className = "",
    fillColor = "white",
    invert = true
}) => {
    // The user's exact path definition (100x100 coordinate space)
    const userPath = "M9.94,0H60A10,10 0,0,1 70,10V20A10,10 0,0,0 80,30H90A10,10 0,0,1 100,40V90A10,10 0,0,1 90,100H10A10,10 0,0,1 0,90V9.94A9.94,9.94 0,0,1 9.94,0Z";

    // Unique ID for the mask to prevent conflicts if multiple components are used
    const maskId = `scoop-mask-${React.useId().replace(/:/g, '')}`;

    return (
        <svg
            viewBox="0 0 100 100"
            className={className}
            preserveAspectRatio="none"
            style={{ width: '100px', height: '100px' }} // Explicit size matching the path
        >
            {invert ? (
                <>
                    <defs>
                        <mask id={maskId}>
                            {/* White Rect = Visible Area */}
                            <rect width="100" height="100" fill="white" />
                            {/* Black Path = Hidden Area (The Hole) */}
                            <path d={userPath} fill="black" />
                        </mask>
                    </defs>
                    {/* The Fill Layer, Masked */}
                    <rect
                        width="100"
                        height="100"
                        fill={fillColor}
                        mask={`url(#${maskId})`}
                    />
                </>
            ) : (
                <path d={userPath} fill={fillColor} />
            )}
        </svg>
    );
};

export default ScoopedCorner;
