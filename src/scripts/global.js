export const global = (function () {
	const dataLoc = {
		root: '/abstracts/data/',
		global: 'global.json',
		home: 'home.json',
		portfolio: 'portfolio.json',
		cv: 'cv.json'
	};
	const templateSources = {
		head: 'head',
		header: 'header',
		footer: 'footer',
		home: 'pages/home',
		portfolio: 'pages/portfolio',
		portfolioDetail: 'pages/portfolio-detail',
		cv: 'pages/cv'
	};
	const els = {
		head: document.querySelector('head'),
		body: document.querySelector('body'),
		header: document.querySelector('#header'),
		footer: document.querySelector('#footer')
	};

	Handlebars.registerHelper('printSocialIcon', item => {
		return `
            <a class="social__item icon icon--${item.name}" href="${item.url}" target="_blank" rel="noopener noreferrer nofollow">
                <span class="icon__text">${item.name}</span>
            </a>`;
	});

	Handlebars.registerHelper('printPortfolioItem', item => {
		return `
            <article class="portfolio__item">
                <div class="portfolio__itemInner">
                    <h3 class="portfolio__itemTitle">${item.title}</h3>
                    <div class="portfolilo__icons">
                        <a class="icon icon--align-justify" href="#">
                            <span class="icon__text">View Description</span>
                        </a>
                        <button class="portfolio__expand icon icon--expand">
                            <span class="icon__text">View Full Screen</span>
                        </button>
                    </div>
                </div>

                <picture>
                    <source srcset="${item.media[0].url}">
                    <img src="${item.media[0].url}" alt="${item.media[0].alt}">
                </picture>
            </article>`;
	});

	function fetchFn(dataSrc) {
		const dataFetch = fetch(`${dataLoc.root}${dataSrc}`).then(res => {
			if (res.ok) {
				return res.json();
			} else {
				throw new Error(`${status}: ${res.statusText}`);
			}
		});

		return dataFetch;
	}

	function getGlobalData() {
		const dataFetch = fetchFn(dataLoc.global);

		return dataFetch;
	}

	// -- PUBLIC -- //
	return {
		dataLoc,
		els,
		templateSources,

		fetchFn,
		getGlobalData
	};
})();
