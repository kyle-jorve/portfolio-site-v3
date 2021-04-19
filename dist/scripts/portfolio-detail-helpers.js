import { portfolioDetail } from '/dist/scripts/portfolio-detail.js';
import { global } from '/dist/scripts/global.js';

Handlebars.registerHelper('isSlider', media => media.length > 1);

Handlebars.registerHelper('printDots', media => {
	return media
		.map((m, index) => {
			return `
                <button
                    class="${portfolioDetail.cssClasses.dot}${
				index === 0 ? ` ${portfolioDetail.cssClasses.active}` : ''
			}"
                    data-index="${index}"
                    ${index === 0 ? portfolioDetail.dataAttrs.active : ''}>
                    </button>`;
		})
		.join('');
});

Handlebars.registerHelper('printSlides', media => {
	return media
		.map((m, index) => {
			return `
                <div
                    class="showcase__slide${index === 0 ? ` ${portfolioDetail.cssClasses.active}` : ''}"
                    style="z-index: ${media.length - index + 1};"
                    ${portfolioDetail.dataAttrs.index}="${index}"
                    ${index === 0 ? portfolioDetail.dataAttrs.active : ''}>
                    <div class="${portfolioDetail.cssClasses.imgWrp}${
				index === 0 ? ` ${portfolioDetail.cssClasses.active}` : ''
			}">
                        <picture>
                            ${m.sources
								.map(s => {
									return `
                                        <source srcset="${s.url}" media="(min-width: ${s.minScreenSize}px)">`;
								})
								.join('')}                    
                            <img
                                class="showcase__img"
                                src="${m.mobileSource}"
                                alt="${m.alt}">
                        </picture>

                        <div class="showcase__slideIcons">
                            <button class="portfolio__expand portfolio__icon showcase__icon icon icon--zoom">
                                <span class="icon__text">View Full Screen</span>
                            </button>
                        </div>
                    </div>
                </div>`;
		})
		.join('');
});

Handlebars.registerHelper('printBgs', media => {
	return media
		.map((m, index) => {
			return `
            <picture aria-hidden="true">
                ${m.sources
					.map(s => {
						return `
                            <source srcset="${s.url}" media="(min-width: ${s.minScreenSize}px)">`;
					})
					.join('')}
                <img
                    class="${portfolioDetail.cssClasses.bg}${
				index === 0 ? ` ${portfolioDetail.cssClasses.active}` : ''
			}"
                    src="${m.mobileSource}"
                    ${portfolioDetail.dataAttrs.index}="${index}"
                    ${index === 0 ? portfolioDetail.dataAttrs.active : ''}>
            </picture>`;
		})
		.join('');
});

Handlebars.registerHelper('neighbors', item => {
	const entries = Object.entries(item.neighbors);
	const solo = entries.filter(ent => ent[1] ?? false).length < 2;
	let markup = '';

	for (let [key, value] of entries) {
		if (value) {
			markup += `
                <article class="showcase__neighbor showcase__neighbor--${key}${
				solo ? ' showcase__neighbor--solo' : ''
			}">
                    <a
                        class="showcase__neighborLink"
                        href="/portfolio/detail/?piece=${value.name}&from=${global.urlParams.get('from')}">
                        
                        <div class="showcase__neighborImgWrp">
                            <picture>
                                ${value.thumbnail.sources
									.map(s => {
										return `
                                        <source srcset="${s.url}" media="(min-width: ${s.minScreenSize}px)">`;
									})
									.join('')}
                                <img
                                    class="showcase__neighborImg showcase__neighborImg--${value.orientation}"
                                    src="${value.thumbnail.mobileSource}"
                                    alt="${value.thumbnail.alt}">
                            </picture>
                        </div>

                        <div class="showcase__neighborInner">
                            <span
                                class="showcase__neighborArrow circleBtn circleBtn--outlined circleBtn--${
									key === 'previous' ? 'back' : 'forward'
								}">
                            </span>

                            <div class="showcase__neighborContent">
                                <h2 class="showcase__neighborHeading">${key.charAt(0).toUpperCase()}${key.slice(1)}</h2>
                                <h3 class="showcase__neighborTitle">${value.title}</h3>
                            </div>
                        </div>

                    </a>
                </article>`;
		}
	}

	return markup;
});

Handlebars.registerHelper('hasPurchaseLinks', item => {
	return item.purchaseLink || item.downloadLink;
});

export const helpers = {
	hasPurchaseLinks: Handlebars.helpers.hasPurchaseLinks,
	isSlider: Handlebars.helpers.isSlider,
	neighbors: Handlebars.helpers.neighbors,
	printDots: Handlebars.helpers.printDots,
	printSlides: Handlebars.helpers.printSlides,
	printBgs: Handlebars.helpers.printBgs
};
