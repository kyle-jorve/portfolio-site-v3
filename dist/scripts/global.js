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
const tallAspect = 0.875;
const gumroadSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 226.51 236.1"><defs><style>.gumroad-cls-2{clip-path:url(#clip-path);}</style><clipPath id="clip-path" transform="translate(6.56 2.31)"><path class="gumroad-cls-1" d="M26.27,29.37H178.62a20.12,20.12,0,1,0-.78-16.81H26.27C11.54,12.56,0,23.73,0,38V200.17c0,14.47,12,26.7,26.27,26.7H188.44c14.26,0,25.87-12,25.87-26.7V104a26.11,26.11,0,0,0-25.87-26.27H92.23c-14.69,0-27.1,12-27.1,26.27V134.2c0,14,12.16,25.44,27.1,25.44h33.6a20.13,20.13,0,1,0,.77-16.81H92.23c-4.94,0-10.29-3.3-10.29-8.63V104c0-4.95,4.91-9.46,10.29-9.46h96.21A9.17,9.17,0,0,1,197.5,104v96.21c0,5.36-4.15,9.89-9.06,9.89H26.27c-5,0-9.46-4.62-9.46-9.89V38C16.81,33.08,20.88,29.37,26.27,29.37Zm170.2-18.86a9.62,9.62,0,1,1-9.62,9.61A9.62,9.62,0,0,1,196.47,10.51Zm-52,131.93a9.63,9.63,0,1,1-9.62,9.62A9.62,9.62,0,0,1,144.46,142.44Z"/></clipPath></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="gumroad-cls-1" d="M26.27,29.37H178.62a20.12,20.12,0,1,0-.78-16.81H26.27C11.54,12.56,0,23.73,0,38V200.17c0,14.47,12,26.7,26.27,26.7H188.44c14.26,0,25.87-12,25.87-26.7V104a26.11,26.11,0,0,0-25.87-26.27H92.23c-14.69,0-27.1,12-27.1,26.27V134.2c0,14,12.16,25.44,27.1,25.44h33.6a20.13,20.13,0,1,0,.77-16.81H92.23c-4.94,0-10.29-3.3-10.29-8.63V104c0-4.95,4.91-9.46,10.29-9.46h96.21A9.17,9.17,0,0,1,197.5,104v96.21c0,5.36-4.15,9.89-9.06,9.89H26.27c-5,0-9.46-4.62-9.46-9.89V38C16.81,33.08,20.88,29.37,26.27,29.37Zm170.2-18.86a9.62,9.62,0,1,1-9.62,9.61A9.62,9.62,0,0,1,196.47,10.51Zm-52,131.93a9.63,9.63,0,1,1-9.62,9.62A9.62,9.62,0,0,1,144.46,142.44Z" transform="translate(6.56 2.31)"/><g class="gumroad-cls-2"><rect class="gumroad-cls-1" y="6.95" width="32.15" height="34.29"/><rect class="gumroad-cls-1" y="201.81" width="32.15" height="34.29"/><rect class="gumroad-cls-1" x="194.37" y="201.81" width="32.15" height="34.29"/><rect class="gumroad-cls-1" x="194.37" y="72.66" width="32.15" height="34.29"/><rect class="gumroad-cls-1" x="67.28" y="72.66" width="32.15" height="34.29"/><rect class="gumroad-cls-1" x="67.28" y="135.84" width="32.15" height="34.29"/><rect class="gumroad-cls-1" y="40.57" width="31.52" height="161.91"/><rect class="gumroad-cls-1" x="31.52" y="202.48" width="163.48" height="33.62"/><rect class="gumroad-cls-1" x="195" y="106.28" width="31.52" height="96.2"/><rect class="gumroad-cls-1" x="98.79" y="72.66" width="96.2" height="33.62"/><rect class="gumroad-cls-1" x="67.28" y="106.28" width="31.52" height="30.23"/><polygon class="gumroad-cls-1" points="179 0 179 6.95 31.52 6.95 31.52 40.57 179 40.57 179 47.52 226.51 47.52 226.51 0 179 0"/><polygon class="gumroad-cls-1" points="127.64 130.74 127.64 136.51 98.79 136.51 98.79 170.13 127.64 170.13 127.64 178.01 174.91 178.01 174.91 130.74 127.64 130.74"/></g></g></g></svg>`;

Handlebars.registerHelper('printSocialIcon', item => {
	const itemIsGumroad = item.name.toLowerCase() === 'gumroad';
	const icon = item.icon ?? item.name;

	return `
        <a
            class="social__item${!itemIsGumroad ? ` icon icon--absoluteCenter icon--${icon}` : ''}"
            href="${item.url}"
            target="_blank"
            rel="noopener noreferrer nofollow"
            title="${item.name}">
            ${itemIsGumroad ? gumroadSVG : ''}
            <span class="icon__text">${item.name}</span>
        </a>`;
});

Handlebars.registerHelper('printPortfolioItem', item => {
	const aspect = item.dimensions[0] / item.dimensions[1];
	const itemClass =
		aspect > wideAspect ? cssClasses.portfolioItemWide : aspect < tallAspect ? cssClasses.portfolioItemTall : '';

	return `
        <article class="portfolio__item ${itemClass}">
            <a class="portfolio__itemLink" href="${pageURLs.portfolioDetail}?piece=${item.name}">
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
                    ${item.media[0].sources
						.map(i => {
							return `<source srcset="${i.url}" media="(min-width: ${i.minScreenSize}px)">`;
						})
						.join('')}
                    <img class="portfolio__img portfolio__img--${item.orientation}"
                        src="${item.media[0].mobileSource}"
                        alt="${item.media[0].alt}"
                        width="${item.dimensions[0]}"
                        height="${item.dimensions[1]}">
                </picture>
            </a>
        </article>`;
});

Handlebars.registerHelper('isOdd', number => number % 2 === 1);

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
