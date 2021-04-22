import { global } from '/dist/scripts/global.js';

const cssClasses = {
	portfolioItemTall: 'portfolio__item--tall',
	portfolioItemWide: 'portfolio__item--wide'
};
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
		aspect > wideAspect ? cssClasses.portfolioItemWide : aspect < tallAspect ? cssClasses.portfolioItemTall : '';

	return `
        <article class="portfolio__item ${itemClass}">
            <a class="portfolio__itemLink" href="${global.pageURLs.portfolioDetail}?piece=${item.name}&from=${url}">
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

export const helpers = {
	printSocialIcon: Handlebars.helpers.printSocialIcon,
	printPortfolioItem: Handlebars.helpers.printPortfolioItem,
	isOdd: Handlebars.helpers.isOdd
};
