import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/photographicallyyours-invitations/' : '/',
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    open: false,
  },
}));
