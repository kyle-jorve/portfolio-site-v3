import { global } from '/dist/scripts/global.js';
import { head } from '/dist/scripts/head.js';
import { loader } from '/dist/scripts/loader.js';
import { helpers } from '/dist/scripts/global-helpers.js';

let data;
let template;

// build the <head>
head.buildHead(global.dataLoc.home);

// build the page
global
	.fetchFn(global.dataLoc.home)
	.then(d => {
		data = d;

		return global.fetchFn(global.dataLoc.portfolio);
	})
	.then(d => {
		data.portfolio.featured = d.items.filter(i => i.featured);
		data.portfolio.featured = data.portfolio.featured.slice(0, data.portfolio.itemsLimit);
		data.portfolio.url = d.url;

		data.portfolio.featured.forEach(f => (f.thumbnail = f.featuredThumbnail));

		return global.fetchFn(global.dataLoc.cv);
	})
	.then(d => {
		for (let prop in d.bio) {
			data.bio[prop] = d.bio[prop];
		}

		data.bio.url = `${d.url}#resume`;

		template = Handlebars.templates[global.templateSources.home](data);

		global.els.header.insertAdjacentHTML('afterend', template);
	})
	.catch(err => console.warn(err))
	.finally(() => {
		loader.init(observeForIntersection);
	});

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
