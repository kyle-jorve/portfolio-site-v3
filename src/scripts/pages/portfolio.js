import { global } from '/dist/scripts/global.js';
import { head } from '/dist/scripts/head.js';
import { header } from '/dist/scripts/header.js';
import { nav } from '/dist/scripts/nav.js';

let data;
let template;

// build the <head>
head.buildHead(global.dataLoc.portfolio);

// build the <header>
header.buildHeader(global.dataLoc.portfolio);

// build the page
global
	.fetchFn(global.dataLoc.portfolio)
	.then(d => {
		data = {
			title: d.title,
			items: d.items
		};

		template = Handlebars.templates[global.templateSources.portfolio](data);

		global.els.header.insertAdjacentHTML('afterend', template);
	})
	.catch(err => console.warn(err));
