// import { scan } from 'react-scan'; // import this BEFORE react

import ReactDOM from 'react-dom/client';
import './index.scss';
import { App } from '@/App.tsx';
import { useProfileStore } from '@/data/profile/useProfileStore.tsx';
import './lib/i18n/i18n.ts';

const root = document.getElementById('root');

const initProfile = useProfileStore.getState().initProfile;

initProfile();

if (root) {
  ReactDOM.createRoot(root).render(<App />);
} else {
  throw new Error('Root element not found');
}
