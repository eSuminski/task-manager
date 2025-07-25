import React from "react";
import { KanbanColumnProps } from "../interface/KanbanColumnProps";

export const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, children}) => (
    <div className="column">
        <h2>{title}</h2>
        {children}
    </div>
);