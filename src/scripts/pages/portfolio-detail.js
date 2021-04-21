import { global } from '/dist/scripts/global.js';
import { head } from '/dist/scripts/head.js';
import { header } from '/dist/scripts/header.js';
import { helpers } from '/dist/scripts/portfolio-detail-helpers.js';

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
	imgWrp: 'showcase__imgWrp',
	transOut: 'transOut'
};
let data;
let template;
let els;
let slideTransDur;
let itemIndex;

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

	// prevent arrow and dot clicks while slides are transitioning
	[...els.arrows, ...els.dots].forEach(el => (el.style.pointerEvents = 'none'));

	// deactivate current slide
	deactivateSlide(active);

	// activate destination bg
	activateBg(destination.bg);

	// activate destination slide
	activateSlide(destination);

	// after active slide has transitioned out...
	setTimeout(() => {
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

	active.slide.classList.add(cssClasses.transOut);

	[active.slide, active.dot, active.bg].forEach(el => {
		el.classList.remove(cssClasses.active);
		el.removeAttribute(dataAttrs.active);
	});

	setTimeout(() => {
		active.slide.classList.remove(cssClasses.transOut);
	}, slideTransDur);
}

function activateSlide(destination) {
	// destination has the following properties:
	// - dot: DOM element
	// - slide: DOM element
	// - bg: DOM element

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
header.buildHeader(global.dataLoc.portfolioDetail);

// build the page
global
	.fetchFn(global.dataLoc.portfolio)
	.then(d => {
		data = d.items.find(i => i.name === global.urlParams.get('piece'));

		itemIndex = d.items.indexOf(data);

		data.neighbors = {
			next: d.items[itemIndex + 1],
			previous: d.items[itemIndex - 1]
		};

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

		// update any links to another portfolio detail page with the existing "from" parameter
		global.updateLinks();

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

export const portfolioDetail = {
	dataAttrs,
	directions,
	cssClasses
};
