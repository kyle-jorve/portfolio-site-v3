import { global } from '/dist/scripts/global.js';
import { head } from '/dist/scripts/head.js';
import { header } from '/dist/scripts/header.js';

const dataAttrs = {
	active: 'data-active',
	dir: 'data-dir',
	index: 'data-index'
};
const directions = {
	next: 'next',
	prev: 'prev'
};
const cssClasses = {
	active: 'active',
	bg: 'showcase__bg',
	dot: 'slider__dot',
	imgWrp: 'showcase__imgWrp'
};
const search = window.location.search;
const urlParams = new URLSearchParams(search);
let data;
let template;
let els;
let slideTransDur;

Handlebars.registerHelper('isSlider', media => media.length > 1);

Handlebars.registerHelper('printDots', media => {
	return media
		.map((m, index) => {
			return `
                <button
                    class="${cssClasses.dot}${index === 0 ? ` ${cssClasses.active}` : ''}"
                    data-index="${index}"
                    ${index === 0 ? dataAttrs.active : ''}>
                    </button>`;
		})
		.join('');
});

Handlebars.registerHelper('printSlides', media => {
	return media
		.map((m, index) => {
			return `
                <div
                    class="showcase__slide${index === 0 ? ` ${cssClasses.active}` : ''}"
                    style="z-index: ${media.length - index + 1};"
                    ${dataAttrs.index}="${index}"
                    ${index === 0 ? dataAttrs.active : ''}>
                    <div class="${cssClasses.imgWrp}${index === 0 ? ` ${cssClasses.active}` : ''}">
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
                    class="${cssClasses.bg}${index === 0 ? ` ${cssClasses.active}` : ''}"
                    src="${m.mobileSource}"
                    ${dataAttrs.index}="${index}"
                    ${index === 0 ? dataAttrs.active : ''}>
            </picture>`;
		})
		.join('');
});

function moveSlides(destination) {
	// destination has the following properties:
	// - dot: DOM element
	// - slide: DOM element
	// - bg: DOM element
	// - index: number, index of destination slide

	const active = {
		bg: els.bgs.find(bg => bg.hasAttribute(dataAttrs.active)),
		dot: els.dots.find(d => d.hasAttribute(dataAttrs.active)),
		slide: els.slides.find(s => s.hasAttribute(dataAttrs.active))
	};

	// set active index and bg
	active.index = Number(active.slide.getAttribute(dataAttrs.index));

	// prevent arrow and dot clicks while slides are transitioning
	[...els.arrows, ...els.dots].forEach(el => (el.style.pointerEvents = 'none'));

	// deactivate current slide
	deactivateSlide(active);

	// activate destination bg
	activateBg(destination.bg);

	// after active slide has transitioned out...
	setTimeout(() => {
		// activate destination slide
		activateSlide(destination);

		// allow arrow clicks
		[...els.arrows, ...els.dots].forEach(el => (el.style.pointerEvents = ''));
	}, slideTransDur);
}

function deactivateSlide(active) {
	// active has the following properties:
	// - dot: DOM element
	// - slide: DOM element
	// - bg: DOM element
	// - index: number, index of currently active slide

	[active.slide, active.dot, active.bg].forEach(el => {
		el.classList.remove(cssClasses.active);
		el.removeAttribute(dataAttrs.active);
	});
}

function activateSlide(destination) {
	// destination has the following properties:
	// - dot: DOM element
	// - slide: DOM element
	// - bg: DOM element
	// - index: number, index of destination slide

	[destination.dot, destination.slide].forEach(el => {
		el.classList.add(cssClasses.active);
		el.setAttribute(dataAttrs.active, true);
	});
}

function activateBg(bg) {
	bg.classList.add(cssClasses.active);
	bg.setAttribute(dataAttrs.active, true);
}

// build the <header>
header.buildHeader(global.dataLoc.portfolio);

// build the page
global
	.fetchFn(global.dataLoc.portfolio)
	.then(d => {
		data = d.items.find(i => i.name === urlParams.get('piece'));

		data.seo = {
			canon: `portfolio/detail/?piece=${data.name}`,
			metaTitle: data.title,
			metaImage: data.media[0].url
		};

		// build the <head>
		head.buildHead(false, data.seo);

		// build the page
		template = Handlebars.templates[global.templateSources.portfolioDetail](data);

		global.els.header.insertAdjacentHTML('afterend', template);
	})
	.catch(err => console.warn(err))
	.finally(() => {
		els = {
			bgs: Array.from(document.querySelectorAll(`.${cssClasses.bg}`)),
			dots: Array.from(document.querySelectorAll(`.${cssClasses.dot}`)),
			arrows: Array.from(document.querySelectorAll('.slider__arrow')),
			nextArrow: document.querySelector('#arrowNext'),
			prevArrow: document.querySelector('#arrowPrev'),
			slider: document.querySelector('#showcaseSlider'),
			slides: Array.from(document.querySelectorAll('.showcase__slide'))
		};
		slideTransDur =
			parseFloat(window.getComputedStyle(els.slides[0]).getPropertyValue('transition-duration')) * 1000;

		if (els.slides.length > 1) {
			// add click events for slide arrows
			els.arrows.forEach(a =>
				a.addEventListener('click', () => {
					const direction = a.getAttribute(dataAttrs.dir);
					const activeIndex = Number(
						els.slides.find(s => s.hasAttribute(dataAttrs.active)).getAttribute(dataAttrs.index)
					);
					let destination = {};

					// get destination slide
					if (direction === directions.prev) {
						destination.slide = els.slides[activeIndex - 1] ?? els.slides[els.slides.length - 1];
					} else {
						destination.slide = els.slides[activeIndex + 1] ?? els.slides[0];
					}

					// set destination index, dot, and bg
					destination.index = Number(destination.slide.getAttribute(dataAttrs.index));

					destination.dot = els.dots.find(d => d.getAttribute(dataAttrs.index) == destination.index);

					destination.bg = els.bgs.find(bg => bg.getAttribute(dataAttrs.index) == destination.index);

					moveSlides(destination);
				})
			);

			// add click events for dots
			els.dots.forEach(dot =>
				dot.addEventListener('click', () => {
					let destination = {
						dot
					};

					// set destination index, slide, and bg
					destination.index = Number(dot.getAttribute(dataAttrs.index));

					destination.slide = els.slides.find(s => s.getAttribute(dataAttrs.index) == destination.index);

					destination.bg = els.bgs.find(bg => bg.getAttribute(dataAttrs.index) == destination.index);

					moveSlides(destination);
				})
			);
		}
	});
