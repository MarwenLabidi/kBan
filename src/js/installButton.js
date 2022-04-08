const installButton = document.querySelector('[data-content=install]')
let installPromptEvent;


window.addEventListener('beforeinstallprompt', (event) => {
	installPromptEvent = event;
	// console.log(waiting);
});


installButton.addEventListener('click', () => {
	installPromptEvent.prompt();
});

// window.addEventListener('appinstalled', () => {
// 	btnInstall.remove();
// 	deferredPrompt = null;
// });