import { html } from './htm.js';
import ReactDOM from 'https://esm.sh/react-dom/client@18.3.1';
import App from './App.js';

ReactDOM.createRoot(document.getElementById('root')).render(html`<${App} />`);
