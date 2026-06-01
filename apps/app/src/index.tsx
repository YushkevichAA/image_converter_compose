import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import 'rsuite/dist/rsuite.css';
import { App } from './App.tsx';
import { CustomProvider } from 'rsuite';
//
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CustomProvider theme="dark">{<App />}</CustomProvider>
  </StrictMode>,
);
