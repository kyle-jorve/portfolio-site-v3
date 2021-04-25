import { global } from '/dist/scripts/global.js';
import { head } from '/dist/scripts/head.js';
import { lightbox } from '/dist/scripts/lightbox.js';
import { helpers } from '/dist/scripts/global-helpers.js';
import { detailHelpers } from '/dist/scripts/portfolio-detail-helpers.js';

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
	videoWrp: 'showcase__imgWrp--video',
	slide: 'showcase__slide',
	transOut: 'transOut'
};
let data;
let template;
let els;
let slideTransDur;
let itemIndex;

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
		// initiate lightbox
		lightbox.init(data);

		// initialize slider
		initSlider();
	});

function initSlider() {
	els = {
		arrows: Array.from(document.querySelectorAll('.slider__arrow')),
		bgs: Array.from(document.querySelectorAll(`.${cssClasses.bg}`)),
		dots: Array.from(document.querySelectorAll(`.${cssClasses.dot}`)),
		showcaseSlider: document.querySelector('#showcaseSlider')
	};

	els.showcaseSlides = Array.from(els.showcaseSlider.querySelectorAll(`.${cssClasses.slide}`));

	els.lightboxSlides = Array.from(lightbox.els.wrapper.querySelectorAll(`.${cssClasses.slide}`));

	slideTransDur =
		parseFloat(window.getComputedStyle(els.showcaseSlides[0]).getPropertyValue('transition-duration')) * 1000;

	// add event listeners
	if (els.showcaseSlides.length > 1) {
		// add click events for slide arrows
		els.arrows.forEach(a => a.addEventListener('click', () => arrowHandler(a)));

		// add click events for dots
		els.dots.forEach(dot => dot.addEventListener('click', () => dotHandler(dot)));
	}
}

function arrowHandler(arrow) {
	const direction = arrow.getAttribute(dataAttrs.dir);
	const activeIndex = Number(
		els.showcaseSlides.find(s => s.hasAttribute(dataAttrs.active)).getAttribute(dataAttrs.index)
	);
	let destination = {};

	// get destination slide
	if (direction === directions.prev) {
		destination.slide = els.showcaseSlides[activeIndex - 1]
			? [els.showcaseSlides[activeIndex - 1], els.lightboxSlides[activeIndex - 1]]
			: [els.showcaseSlides[els.showcaseSlides.length - 1], els.lightboxSlides[els.showcaseSlides.length - 1]];
	} else {
		destination.slide = els.showcaseSlides[activeIndex + 1]
			? [els.showcaseSlides[activeIndex + 1], els.lightboxSlides[activeIndex + 1]]
			: [els.showcaseSlides[0], els.lightboxSlides[0]];
	}

	// set destination index, dot, and bg
	destination.index = Number(destination.slide[0].getAttribute(dataAttrs.index));

	destination.dot = els.dots.filter(d => d.getAttribute(dataAttrs.index) == destination.index);

	destination.bg = els.bgs.filter(bg => bg.getAttribute(dataAttrs.index) == destination.index);

	moveSlides(destination);
}

function dotHandler(dot) {
	let destination = {
		dot: els.dots.filter(d => d.getAttribute(dataAttrs.index) == dot.getAttribute(dataAttrs.index))
	};

	// set destination index, slide, and bg
	destination.index = Number(dot.getAttribute(dataAttrs.index));

	destination.slide = [...els.showcaseSlides, ...els.lightboxSlides].filter(
		s => s.getAttribute(dataAttrs.index) == destination.index
	);

	destination.bg = els.bgs.filter(bg => bg.getAttribute(dataAttrs.index) == destination.index);

	moveSlides(destination);
}

function moveSlides(destination) {
	// destination has the following properties:
	// - dot: array of DOM elements
	// - slide: array of DOM elements
	// - bg: array of DOM elements
	// - index: number, index of destination slide

	const active = {
		bg: els.bgs.filter(bg => bg.hasAttribute(dataAttrs.active)),
		dot: els.dots.filter(d => d.hasAttribute(dataAttrs.active)),
		slide: [...els.showcaseSlides, ...els.lightboxSlides].filter(s => s.hasAttribute(dataAttrs.active))
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
	// - dot: array of DOM elements
	// - slide: array of DOM elements
	// - bg: array of DOM elements
	// - index: number, index of currently active slide

	active.slide.forEach(sl => sl.classList.add(cssClasses.transOut));

	[...active.slide, ...active.dot, ...active.bg].forEach(el => {
		el.classList.remove(cssClasses.active);
		el.removeAttribute(dataAttrs.active);
	});

	setTimeout(() => {
		active.slide.forEach(sl => sl.classList.remove(cssClasses.transOut));
	}, slideTransDur);
}

function activateSlide(destination) {
	// destination has the following properties:
	// - dot: array of DOM elements
	// - slide: array of DOM elements
	// - bg: array of DOM elements

	[...destination.dot, ...destination.slide].forEach(el => {
		el.classList.add(cssClasses.active);
		el.setAttribute(dataAttrs.active, true);
	});
}

function activateBg(bgs) {
	bgs.forEach(bg => {
		bg.classList.add(cssClasses.active);
		bg.setAttribute(dataAttrs.active, true);
	});
}

export const portfolioDetail = {
	dataAttrs,
	directions,
	cssClasses
};
