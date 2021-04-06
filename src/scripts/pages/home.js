import { global } from './global.js';
import { head } from './head.js';
import { header } from './header.js';

let data;
let template;

// build the <head>
head.buildHead(global.dataLoc.home);

// build the <header>
header.buildHeader(global.dataLoc.home);

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

		return global.fetchFn(global.dataLoc.cv);
	})
	.then(d => {
		for (let prop in d.bio) {
			data.bio[prop] = d[prop];
		}

		data.bio.url = d.url;

		template = Handlebars.templates[global.templateSources.home](data);

		global.els.header.insertAdjacentHTML('afterend', template);
	})
	.catch(err => console.warn(err));
