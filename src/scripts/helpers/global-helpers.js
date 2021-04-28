import { global } from '/dist/scripts/global.js';

const wideAspect = 1.333;
const tallAspect = 0.75;

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

Handlebars.registerHelper('printPortfolioItem', (item, section) => {
	const aspect = item.dimensions[0] / item.dimensions[1];
	const url = window.location.pathname;
	const itemClass =
		aspect > wideAspect
			? global.cssClasses.portfolioItemWide
			: aspect < tallAspect
			? global.cssClasses.portfolioItemTall
			: '';
	const href = `${global.pageURLs.portfolioDetail}?piece=${item.name}&from=${url}${
		section ? `&${global.searchParams.section}=${section}` : ''
	}`;

	return `
        <article class="${global.cssClasses.portfolioItem} ${itemClass}">
            <a class="portfolio__itemLink" href="${href}">
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

            <div class="portfolio__itemInner">
                <h3 class="portfolio__itemTitle">${item.title}</h3>
                <div class="portfolio__icons">
                    <a class="portfolio__icon portfolio__icon--desc icon icon--align-justify" href="${href}">
                        <span class="icon__text">View Description</span>
                    </a>
                    <button
                        class="portfolio__icon lightbox__imageZoom icon icon--search-plus"
                        data-name="${item.name}"
                        data-index="${item.thumbnail.mediaIndex}">

                        <span class="icon__text">View Full Screen</span>
                    </button>
                </div>
            </div>

            <div class="portfolio__itemLoader">
                <span class="loader__track">
                    <span class="loader__bar loader__bar--1"></span>
                    <span class="loader__bar loader__bar--2"></span>
                </span>
            </div>
        </article>`;
});

Handlebars.registerHelper('isOdd', number => number % 2 === 1);

Handlebars.registerHelper('isPortfolioDetailPage', () =>
	window.location.pathname.includes(global.pageURLs.portfolioDetail)
);

Handlebars.registerHelper('currentPage', item => window.location.pathname === item.url);

export const helpers = {
	currentPage: Handlebars.helpers.currentPage,
	isOdd: Handlebars.helpers.isOdd,
	isPortfolioDetailPage: Handlebars.helpers.isPortfolioDetailPage,
	printPortfolioItem: Handlebars.helpers.printPortfolioItem,
	printSocialIcon: Handlebars.helpers.printSocialIcon
};
