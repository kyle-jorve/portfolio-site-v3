import { portfolioData } from '/dist/scripts/portfolio-data.js';
import { global } from '/dist/scripts/global.js';
import { head } from '/dist/scripts/head.js';
import { loader } from '/dist/scripts/loader.js';
import { helpers } from '/dist/scripts/global-helpers.js';

const data = {
	title: portfolioData.title,
	items: portfolioData.items,
	url: portfolioData.url
};
const template = Handlebars.templates[global.templateSources.portfolio](data);

// build the page
global.els.header.insertAdjacentHTML('afterend', template);

// initiate loader
loader.init();
