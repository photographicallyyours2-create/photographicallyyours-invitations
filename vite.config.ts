import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/photographicallyyours-invitations/' : '/',
  plugins: [
    react(),
    {
      name: 'wedding-persistence-api',
      configureServer(server) {
        server.middlewares.use('/api/save-wedding-data', (req, res) => {
          if (req.method === 'POST') {
            let body = '';
            req.on('data', (chunk) => {
              body += chunk;
            });
            req.on('end', () => {
              try {
                const parsed = JSON.parse(body);
                const filePath = path.resolve(__dirname, 'src/data/savedWeddingData.json');
                fs.writeFileSync(filePath, JSON.stringify(parsed, null, 2), 'utf-8');
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(
                  JSON.stringify({
                    success: true,
                    message: 'Saved directly to project files on disk!',
                  })
                );
              } catch (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: String(err) }));
              }
            });
            return;
          }
          res.writeHead(405);
          res.end();
        });

        server.middlewares.use('/api/deploy-live', (req, res) => {
          if (req.method === 'POST') {
            exec('npm run deploy', (error, stdout, stderr) => {
              if (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: stderr || error.message }));
              } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, stdout }));
              }
            });
            return;
          }
          res.writeHead(405);
          res.end();
        });
      },
    },
  ],
  server: {
    host: true,
    port: 3000,
    open: false,
  },
}));
