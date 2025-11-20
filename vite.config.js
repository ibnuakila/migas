import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.jsx', 'resources/css/app.css'],
            refresh: true,
        }),
        react(),
    ],
    server: {
        host: true,       // allow external access inside Docker
        port: 5173,
        hmr: {
            host: 'localhost',  // <--- IMPORTANT
            protocol: 'ws',
        },
        watch: {
            usePolling: true, // <--- required for Windows + Docker
        },
    },
});
