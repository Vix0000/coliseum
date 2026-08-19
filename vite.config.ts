import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

function pagesBase(): string {
  const fromCi = process.env.PAGES_BASE;
  if (fromCi) {
    return fromCi.endsWith('/') ? fromCi : `${fromCi}/`;
  }

  if (process.env.GITHUB_PAGES !== 'true') {
    return '/';
  }

  const repo = process.env.GITHUB_REPOSITORY;
  if (!repo) {
    return '/';
  }

  const [owner, name] = repo.split('/');
  if (name.toLowerCase() === `${owner.toLowerCase()}.github.io`) {
    return '/';
  }

  return `/${name}/`;
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: pagesBase(),
});

