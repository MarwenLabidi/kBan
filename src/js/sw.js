// importScripts('https://unpkg.com/dexie@2.0.3/dist/dexie.js');
importScripts('dexie.js');
let projectNameSW = null


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
	if (event.data) {
		if (event.data.nameDataBase) {
			projectNameSW = event.data.nameDataBase;

		}
		if (projectNameSW == null) {
			return
		}



		let version = 1
		const db = new Dexie(projectNameSW);
		db.version(version).stores({
			allEpicsInThisProject: "epic",
			startDaysToColorArr: "startDays",
			endDaysToColorArr: "endDays",
			colorArr: "colorArr",
			kanbanBoardDATA: "kanbanBoardDATA",
			allBugsInThisProject: "allBugsInThisProject",
		});
		if (event.data.epics) {

			(async () => {
				await db.allEpicsInThisProject
					.orderBy('epic')
					.delete();
			})()
			setTimeout(() => {

				(async () => {
					await db.allEpicsInThisProject.put({
						epic: 'epic',
						data: event.data.epics
					});
				})();
			}, 200);
		}

		if (event.data.start) {

			(async () => {
				await db.startDaysToColorArr
					.orderBy('startDays')
					.delete();
			})()

			setTimeout(() => {



				(async () => {
					await db.startDaysToColorArr.put({
						startDays: 'startDays',
						data: event.data.start
					});
				})();
				(async () => {
					await db.endDaysToColorArr.put({
						endDays: 'endDays',
						data: event.data.end
					});
				})();
				(async () => {
					await db.colorArr.put({
						colorArr: 'colorArr',
						data: event.data.color
					});
				})();
			}, 201);
		}
		if (event.data.kban) {

			(async () => {
				await db.kanbanBoardDATA
					.orderBy('kanbanBoardDATA')
					.delete();
			})()
			setTimeout(() => {

				(async () => {
					await db.kanbanBoardDATA.put({
						kanbanBoardDATA: 'kanbanBoardDATA',
						data: event.data.kban
					});
				})();
			}, 200);
		}
		if (event.data.bugs) {
			(async () => {
				await db.allBugsInThisProject
					.orderBy('allBugsInThisProject')
					.delete();
			})()
			setTimeout(() => {

				(async () => {
					await db.allBugsInThisProject.put({
						allBugsInThisProject: 'allBugsInThisProject',
						data: event.data.bugs
					});
				})();
			}, 200);
		}
	}
});