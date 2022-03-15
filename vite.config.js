import {
	defineConfig
} from 'vite'

import {
	VitePWA
} from 'vite-plugin-pwa'


export default defineConfig({
	build: {
		minify: 'esbuild',
		target: "esnext"
	},
	plugins: [
		VitePWA({
			mode: "development",
			filename: "sw.js",
			includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
			strategies: "injectManifest",
			registerType: 'autoUpdate',
			injectRegister: "inline",
			manifest: {
				name: 'KBAN',
				short_name: 'KBAN',
				description: 'Project Management App',
				theme_color: '#ffffff',
				icons: [{
						src: 'pwa-192x192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: 'pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
					},
					{
						src: 'pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable',
					}
				]
			},

		})
	],

})