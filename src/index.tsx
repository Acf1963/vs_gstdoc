import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Service Worker Registration
// Usamos a URL absoluta baseada no documento para garantir que a origem corresponda
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Resolvemos o caminho do service worker em relação à URL da página atual (window.location.href)
    // Isso evita que caminhos relativos em ambientes de proxy/sandboxed apontem para a origem errada.
    const swUrl = new URL('service-worker.js', window.location.href).href;
    
    navigator.serviceWorker.register(swUrl)
      .then((reg) => {
        console.log('Gestdoc Service Worker registrado com sucesso:', reg.scope);
      })
      .catch((err) => {
        // Registramos o erro detalhado para depuração se falhar
        console.error('Falha ao registrar Gestdoc Service Worker:', err);
      });
  });
}

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js");
}
