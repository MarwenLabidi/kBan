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


// Auto update for new content
self.skipWaiting()
clientsClaim()