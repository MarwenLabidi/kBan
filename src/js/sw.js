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


self.addEventListener('message', (event) => {
	if (event.data && event.data.type === 'MESSAGE_IDENTIFIER') {
		// do something
		console.log(`message received`);
		console.log(event.data.msg);
	}
});