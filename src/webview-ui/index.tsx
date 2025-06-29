import React from 'react';
import { createRoot } from 'react-dom/client';
import { Kanban } from './Kanban';
import './style.css';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(<Kanban />);
}
