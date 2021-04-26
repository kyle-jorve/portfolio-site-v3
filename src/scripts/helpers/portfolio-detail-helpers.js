import { portfolioDetail } from '/dist/scripts/portfolio-detail.js?v=1.0.0';
import { global } from '/dist/scripts/global.js';

Handlebars.registerHelper('isSlider', media => media.length > 1);

Handlebars.registerHelper('printSliderNav', media => {
	return `
        <div class="slider__arrows">
            <button class="slider__arrow circleBtn circleBtn--prev" data-dir="prev"><span class="icon__text">Previous Slide</span></button>
            <button class="slider__arrow circleBtn circleBtn--next" data-dir="next"><span class="icon__text">Next Slide</span></button>
        </div>

        <div class="slider__dots" id="sliderDots">
            ${media
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
				.join('')}
        </div>`;
});

Handlebars.registerHelper('printSlides', item => {
	function printPicture(media) {
		return `
            <picture>
                ${media.sources
					.map(s => {
						return `
                            <source srcset="${s.url}" media="(min-width: ${s.minScreenSize}px)">`;
					})
					.join('')}
                
                <img
                    class="showcase__img"
                    src="${media.mobileSource}"
                    alt="${media.alt}">
            </picture>`;
	}

	return item.media
		.map((m, index) => {
			return `
                <div
                    class="showcase__slide${index === 0 ? ` ${portfolioDetail.cssClasses.active}` : ''}${
				m.video ? ` ${portfolioDetail.cssClasses.videoSlide}` : ''
			}"
                    style="z-index: ${item.media.length - index + 1};"
                    ${portfolioDetail.dataAttrs.index}="${index}"
                    ${index === 0 ? portfolioDetail.dataAttrs.active : ''}>

                    <div
                        class="${portfolioDetail.cssClasses.imgWrp}${
				index === 0 ? ` ${portfolioDetail.cssClasses.active}` : ''
			}">

                        ${m.video ? m.source : printPicture(m)}

                        <div class="showcase__slideIcons">
                            <button
                                class="lightbox__slideZoom portfolio__icon showcase__icon icon icon--zoom"
                                data-name="${item.name}"
                                data-index="${index}">

                                <span class="icon__text">View Full Screen</span>
                            </button>
                        </div>
                    </div>
                </div>`;
		})
		.join('');
});

Handlebars.registerHelper('printBgs', media => {
	function printPicture(media, index) {
		return `
            <picture aria-hidden="true">
                ${media.sources
					.map(s => {
						return `
                            <source srcset="${s.url}" media="(min-width: ${s.minScreenSize}px)">`;
					})
					.join('')}
                <img
                    class="${portfolioDetail.cssClasses.bg}${
			index === 0 ? ` ${portfolioDetail.cssClasses.active}` : ''
		}"
                    src="${media.mobileSource}"
                    ${portfolioDetail.dataAttrs.index}="${index}"
                    ${index === 0 ? portfolioDetail.dataAttrs.active : ''}>
            </picture>`;
	}

	return media
		.map((m, index) => {
			return m.video ? printPicture(media[m.bgIndex], index) : printPicture(m, index);
		})
		.join('');
});

Handlebars.registerHelper('neighbors', item => {
	const entries = Object.entries(item.neighbors);
	const solo = entries.filter(ent => ent[1] ?? false).length < 2;
	let markup = '';

	function truncateTitle(title) {
		const titleArr = title.split(' ');
		const maxLength = 25;
		let truncTitle = '';

		for (let i = 0; i < titleArr.length; i++) {
			const word = titleArr[i];
			const isLastWord = i === titleArr.length - 1;

			if (truncTitle.length + word.length <= maxLength) {
				truncTitle += `${word}${isLastWord ? '' : ' '}`;
			} else {
				truncTitle = truncTitle.trim();

				if (truncTitle.length < title.length) {
					truncTitle += '...';
				}

				break;
			}
		}

		return truncTitle;
	}

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
                                ${value.detailThumbnail.sources
									.map(s => {
										return `
                                        <source srcset="${s.url}" media="(min-width: ${s.minScreenSize}px)">`;
									})
									.join('')}
                                <img
                                    class="showcase__neighborImg showcase__neighborImg--${value.orientation}"
                                    src="${value.detailThumbnail.mobileSource}"
                                    alt="${value.detailThumbnail.alt}">
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
                                <h3 class="showcase__neighborTitle">${truncateTitle(value.title)}</h3>
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

export const detailHelpers = {
	hasPurchaseLinks: Handlebars.helpers.hasPurchaseLinks,
	isSlider: Handlebars.helpers.isSlider,
	neighbors: Handlebars.helpers.neighbors,
	printDots: Handlebars.helpers.printDots,
	printSlides: Handlebars.helpers.printSlides,
	printBgs: Handlebars.helpers.printBgs
};
