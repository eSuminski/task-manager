import React from "react";

export interface DropIndicatorProps {
    visible: boolean;
    position?: number;
}

export const DropIndicator: React.FC<DropIndicatorProps> = ({ visible, position }) => {
    if (!visible) return null;

    return (
        <div 
            className="drop-indicator" 
            style={{ 
                top: position !== undefined ? `${position}px` : undefined 
            }}
        />
    );
};