/**
 * Point d'entrée du prérendu.
 *
 * Rend l'application en HTML au moment du build, pour que le fichier livré
 * contienne le texte du site et non une page vide.
 *
 * Décisif ici plus qu'ailleurs : ce site vend du référencement local. Avant ce
 * rendu, il livrait 2 103 caractères, aucune balise h1 et aucun contenu, quand
 * les sites artisans qu'il met en avant en livrent plus de six mille. Les robots
 * d'IA, GPTBot, ClaudeBot, PerplexityBot, n'exécutent pas JavaScript du tout :
 * ils ne voyaient rien.
 */
import { renderToString } from 'react-dom/server';
import App from './App';

export function rendre() {
  return renderToString(<App />);
}
