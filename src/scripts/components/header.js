import { global } from '/dist/scripts/global.js';

let data;
let template;

function getCurrentPage(items, url) {
	for (let item of items) {
		if (item.url === url) {
			item.currentPage = true;

			break;
		}
	}
}

// build the header
function buildHeader(dataSrc) {
	global
		.getGlobalData()
		.then(d => {
			data = {
				nav: d.nav,
				mobileNav: d.mobileNav,
				social: [...d.socialIcons.standard, ...d.socialIcons.commerce],
				recentWorkLimit: d.recentWorkLimit
			};

			return global.fetchFn(global.dataLoc.portfolio);
		})
		.then(d => {
			data.recentWork = d.items.slice(0, data.recentWorkLimit);

			return global.fetchFn(dataSrc);
		})
		.then(d => {
			getCurrentPage(data.nav, d.url);

			getCurrentPage(data.mobileNav, d.url);

			template = Handlebars.templates[global.templateSources.header](data);

			global.els.header.insertAdjacentHTML('afterbegin', template);
		})
		.catch(err => console.warn(err));
}

// -- PUBLIC -- //
export const header = {
	buildHeader
};
