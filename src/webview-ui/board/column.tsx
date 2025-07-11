import React from "react";

interface KanbanColumnProps {
    title: string;
    children?: React.ReactNode;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, children}) => (
    <div className="column">
        <h2>{title}</h2>
        {children}
    </div>
);