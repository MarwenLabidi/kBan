// importScripts('https://unpkg.com/dexie@2.0.3/dist/dexie.js');
importScripts('dexie.js');



import {
	precacheAndRoute,
	cleanupOutdatedCaches
} from 'workbox-precaching'

import {
	clientsClaim
} from 'workbox-core'

// clean old cache and precache all the files : html ,css,js
cleanupOutdatedCaches()
precacheAndRoute(self.__WB_MANIFEST)


// runtime caching => font caching
import {
	registerRoute
} from 'workbox-routing';
import {
	CacheFirst,
	StaleWhileRevalidate
} from 'workbox-strategies';


// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
registerRoute(
	({
		url
	}) => url.origin === 'https://fonts.googleapis.com',
	new StaleWhileRevalidate({
		cacheName: 'google-fonts-stylesheets',
	})
);

// Cache the underlying font files with a cache-first strategy for 1 year.
registerRoute(
	({
		url
	}) => url.origin === 'https://fonts.gstatic.com',
	new CacheFirst({
		cacheName: 'google-fonts-webfonts',
	})
);


// Auto update for new content ...
self.skipWaiting()
clientsClaim()


// indexDB





self.addEventListener('message', (event) => {
	if (event.data && event.data.type === 'MESSAGE_IDENTIFIER') {
		// do something
		console.log(`message received`);

		let projectName = event.data.nameDataBase;
		let version = 1
		const db = new Dexie(projectName);
		db.version(version).stores({
			epics: "epic",
			kboard: "kboard",
			bugs: "bug"
		});

		(async () => {
			await db.epics.put({
				epic: ['one', 'two', 'three'],

			});
		})();
	}
});