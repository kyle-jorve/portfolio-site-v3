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
	header: document.querySelector('#header')
};

const agent = window.navigator.userAgent.toLowerCase();
const android = agent.includes('android');
const search = window.location.search;
const urlParams = new URLSearchParams(search);

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
	const links = Array.from(document.querySelectorAll('a'));

	links.forEach(l => {
		let url = new URL(l.href);

		if (url.pathname.toLowerCase().includes(pageURLs.portfolioDetail) && !url.searchParams.get(searchParams.from)) {
			const sectionID = l.closest('section').id;
			let searchParam = urlParams.get(searchParams.from) ?? window.location.pathname;

			url.searchParams.set(searchParams.from, searchParam);

			if (sectionID && sectionID.length) {
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

// -- PUBLIC -- //
export const global = {
	dataLoc,
	els,
	pageURLs,
	searchParams,
	templateSources,
	urlParams,

	fetchFn,
	getGlobalData,
	removeSearchParams,
	scrollToSection,
	updateLinks,

	get detectTouch() {
		return detectTouch();
	},
	get detectMobile() {
		return detectMobile();
	}
};
