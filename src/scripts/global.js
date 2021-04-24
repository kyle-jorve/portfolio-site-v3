const cssClasses = {
	portfolioItem: 'portfolio__item',
	portfolioItemLoading: 'portfolio__item--loading',
	portfolioItemTall: 'portfolio__item--tall',
	portfolioItemWide: 'portfolio__item--wide'
};
const dataLoc = {
	root: '/src/abstracts/data/',
	global: 'global.json',
	home: 'home.json',
	portfolio: 'portfolio.json',
	portfolioDetail: 'portfolio-detail.json',
	cv: 'cv.json'
};
const templateSources = {
	head: 'components/head',
	header: 'components/header',
	footer: 'components/footer',
	lightbox: 'components/lightbox',

	home: 'pages/home',
	portfolio: 'pages/portfolio',
	portfolioDetail: 'pages/portfolio-detail',
	cv: 'pages/cv',

	sliderNav: '/partials/slider-navigation'
};
const pageURLs = {
	home: '/',
	portfolio: '/portfolio/',
	portfolioDetail: '/portfolio/detail/',
	cv: '/cv/'
};
const searchParams = {
	from: 'from',
	piece: 'piece',
	section: 'section'
};
const els = {
	body: document.querySelector('body'),
	footer: document.querySelector('#footer'),
	head: document.querySelector('head'),
	header: document.querySelector('#header'),
	scrollAnchors: [document.querySelector('body'), document.querySelector('html')]
};
const agent = window.navigator.userAgent.toLowerCase();
const search = window.location.search;
const urlParams = new URLSearchParams(search);
let scrollPos;

// detect if touch device device
function detectTouch() {
	return 'ontouchstart' in document.documentElement;
}

// detect if mobile device
function detectMobile() {
	return typeof window.orientation !== 'undefined';
}

// global data fetch function
function fetchFn(dataSrc) {
	const dataFetch = fetch(`${dataLoc.root}${dataSrc}`).then(res => {
		if (res.ok) {
			return res.json();
		} else {
			throw new Error(`${status}: ${res.statusText}`);
		}
	});

	return dataFetch;
}

// simple function to grab data from global.json
function getGlobalData() {
	const dataFetch = fetchFn(dataLoc.global);

	return dataFetch;
}

function updateLinks() {
	const links = Array.from(document.querySelectorAll('a')).filter(a => a.href);

	links.forEach(l => {
		let url = new URL(l.href);

		if (url.pathname.toLowerCase().includes(pageURLs.portfolioDetail) && !url.searchParams.get(searchParams.from)) {
			const section = l.closest('section');
			const sectionID = section && section.id && section.id.length ? section.id : false;
			let searchParam = urlParams.get(searchParams.from) ?? window.location.pathname;

			url.searchParams.set(searchParams.from, searchParam);

			if (sectionID) {
				url.searchParams.set(searchParams.section, sectionID);
			}

			l.href = decodeURIComponent(url.href);
		}
	});
}

function removeSearchParams() {
	let url = new URL(window.location.href);

	for (let p in searchParams) {
		url.searchParams.delete(searchParams[p]);
	}

	window.history.replaceState({}, document.title, url.href);
}

function scrollToSection() {
	const section = window.location.hash.length
		? document.querySelector(window.location.hash)
		: document.querySelector(`#${urlParams.get(searchParams.section)}`);
	let offset;

	if (section) {
		offset = section.getBoundingClientRect().top + window.scrollY;

		window.scrollTo(0, offset);
	}
}

// fix scroll anchors
function fixBodyScroll() {
	// define scrollPos
	scrollPos = window.scrollY;

	// style the scrollAnchors
	els.scrollAnchors.forEach(cur => {
		cur.style.position = 'fixed';
		cur.style.top = `-${scrollPos}px`;
		cur.style.overflow = 'hidden';
	});
}

// un-fix scroll anchors
function unfixBodyScroll() {
	// un-style the scrollAnchors
	els.scrollAnchors.forEach(cur => {
		cur.style.position = '';
		cur.style.top = '';
		cur.style.overflow = '';
	});

	// keep window scrolled, though
	window.scroll(0, scrollPos);
}

// -- PUBLIC -- //
export const global = {
	cssClasses,
	dataLoc,
	els,
	pageURLs,
	searchParams,
	templateSources,
	urlParams,

	fetchFn,
	fixBodyScroll,
	getGlobalData,
	removeSearchParams,
	scrollToSection,
	unfixBodyScroll,
	updateLinks,

	get detectTouch() {
		return detectTouch();
	},
	get detectMobile() {
		return detectMobile();
	}
};
