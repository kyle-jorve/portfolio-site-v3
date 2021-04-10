const dataLoc = {
	root: '/src/abstracts/data/',
	global: 'global.json',
	home: 'home.json',
	portfolio: 'portfolio.json',
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
const orientations = {
	top: 'top',
	bottom: 'bottom',
	center: 'center'
};
const wideAspect = 1.333;
const tallAspect = 0.875;

Handlebars.registerHelper('printSocialIcon', item => {
	return `
        <a class="social__item icon icon--${item.name}" href="${item.url}" target="_blank" rel="noopener noreferrer nofollow">
            <span class="icon__text">${item.name}</span>
        </a>`;
});

Handlebars.registerHelper('printPortfolioItem', item => {
	const aspect = item.dimensions[0] / item.dimensions[1];
	const itemClass =
		aspect > wideAspect ? cssClasses.portfolioItemWide : aspect < tallAspect ? cssClasses.portfolioItemTall : '';

	return `
        <article class="portfolio__item ${itemClass}">
            <div class="portfolio__itemInner">
                <h3 class="portfolio__itemTitle">${item.title}</h3>
                <div class="portfolio__icons">
                    <a class="portfolio__icon icon icon--align-justify" href="#">
                        <span class="icon__text">View Description</span>
                    </a>
                    <button class="portfolio__icon portfolio__expand icon icon--search-plus">
                        <span class="icon__text">View Full Screen</span>
                    </button>
                </div>
            </div>

            <picture>
                ${item.media[0].sources
					.map(i => {
						return `<source srcset="${i.url}" media="(min-width: ${i.minScreenSize}px)">`;
					})
					.join('')}
                <img class="portfolio__img portfolio__img--${item.orientation}" src="${
		item.media[0].mobileSource
	}" alt="${item.media[0].alt}">
            </picture>
        </article>`;
});

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

function getGlobalData() {
	const dataFetch = fetchFn(dataLoc.global);

	return dataFetch;
}

// -- PUBLIC -- //
export const global = {
	dataLoc,
	els,
	templateSources,

	fetchFn,
	getGlobalData
};
