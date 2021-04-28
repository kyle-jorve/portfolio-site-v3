import { lightbox } from '/dist/scripts/lightbox.js';
import { loader } from '/dist/scripts/loader.js';

const cssClasses = {
	portfolioItem: 'portfolio__item',
	portfolioItemLoading: 'portfolio__item--loading',
	portfolioItemTall: 'portfolio__item--tall',
	portfolioItemWide: 'portfolio__item--wide'
};
const dataLoc = {
	root: '/dist/abstracts/data/',
	global: 'global.json',
	home: 'home.json',
	portfolio: 'portfolio.json',
	portfolioDetail: 'portfolio-detail.json',
	cv: 'cv.json'
};
const templateSources = {
	// components
	head: 'components/head',
	header: 'components/header',
	footer: 'components/footer',
	lightbox: 'components/lightbox',
	loader: 'components/loader',

	// pages
	home: 'pages/home',
	portfolio: 'pages/portfolio',
	portfolioDetail: 'pages/portfolio-detail',
	cv: 'pages/cv'
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
	loader: document.querySelector('#loader'),
	loaderBottom: document.querySelector('#loaderBottom'),
	scrollAnchors: [document.querySelector('body'), document.querySelector('html')]
};
let search = window.location.search;
let urlParams = new URLSearchParams(search);
let scrollPos;

function updateCurrentSearchParams() {
	search = window.location.search;
	urlParams = new URLSearchParams(search);
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

function setURLSearchParams(link, url) {
	let section;
	let fromSearchParam;
	let sectionSearchParam;

	// set "from" search parameter if it's not already set
	if (!url.searchParams.get(searchParams.from)) {
		fromSearchParam = urlParams.get(searchParams.from) ?? window.location.pathname;

		url.searchParams.set(searchParams.from, fromSearchParam);
	}

	// set "section" search parameter if applicable
	if (!url.searchParams.get(searchParams.section)) {
		section = link.closest('section');

		sectionSearchParam =
			urlParams.get(searchParams.section) ?? (section && section.id && section.id.length ? section.id : '');

		if (sectionSearchParam && sectionSearchParam.length) {
			url.searchParams.set(searchParams.section, sectionSearchParam);
		}
	}

	link.href = decodeURIComponent(url.href);
}

function smoothScroll(event, hashLoc) {
	const hashLocOffset = hashLoc.getBoundingClientRect().top + window.scrollY;

	event.preventDefault();

	window.scrollTo({
		top: hashLocOffset,
		left: 0,
		behavior: 'smooth'
	});
}

function smoothPageTransitions(event, href) {
	event.preventDefault();

	// reveal the loader
	loader.reveal();

	// wait for loader transition to complete, then move on to the destination page
	setTimeout(() => {
		window.location = href;
	}, loader.transDurs.loader);
}

function updateLinks() {
	els.localLinks = Array.from(document.querySelectorAll('a')).filter(
		a => a.href && a.origin === window.location.origin
	);

	els.localLinks.forEach(l => {
		let url = new URL(l.href);
		const originPlusPath = url.origin + url.pathname;
		const curPage = window.location.origin + window.location.pathname;
		const isSamePageHash = l.hash && l.hash.length && originPlusPath === curPage;
		let hashLoc;

		// for all links to portfolio detail pages, update search parameters
		if (url.pathname.toLowerCase().includes(pageURLs.portfolioDetail)) {
			setURLSearchParams(l, url);
		}

		// smooth scroll on hash links
		if (originPlusPath === curPage && url.hash && url.hash.length) {
			hashLoc = document.querySelector(url.hash);

			l.addEventListener('click', event => smoothScroll(event, hashLoc));
		}

		// -- smooth page transitions when clicking local links -- //

		if (!isSamePageHash && (l.target.includes('self') || !l.target || !l.target.length)) {
			l.addEventListener('click', event => smoothPageTransitions(event, url.href));
		}
	});
}

function removeSearchParams() {
	let url = new URL(window.location.href);

	for (let p in searchParams) {
		url.searchParams.delete(searchParams[p]);
	}

	window.history.replaceState({}, document.title, url.href);

	updateCurrentSearchParams();
}

function scrollToSection() {
	const section = window.location.hash.length
		? document.querySelector(window.location.hash)
		: document.querySelector(`#${urlParams.get(searchParams.section)}`);
	let offset;

	if (section) {
		// add a slight delay to allow time for the page to be built
		setTimeout(() => {
			offset = section.getBoundingClientRect().top + window.scrollY;

			window.scrollTo(0, offset);
		}, 100);
	} else {
		// the user keeps being pushed to the middle of the page on load on mobile
		// this is to prevent that
		window.scrollTo(0, 0);
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

function loaded() {
	scrollToSection();

	if (!window.location.pathname.includes(pageURLs.portfolioDetail)) {
		removeSearchParams();
		lightbox.init();
	}

	updateLinks();
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
	loaded,
	removeSearchParams,
	scrollToSection,
	smoothPageTransitions,
	unfixBodyScroll,
	updateLinks
};
