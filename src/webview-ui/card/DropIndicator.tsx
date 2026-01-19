import React from "react";

export interface DropIndicatorProps {
    position?: number;
}

export const DropIndicator: React.FC<DropIndicatorProps> = ({ position }) => {

    const [isVisible, setIsVisible] = React.useState(true);

    if (!isVisible) return null;

    return (
        <div className="drop-indicator" />
    );
};