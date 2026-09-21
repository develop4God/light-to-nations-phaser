import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    base: './',
    server: {
        port: 8080
    },
    plugins: [
        VitePWA({
            registerType: 'autoUpdate',
            manifest: {
                name: 'Light to Nations',
                short_name: 'LTN',
                description: "A top-down RPG about carrying the gospel across the world's nations.",
                theme_color: '#028af8',
                background_color: '#028af8',
                display: 'fullscreen',
                orientation: 'landscape',
                icons: [
                    {
                        src: 'icons/icon-192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: 'icons/icon-512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    }
                ]
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,png,jpg,svg,json,tmj,tsj,ogg,mp3}']
            }
        })
    ]
});
