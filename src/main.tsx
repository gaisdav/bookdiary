import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { RouterProvider } from 'react-router-dom';
import PWABadge from './PWABadge.tsx';
import { router } from './routes/router.tsx';
import { Providers } from '@/Providers.tsx';

const root = document.getElementById('root');

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <Providers>
        <RouterProvider router={router} />
        <PWABadge />
      </Providers>
    </React.StrictMode>,
  );
} else {
  throw new Error('Root element not found');
}
