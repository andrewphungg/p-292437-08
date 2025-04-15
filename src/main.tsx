
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './styles/tailwind.css';
import { ThemeProvider } from './providers/ThemeProvider';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
