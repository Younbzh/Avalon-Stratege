import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

/*
  Le HTML livré contient désormais le site, écrit au build par
  scripts/prerendre.mjs. On l'hydrate donc au lieu de le remplacer : React
  reprend le balisage en place plutôt que de tout reconstruire, ce qui évite un
  clignotement au chargement.
*/
const racine = document.getElementById('root') as HTMLElement;

if (racine.hasChildNodes()) {
  ReactDOM.hydrateRoot(
    racine,
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
} else {
  ReactDOM.createRoot(racine).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
