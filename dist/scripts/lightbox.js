import { global } from '/dist/scripts/global.js';

// add functionality
const dataAttrs = {
	index: 'data-index',
	name: 'data-name'
};
const cssClasses = {
	active: 'active',
	bg: 'lightbox__bg',
	img: 'lightbox__img',
	messageMode: 'lightbox--message',
	sliderMode: 'lightbox--slider'
};
let els;
let transDurs;

function buildLightbox(data = { isPortfolioDetailPage: false }) {
	// build the lightbox
	const template = Handlebars.templates[global.templateSources.lightbox](data);

	global.els.body.insertAdjacentHTML('afterbegin', template);

	// initialize lightbox functionality
	initLightbox();
}

function initLightbox() {
	els = {
		box: document.querySelector('#lightbox'),
		button: document.querySelector('#lbButton'),
		closeBtns: Array.from(document.querySelectorAll('.lightbox__closeBtn')),
		content: document.querySelector('#lbContent'),
		heading: document.querySelector('#lbHeading'),
		imageZoomButtons: Array.from(document.querySelectorAll('.lightbox__imageZoom')),
		overlay: document.querySelector('#lbOverlay'),
		slideZoomButtons: Array.from(document.querySelectorAll('.lightbox__slideZoom')),
		wrapper: document.querySelector('#lbWrapper')
	};
	transDurs = {
		box: parseFloat(window.getComputedStyle(els.box).getPropertyValue('transition-duration')) * 1000,
		wrapper: parseFloat(window.getComputedStyle(els.wrapper).getPropertyValue('transition-duration')) * 1000
	};

	// add event listeners
	eventListeners();

	message({
		heading: 'test heading',
		content: 'test message test test test'
	});
}

function openLightbox(messageMode = false) {
	// add message mode class, if needed
	if (messageMode) {
		els.wrapper.classList.add(cssClasses.messageMode);
	}

	// transition wrapper in
	els.wrapper.classList.add(cssClasses.active);

	// fix body scroll
	global.fixBodyScroll();

	// wait for wrapper transition to conclude, then...
	setTimeout(() => {
		// transition box in
		els.box.classList.add(cssClasses.active);
	}, transDurs.wrapper);
}

function closeLightbox() {
	// transition box out
	els.box.classList.remove(cssClasses.active);

	// un-fix body scroll
	global.unfixBodyScroll();

	// wait for box transition to conclude, then...
	setTimeout(() => {
		// transition wrapper out
		els.wrapper.classList.remove(cssClasses.active);

		// if we're NOT on a portfolio detail page...
		if (!window.location.pathname.includes(global.pageURLs.portfolioDetail)) {
			// wait for wrapper transition to conclude, then...
			setTimeout(() => {
				// remove message mode and slider mode classes, if needed
				els.wrapper.classList.remove(cssClasses.messageMode, cssClasses.sliderMode);

				// remove href from button
				if (els.button) {
					els.button.removeAttribute('href');
				}

				// empty content
				[els.content, els.heading].forEach(el => (el.innerHTML = ''));

				// remove all picture elements
				Array.from(els.wrapper.querySelectorAll('picture')).forEach(p => p.remove());
			}, transDurs.wrapper);
		}
	}, transDurs.box);
}

function makePictureMarkup(data, cssClass) {
	return `
        <picture>
            ${data.media.sources
				.map(s => {
					return `
                    <source srcset="${s.url}" media="(min-width: ${s.minScreenSize}px)">`;
				})
				.join('')}

            <img class="${cssClass}" src="${data.media.mobileSource}" alt="${data.media.alt}">
        </picture>`;
}

function zoomImage(button) {
	const imageName = button.getAttribute(dataAttrs.name);
	const mediaIndex = Number(button.getAttribute(dataAttrs.index));
	const section = button.closest('section');
	const onPortfolioDetailPage = window.location.pathname.includes(global.pageURLs.portfolioDetail);
	let sectionID = section && section.id && section.id.length ? section.id : false;
	let buttonHref = `${global.pageURLs.portfolioDetail}?${global.searchParams.piece}=${imageName}&${
		global.searchParams.from
	}=${window.location.pathname}${sectionID ? `&${global.searchParams.section}=${sectionID}` : ''}`;
	let portfolioItem;
	let imgEl;
	let curBreakpoint = 0;
	let imgBreakpoints;
	let data;
	let imgMarkup;
	let bgMarkup;

	// update button href
	if (els.button) {
		els.button.href = decodeURIComponent(buttonHref);
	}

	// get image data
	global.fetchFn(global.dataLoc.portfolio).then(d => {
		data = d.items.find(i => i.name === imageName);

		data.media = data.media[mediaIndex];

		// build markup
		imgMarkup = makePictureMarkup(data, cssClasses.img);
		bgMarkup = makePictureMarkup(data, cssClasses.bg);

		// inject markup
		els.box.insertAdjacentHTML('beforeend', imgMarkup);
		els.overlay.insertAdjacentHTML('afterbegin', bgMarkup);

		// if we're on a portfolio detail page, just open the lightbox
		if (onPortfolioDetailPage) {
			openLightbox();
		}
		// otherwise, wait for the image to load
		else {
			// initiate portfolio item loader
			portfolioItem = button.closest(`.${global.cssClasses.portfolioItem}`);

			setTimeout(() => {
				portfolioItem.classList.add(global.cssClasses.portfolioItemLoading);
			}, 500);

			// create a new image element
			imgEl = document.createElement('img');

			// update imgEl source
			imgEl.src =
				curBreakpoint === 0
					? data.media.mobileSource
					: data.media.sources.find(src => src.minScreenSize === curBreakpoint).url;

			// find out which image needs to load based on how large the viewport is
			imgBreakpoints = data.media.sources.map(source => source.minScreenSize).sort((a, b) => a - b);

			for (let i = 0; i < imgBreakpoints.length; i++) {
				const br = imgBreakpoints[i];
				const nextBr = imgBreakpoints[i + 1] ?? false;

				if (window.innerWidth > br) {
					if (nextBr && window.innerWidth > nextBr) {
						continue;
					} else {
						curBreakpoint = br;

						break;
					}
				}
			}

			// when image loads, reveal lightbox
			imgEl.addEventListener('load', () => {
				openLightbox();

				setTimeout(() => {
					portfolioItem.classList.remove(global.cssClasses.portfolioItemLoading);
				}, 500);
			});
		}
	});
}

function zoomSlide() {
	els.wrapper.classList.add(cssClasses.sliderMode);

	openLightbox();
}

function message(options) {
	// options is an object with the following properties:
	// - heading: string
	// - content: HTML string

	// inject heading
	els.heading.innerHTML = options.heading;

	// inject content
	els.content.innerHTML = options.content;

	// open the lightbox
	openLightbox(true);
}

function eventListeners() {
	// close the lightbox
	[...els.closeBtns, els.overlay].forEach(el => el.addEventListener('click', closeLightbox));

	// zoom image
	els.imageZoomButtons.forEach(butt => butt.addEventListener('click', () => zoomImage(butt)));

	// zoom slide
	els.slideZoomButtons.forEach(butt => butt.addEventListener('click', zoomSlide));
}

export const lightbox = {
	init: buildLightbox,
	message,

	get els() {
		return els;
	}
};
