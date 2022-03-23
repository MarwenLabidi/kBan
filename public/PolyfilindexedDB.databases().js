/**
 * Polyfill for indexedDB.databases()
 * Safari and some other older browsers that support indexedDB do NOT
 * Support enumerating existing databases. This is problematic when it
 * comes time to cleanup, otherwise we could litter their device with
 * unreferenceable database handles forcing a nuclear browser clear all history.
 */

(function () {
	if (window.indexedDB && typeof window.indexedDB.databases === 'undefined') {
		const LOCALSTORAGE_CACHE_KEY = 'indexedDBDatabases';

		// Store a key value map of databases
		const getFromStorage = () =>
			JSON.parse(window.localStorage[LOCALSTORAGE_CACHE_KEY] || '{}');

		// Write the database to local storage
		const writeToStorage = value =>
			(window.localStorage[LOCALSTORAGE_CACHE_KEY] = JSON.stringify(value));

		IDBFactory.prototype.databases = () =>
			Promise.resolve(
				Object.entries(getFromStorage()).reduce((acc, [name, version]) => {
					acc.push({
						name,
						version
					});
					return acc;
				}, [])
			);

		// Intercept the existing open handler to write our DBs names
		// and versions to localStorage
		const open = IDBFactory.prototype.open;

		IDBFactory.prototype.open = function (...args) {
			const dbName = args[0];
			const version = args[1] || 1;
			const existing = getFromStorage();
			writeToStorage({
				...existing,
				[dbName]: version
			});
			return open.apply(this, args);
		};

		// Intercept the existing deleteDatabase handler remove our
		// dbNames from localStorage
		const deleteDatabase = IDBFactory.prototype.deleteDatabase;

		IDBFactory.prototype.deleteDatabase = function (...args) {
			const dbName = args[0];
			const existing = getFromStorage();
			delete existing[dbName];
			writeToStorage(existing);
			return deleteDatabase.apply(this, args);
		};
	}
})();