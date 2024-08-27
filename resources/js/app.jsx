import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import React from 'react';
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "@/context";

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Application';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
                <React.StrictMode>
                    <ThemeProvider>
                        <MaterialTailwindControllerProvider>
                            <App {...props} />
                        </MaterialTailwindControllerProvider>
                    </ThemeProvider>
                </React.StrictMode>
                
                );
    },
    progress: {
        color: '#4B5563',
    },
});
