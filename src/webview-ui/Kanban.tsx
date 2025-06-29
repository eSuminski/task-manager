import React from 'react';

export const Kanban: React.FC = () => (
  <div className="kanban">
    <div className="column"><h2>TODO</h2></div>
    <div className="column"><h2>DOING</h2></div>
    <div className="column"><h2>DONE</h2></div>
  </div>
);
