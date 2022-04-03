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
			strategies: 'injectManifest',
			registerType: 'autoUpdate',
			srcDir: 'src/js/',
			filename: 'sw.js',
			injectRegister: "inline",
			includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
			manifest: {
				name: 'KBAN',
				short_name: 'KABAN',
				description: 'Project Management App',
				theme_color: '#000000.',
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