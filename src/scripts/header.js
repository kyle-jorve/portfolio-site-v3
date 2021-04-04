import { global } from './global.js';

let data;
let template;

global.fetchFn(global.dataLoc.global).then(d => {
	data = {
		nav: d.nav,
		social: [...d.socialIcons.standard, ...d.socialIcons.commerce]
	};

	template = Handlebars.templates.header(data);

	global.els.body.insertAdjacentHTML('afterbegin', template);
});
