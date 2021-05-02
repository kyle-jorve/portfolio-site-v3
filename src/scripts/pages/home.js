import { homeData } from '/dist/scripts/home-data.js';
import { portfolioData } from '/dist/scripts/portfolio-data.js';
import { cvData } from '/dist/scripts/cv-data.js';
import { global } from '/dist/scripts/global.js';
import { head } from '/dist/scripts/head.js';
import { loader } from '/dist/scripts/loader.js';
import { helpers } from '/dist/scripts/global-helpers.js';

let data = homeData;
let template;

data.portfolio.featured = portfolioData.items.filter(item => item.featured).slice(0, data.portfolio.itemsLimit);

data.portfolio.url = portfolioData.url;

for (let prop in cvData.bio) {
	data.bio[prop] = cvData.bio[prop];
}

data.bio.url = `${cvData.url}#resume`;

template = Handlebars.templates[global.templateSources.home](data);

// build the <head>
head.buildHead();

// build the page
global.els.header.insertAdjacentHTML('afterend', template);

// initiate the loader
loader.init(observeForIntersection);

function observeForIntersection() {
	const els = {
		body: global.els.body,
		bio: document.querySelector('#bio'),
		bioItems: [document.querySelector('#bioContent'), document.querySelector('#bioImg')],
		featuredWork: document.querySelector('#featured-work')
	};
	const observerConfig = {
		threshold: 0.4
	};
	const featuredWorkObserver = new IntersectionObserver(featuredWorkIntersectionHandler, observerConfig);
	const bioObserver = new IntersectionObserver(bioIntersectionHandler, observerConfig);
	const activeClass = 'active';

	els.featuredWorkItems = [
		document.querySelector('#featuredHeading'),
		...Array.from(els.featuredWork.querySelectorAll('.portfolio__item'))
	];

	featuredWorkObserver.observe(els.featuredWork);

	bioObserver.observe(els.bio);

	function featuredWorkIntersectionHandler(entries, featuredWorkObserver) {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				for (let i = 0; i < els.featuredWorkItems.length; i++) {
					const item = els.featuredWorkItems[i];
					const delay = 100 * i;

					setTimeout(() => {
						item.classList.add(activeClass);
					}, delay);
				}

				featuredWorkObserver.disconnect();
			}
		});
	}

	function bioIntersectionHandler(entries, bioObserver) {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				for (let i = 0; i < els.bioItems.length; i++) {
					const item = els.bioItems[i];
					const delay = 100 * i;

					setTimeout(() => {
						item.classList.add(activeClass);
					}, delay);
				}

				bioObserver.disconnect();
			}
		});
	}
}
