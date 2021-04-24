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

Handlebars.registerHelper('printPortfolioItem', (item, url) => {
	const aspect = item.dimensions[0] / item.dimensions[1];
	const itemClass =
		aspect > wideAspect
			? global.cssClasses.portfolioItemWide
			: aspect < tallAspect
			? global.cssClasses.portfolioItemTall
			: '';
	const href = `${global.pageURLs.portfolioDetail}?piece=${item.name}&from=${url}`;

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
                    <a class="portfolio__icon icon icon--align-justify" href="${href}">
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
                <span class="portfolio__itemLoadTrack">
                    <span class="portfolio__itemLoadBar portfolio__itemLoadBar--1"></span>
                    <span class="portfolio__itemLoadBar portfolio__itemLoadBar--2"></span>
                </span>
            </div>
        </article>`;
});

Handlebars.registerHelper('isOdd', number => number % 2 === 1);

export const helpers = {
	printSocialIcon: Handlebars.helpers.printSocialIcon,
	printPortfolioItem: Handlebars.helpers.printPortfolioItem,
	isOdd: Handlebars.helpers.isOdd
};
