import { lightbox } from '/dist/scripts/lightbox.js';
import { detailHelpers } from '/dist/scripts/portfolio-detail-helpers.js';

const directions = {
	next: 'next',
	prev: 'prev'
};
let els;
let slideTransDur;

function initSlider() {
	// define variables
	els = {
		arrows: Array.from(document.querySelectorAll('.slider__arrow')),
		bgs: Array.from(document.querySelectorAll(`.${detailHelpers.cssClasses.bg}`)),
		dots: Array.from(document.querySelectorAll(`.${detailHelpers.cssClasses.dot}`)),
		lightboxSlides: Array.from(lightbox.els.wrapper.querySelectorAll(`.${detailHelpers.cssClasses.slide}`)),
		showcaseSlider: document.querySelector('#showcaseSlider'),
		showcaseSlides: Array.from(document.querySelectorAll(`#showcaseSlider .${detailHelpers.cssClasses.slide}`))
	};

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
	const direction = arrow.getAttribute(detailHelpers.dataAttrs.dir);
	const activeIndex = Number(
		els.showcaseSlides
			.find(s => s.hasAttribute(detailHelpers.dataAttrs.active))
			.getAttribute(detailHelpers.dataAttrs.index)
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
	destination.index = Number(destination.slide[0].getAttribute(detailHelpers.dataAttrs.index));

	destination.dot = els.dots.filter(d => d.getAttribute(detailHelpers.dataAttrs.index) == destination.index);

	destination.bg = els.bgs.filter(bg => bg.getAttribute(detailHelpers.dataAttrs.index) == destination.index);

	moveSlides(destination);
}

function dotHandler(dot) {
	let destination = {
		dot: els.dots.filter(
			d => d.getAttribute(detailHelpers.dataAttrs.index) == dot.getAttribute(detailHelpers.dataAttrs.index)
		)
	};

	// set destination index, slide, and bg
	destination.index = Number(dot.getAttribute(detailHelpers.dataAttrs.index));

	destination.slide = [...els.showcaseSlides, ...els.lightboxSlides].filter(
		s => s.getAttribute(detailHelpers.dataAttrs.index) == destination.index
	);

	destination.bg = els.bgs.filter(bg => bg.getAttribute(detailHelpers.dataAttrs.index) == destination.index);

	moveSlides(destination);
}

function moveSlides(destination) {
	// destination has the following properties:
	// - dot: array of DOM elements
	// - slide: array of DOM elements
	// - bg: array of DOM elements
	// - index: number, index of destination slide

	const active = {
		bg: els.bgs.filter(bg => bg.hasAttribute(detailHelpers.dataAttrs.active)),
		dot: els.dots.filter(d => d.hasAttribute(detailHelpers.dataAttrs.active)),
		slide: [...els.showcaseSlides, ...els.lightboxSlides].filter(s =>
			s.hasAttribute(detailHelpers.dataAttrs.active)
		)
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

	active.slide.forEach(sl => sl.classList.add(detailHelpers.cssClasses.transOut));

	[...active.slide, ...active.dot, ...active.bg].forEach(el => {
		el.classList.remove(detailHelpers.cssClasses.active);
		el.removeAttribute(detailHelpers.dataAttrs.active);
	});

	setTimeout(() => {
		active.slide.forEach(sl => sl.classList.remove(detailHelpers.cssClasses.transOut));
	}, slideTransDur);
}

function activateSlide(destination) {
	// destination has the following properties:
	// - dot: array of DOM elements
	// - slide: array of DOM elements
	// - bg: array of DOM elements

	[...destination.dot, ...destination.slide].forEach(el => {
		el.classList.add(detailHelpers.cssClasses.active);
		el.setAttribute(detailHelpers.dataAttrs.active, true);
	});
}

function activateBg(bgs) {
	bgs.forEach(bg => {
		bg.classList.add(detailHelpers.cssClasses.active);
		bg.setAttribute(detailHelpers.dataAttrs.active, true);
	});
}

export const slider = {
	init: initSlider
};
