import React from "react";
import { KanbanColumnProps } from "../interface/KanbanColumnProps";
import { DropIndicator } from "../card/DropIndicator";

export const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, children}) => (
    <div className="column">
        <h2>{title}</h2>
        {title !== "To Do" && <DropIndicator/>}
        {children}
    </div>
);