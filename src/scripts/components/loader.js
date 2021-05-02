import { global } from '/dist/scripts/global.js';

const cssClasses = {
	active: 'active',
	hide: 'hide',
	show: 'show',
	track: 'loader__track'
};
const mutationObserverConfig = {
	subtree: true,
	childList: true,
	characterData: true,
	attributes: true
};
const els = {
	loader: document.querySelector('#loader'),
	loaderBottom: document.querySelector('#loaderBottom'),
	track: document.querySelector(`#loader .${cssClasses.track}`)
};
const transDurs = {
	track: parseFloat(window.getComputedStyle(els.track).getPropertyValue('transition-duration')) * 1000,
	loader: parseFloat(window.getComputedStyle(els.loader).getPropertyValue('transition-duration')) * 1000
};
const time = 300; // time to wait to dismiss the loader
let mutationObserver;
let loadTimeout;
let revealLoadBar;

function initLoader(callback = false) {
	mutationObserver = new MutationObserver((mutations, observer) => mutationHandler(mutations, observer, callback));

	// reveal the loader
	revealLoadBar = setTimeout(() => {
		els.track.classList.add(cssClasses.active);
	}, 300);

	// observe the document
	mutationObserver.observe(document, mutationObserverConfig);

	// set timer to dismiss loader
	loadTimeout = setTimeout(() => {
		detectLoad(revealPage, callback);
	}, time);
}

// observe for full page load
function mutationHandler(mutations, observer, callback) {
	// reset timeout
	clearTimeout(loadTimeout);

	loadTimeout = setTimeout(() => {
		detectLoad(revealPage, callback);
	}, time);
}

// detect if images have loaded
function detectLoad(callback1, callback2 = false) {
	const imgs = Array.from(document.querySelectorAll('img'));

	mutationObserver.disconnect();

	if (imgs.some(img => !img.complete)) {
		imgs.forEach(img =>
			img.addEventListener('load', () => {
				if (imgs.every(i => i.complete)) {
					callback1();

					if (callback2) {
						callback2();
					}
				}
			})
		);
	} else {
		callback1();

		if (callback2) {
			callback2();
		}
	}
}

// dismiss loader
function revealPage() {
	// dismiss loader bar
	clearTimeout(revealLoadBar);

	els.track.classList.remove(cssClasses.active);

	// dismiss load overlay
	setTimeout(() => {
		els.loader.classList.add(cssClasses.hide);
	}, transDurs.track);

	// allow smooth page transitions
	els.loaderBottom.classList.add(cssClasses.show);

	// trigger "fully loaded"
	global.loaded();
}

// reveal loader
function revealLoader() {
	els.loaderBottom.classList.add(cssClasses.active);
}

export const loader = {
	init: initLoader,
	dismiss: revealPage,
	reveal: revealLoader,
	detectLoad,

	transDurs
};
