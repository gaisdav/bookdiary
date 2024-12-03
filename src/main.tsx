import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { App } from '@/App.tsx';

const root = document.getElementById('root');

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
} else {
  throw new Error('Root element not found');
}
