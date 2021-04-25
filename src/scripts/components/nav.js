import { global } from '/dist/scripts/global.js';
import { loader } from '/dist/scripts/loader.js';

const cssClasses = {
	active: 'active',
	showNav: 'showNav'
};
let navActive = false;
let els;

function initiateNav() {
	els = {
		body: global.els.body,
		nav: document.querySelector('#mainNav'),
		navButton: document.querySelector('#navBtn'),
		navLI: Array.from(document.querySelectorAll('.header .nav__li')),
		recentWorkItems: Array.from(document.querySelectorAll('.header .portfolio__item')),
		socialIcons: Array.from(document.querySelectorAll('.header .social__item'))
	};
	const navTransitionDur =
		parseFloat(window.getComputedStyle(els.nav).getPropertyValue('transition-duration')) * 1000;

	// -- EVENT LISTENERS -- //
	els.navButton.addEventListener('click', () => {
		// keep the user from clicking on the nav button too rapidly and creating a strange nav state
		els.navButton.style.pointerEvents = 'none';

		// if the nav is currently active...
		if (navActive) {
			// remove classes
			els.navButton.classList.remove(cssClasses.active);
			els.body.classList.remove(cssClasses.showNav);

			// fix body scroll position
			global.unfixBodyScroll();

			// wait until the nav is fully hidden before removing classes from list items, portfolio items, and social icons
			setTimeout(() => {
				[...els.navLI, ...els.recentWorkItems, ...els.socialIcons].forEach(li =>
					li.classList.remove(cssClasses.active)
				);
			}, navTransitionDur);

			// if the nav is NOT currently active...
		} else {
			// add classes
			els.navButton.classList.add(cssClasses.active);
			els.body.classList.add(cssClasses.showNav);

			// fix body scroll position
			global.fixBodyScroll();

			// stagger class additions to list items
			for (let i = 0; i < els.navLI.length; i++) {
				const li = els.navLI[i];
				const delay = i * 100;

				setTimeout(() => {
					li.classList.add(cssClasses.active);
				}, delay);
			}

			// stagger class additions to portfolio items
			for (let i = 0; i < els.recentWorkItems.length; i++) {
				const item = els.recentWorkItems[i];
				const delay = i * 100;

				setTimeout(() => {
					item.classList.add(cssClasses.active);
				}, delay);
			}

			// stagger class additions to social icons
			for (let i = 0; i < els.socialIcons.length; i++) {
				const icon = els.socialIcons[i];
				const delay = i * 100;

				setTimeout(() => {
					icon.classList.add(cssClasses.active);
				}, delay);
			}
		}

		// reinstate clicking on the nav button
		setTimeout(() => {
			els.navButton.style.pointerEvents = '';
		}, navTransitionDur + 300);

		// toggle the boolean
		navActive = !navActive;
	});
}

function initForPortfolioDetail() {
	const button = document.querySelector('#navBtn');
	const search = window.location.search;
	const destination = new URLSearchParams(search).get('from');

	button.addEventListener('click', event => {
		event.preventDefault();

		loader.reveal();

		setTimeout(() => {
			window.location.pathname = destination;
		}, loader.transDurs.loader);
	});
}

export const nav = {
	init: initiateNav,
	initPortfolioDetail: initForPortfolioDetail
};
