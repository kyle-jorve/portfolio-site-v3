import { global } from './global.js';
import { head } from './head.js';
import { header } from './header.js';

const search = window.location.search;
const urlParams = new URLSearchParams(search);
let data;
let template;

Handlebars.registerHelper('isSlider', media => media.length > 1);

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
	.catch(err => console.warn(err));
