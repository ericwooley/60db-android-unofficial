const interval = setInterval(function () {
	if ((window as any).cordova) {
		clearInterval(interval)
		window.open = (window as any).cordova.InAppBrowser.open
		intializePlayerControls()
	}
}, 100);

function intializePlayerControls() {
	const MusicControls = (window as any).MusicControls
	const controls = MusicControls.create({
		track: '60db',        // optional, default : ''
		// artist: 'Muse',                     // optional, default : ''
		cover: 'img/logo.png',      // optional, default : nothing
		// cover can be a local path (use fullpath 'file:///storage/emulated/...', or only 'my_image.jpg' if my_image.jpg is in the www folder of your app)
		//           or a remote url ('http://...', 'https://...', 'ftp://...')
		isPlaying: isPlaying(),                           // optional, default : true
		dismissable: true,                         // optional, default : false

		// hide previous/next/close buttons:
		hasPrev: false,      // show previous button, optional, default: true
		hasNext: false,      // show next button, optional, default: true
		hasClose: true,       // show close button, optional, default: false

		// Android only, optional
		// text displayed in the status bar when the notification (and the ticker) are updated
		// ticker: 'Now playing "Time is Running Out"'
	}, () => {
		console.log('success')
	}, () => {
		console.log('failure')
	});
	setInterval(() => MusicControls.updateIsPlaying(isPlaying()), 100)
	function events(action) {
		switch(action) {
			case 'music-controls-pause':
				if (isPlaying()) {
					togglePlayback()
				}
				break;
			case 'music-controls-play':
				if (!isPlaying()) {
					togglePlayback()
				}
				break;
			case 'music-controls-destroy':
				MusicControls.destroy(() => {
					(navigator as any).app.exitApp();
				}, () => {
					alert('error closing app')
				})
				break;
		}
	}

	// Register callback
	MusicControls.subscribe(events);

	// Start listening for events
	// The plugin will run the events function each time an event is fired
	MusicControls.listen();
}

function getPlayButton () {
	return document.querySelector('[class*="playerButton"] > div > svg')
}

function isPlaying () {
	const path = document.querySelector('[class*="playerButton"] > div > svg > path')
	return !!path && path.getAttribute('d').indexOf('M8') !== 0
}
(window as any).isPlaying = isPlaying

function togglePlayback () {
	const playDomNode = getPlayButton()
	;(window as any).cordova.plugins.Focus.focus(playDomNode);
}
