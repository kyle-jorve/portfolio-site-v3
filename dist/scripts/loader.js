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
const els = {};
const transDurs = {};
const time = 300; // time to wait to dismiss the loader
let mutationObserver;
let template;
let loadTimeout;
let revealLoadBar;

function initLoader() {
	mutationObserver = new MutationObserver(mutationHandler);

	template = Handlebars.templates[global.templateSources.loader]();

	global.els.loader.insertAdjacentHTML('afterbegin', template);

	els.track = global.els.loader.querySelector(`.${cssClasses.track}`);

	transDurs.track = parseFloat(window.getComputedStyle(els.track).getPropertyValue('transition-duration')) * 1000;
	transDurs.loader =
		parseFloat(window.getComputedStyle(global.els.loader).getPropertyValue('transition-duration')) * 1000;

	// reveal the loader
	revealLoadBar = setTimeout(() => {
		els.track.classList.add(cssClasses.active);
	}, 500);

	// observe the document
	mutationObserver.observe(document, mutationObserverConfig);

	// set timer to dismiss loader
	loadTimeout = setTimeout(() => {
		revealPage();
	}, time);
}

// observe for full page load
function mutationHandler(mutations, observer) {
	// reset timeout
	clearTimeout(loadTimeout);

	loadTimeout = setTimeout(() => {
		detectLoad();
	}, time);
}

// detect if images have loaded
function detectLoad() {
	const imgs = Array.from(document.querySelectorAll('img'));

	mutationObserver.disconnect();

	if (imgs.some(img => !img.complete)) {
		imgs.forEach(img =>
			img.addEventListener('load', () => {
				if (imgs.every(i => i.complete)) {
					revealPage();
				}
			})
		);
	} else {
		revealPage();
	}
}

// dismiss loader
function revealPage() {
	// dismiss loader bar
	clearTimeout(revealLoadBar);

	els.track.classList.remove(cssClasses.active);

	// dismiss load overlay
	setTimeout(() => {
		global.els.loader.classList.add(cssClasses.hide);
	}, transDurs.track);

	// allow smooth page transitions
	global.els.loaderBottom.classList.add(cssClasses.show);

	// trigger "fully loaded"
	global.loaded();
}

// reveal loader
function revealLoader() {
	global.els.loaderBottom.classList.add(cssClasses.active);
}

export const loader = {
	init: initLoader,
	dismiss: revealPage,
	reveal: revealLoader,

	transDurs
};
