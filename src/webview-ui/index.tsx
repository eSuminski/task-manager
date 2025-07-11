import React from 'react';
import { createRoot } from 'react-dom/client';
import { Kanban } from './board/Kanban';
import './styling/style.css';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(<Kanban />);
}
