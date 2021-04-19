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
const cssClasses = {
	portfolioItemTall: 'portfolio__item--tall',
	portfolioItemWide: 'portfolio__item--wide'
};
const els = {
	head: document.querySelector('head'),
	body: document.querySelector('body'),
	header: document.querySelector('#header'),
	footer: document.querySelector('#footer')
};
const wideAspect = 1.333;
const tallAspect = 0.75;
const agent = window.navigator.userAgent.toLowerCase();
const android = agent.includes('android');
const search = window.location.search;
const urlParams = new URLSearchParams(search);

Handlebars.registerHelper('printSocialIcon', item => {
	const itemIsGumroad = item.name.toLowerCase() === 'gumroad';
	const cssClass = item.cssClass ?? item.name;

	return `
        <a
            class="social__item${!itemIsGumroad ? ` icon icon--absoluteCenter icon--${cssClass}` : ''}"
            href="${item.url}"
            target="_blank"
            rel="noopener noreferrer nofollow"
            title="${item.name}">
            ${item.icon ?? ''}
            <span class="icon__text">${item.name}</span>
        </a>`;
});

Handlebars.registerHelper('printPortfolioItem', (item, url) => {
	const aspect = item.dimensions[0] / item.dimensions[1];
	const itemClass =
		aspect > wideAspect ? cssClasses.portfolioItemWide : aspect < tallAspect ? cssClasses.portfolioItemTall : '';

	return `
        <article class="portfolio__item ${itemClass}">
            <a class="portfolio__itemLink" href="${pageURLs.portfolioDetail}?piece=${item.name}&from=${url}">
                <div class="portfolio__itemInner">
                    <h3 class="portfolio__itemTitle">${item.title}</h3>
                    <div class="portfolio__icons">
                        <button class="portfolio__icon icon icon--align-justify" href="#">
                            <span class="icon__text">View Description</span>
                        </button>
                        <button class="portfolio__icon portfolio__expand icon icon--search-plus">
                            <span class="icon__text">View Full Screen</span>
                        </button>
                    </div>
                </div>

                <picture>
                    ${item.thumbnail.sources
						.map(i => {
							return `<source srcset="${i.url}" media="(min-width: ${i.minScreenSize}px)">`;
						})
						.join('')}
                    <img class="portfolio__img portfolio__img--${item.orientation}"
                        src="${item.thumbnail.mobileSource}"
                        alt="${item.thumbnail.alt}"
                        width="${item.dimensions[0]}"
                        height="${item.dimensions[1]}">
                </picture>
            </a>
        </article>`;
});

Handlebars.registerHelper('isOdd', number => number % 2 === 1);

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

// -- PUBLIC -- //
export const global = {
	dataLoc,
	els,
	pageURLs,
	templateSources,
	urlParams,

	fetchFn,
	getGlobalData,

	get detectTouch() {
		return detectTouch();
	},
	get detectMobile() {
		return detectMobile();
	}
};
