import { defineConfig } from 'vite';
import { djangoVitePlugin } from 'django-vite-plugin';

export default defineConfig({
    plugins: [
        djangoVitePlugin({
            input: [
                'front/js/main.jsx',
            ],
            root: './solacode',
        })
    ],
});