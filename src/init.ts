const interval = setInterval(function () {
	if ((window as any).cordova) {
		clearInterval(interval)
		window.open = (window as any).cordova.InAppBrowser.open
	}
}, 100);

(window as any).pause = () => {
	const playDomNode = document.querySelector('#root > div > div.style__listContainer___1Mr3c > div.style__playerOverlay___3pgyT > div.style__playerBar___1SW-J > div > div > div.style__top___3pOgn > div.style__playerButton___iXq40.style__container___Nm3LT > div > svg')
	;(window as any).cordova.plugins.Focus.focus(playDomNode);
}
