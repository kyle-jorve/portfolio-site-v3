import { global } from './global.js';

let data;
let template;

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
			for (let item of data.nav) {
				if (item.url === d.url) {
					item.currentPage = true;

					break;
				}
			}

			template = Handlebars.templates[global.templateSources.header](data);

			global.els.header.insertAdjacentHTML('afterbegin', template);
		})
		.catch(err => console.warn(err));
}

// -- PUBLIC -- //
export const header = {
	buildHeader
};
