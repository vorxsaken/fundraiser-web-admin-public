import { createRoot } from 'react-dom/client';
import App from './App';
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";

const container = document.getElementById('root');
const root = createRoot(container!);

document.title = "SMK CSK"
root.render(
  <PrimeReactProvider>
    <App />
  </PrimeReactProvider>
);