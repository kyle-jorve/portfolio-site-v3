import * as globalMod from './global.js';

const { global } = globalMod;

let data;
let template;

global.fetchFn(global.dataLoc.global).then(d => {
	data = {
		nav: [],
		social: [...d.social_icons.standard, ...d.social_icons.commerce]
	};

	d.nav.forEach(n => {
		data.nav.push({
			pageName: n.page_name,
			url: n.url
		});
	});

	template = Handlebars.templates.header(data);

	global.els.body.insertAdjacentHTML('afterbegin', template);
});
