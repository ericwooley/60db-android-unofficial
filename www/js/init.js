/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var interval = setInterval(function () {
    if (window.cordova) {
        clearInterval(interval);
        window.open = window.cordova.InAppBrowser.open;
        intializePlayerControls();
    }
}, 100);
function intializePlayerControls() {
    var MusicControls = window.MusicControls;
    var controls = MusicControls.create({
        track: '60db',
        // artist: 'Muse',                     // optional, default : ''
        // cover: 'albums/absolution.jpg',      // optional, default : nothing
        // cover can be a local path (use fullpath 'file:///storage/emulated/...', or only 'my_image.jpg' if my_image.jpg is in the www folder of your app)
        //           or a remote url ('http://...', 'https://...', 'ftp://...')
        isPlaying: isPlaying(),
        dismissable: true,
        // hide previous/next/close buttons:
        hasPrev: false,
        hasNext: false,
        hasClose: true,
    }, function () {
        console.log('success');
    }, function () {
        console.log('failure');
    });
    setInterval(function () { return MusicControls.updateIsPlaying(isPlaying()); }, 100);
    function events(action) {
        switch (action) {
            case 'music-controls-pause':
                if (isPlaying()) {
                    togglePlayback();
                }
                break;
            case 'music-controls-play':
                if (!isPlaying()) {
                    togglePlayback();
                }
                break;
            case 'music-controls-destroy':
                MusicControls.destroy(function () {
                    navigator.app.exitApp();
                }, function () {
                    alert('error closing app');
                });
                break;
        }
    }
    // Register callback
    MusicControls.subscribe(events);
    // Start listening for events
    // The plugin will run the events function each time an event is fired
    MusicControls.listen();
}
function getPlayButton() {
    return document.querySelector('#root > div > div.style__listContainer___1Mr3c > div.style__playerOverlay___3pgyT > div.style__playerBar___1SW-J > div > div > div.style__top___3pOgn > div.style__playerButton___iXq40.style__container___Nm3LT > div > svg');
}
function isPlaying() {
    var path = document.querySelector('#root > div > div.style__listContainer___1Mr3c > div.style__playerOverlay___3pgyT > div.style__playerBar___1SW-J > div > div > div.style__top___3pOgn > div.style__playerButton___iXq40.style__container___Nm3LT > div > svg > path');
    return !!path && path.getAttribute('d').indexOf('M8') !== 0;
}
window.isPlaying = isPlaying;
function togglePlayback() {
    var playDomNode = getPlayButton();
    window.cordova.plugins.Focus.focus(playDomNode);
}


/***/ })
/******/ ]);