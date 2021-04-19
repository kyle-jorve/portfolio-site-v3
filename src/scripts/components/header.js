import { global } from '/dist/scripts/global.js';
import { nav } from '/dist/scripts/nav.js';

let data;
let template;

Handlebars.registerHelper('isPortfolioDetailPage', currentPage => {
	return currentPage === global.pageURLs.portfolioDetail;
});

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
				social: [
					...d.socialIcons.standard,
					{
						name: 'email',
						cssClass: 'envelope',
						url: `mailto:${d.email}`
					},
					...d.socialIcons.commerce
				],
				recentWorkLimit: d.recentWorkLimit
			};

			return global.fetchFn(global.dataLoc.portfolio);
		})
		.then(d => {
			data.recentWork = d.items.slice(0, data.recentWorkLimit);

			return global.fetchFn(dataSrc);
		})
		.then(d => {
			data.currentPage = d.url;

			getCurrentPage(data.nav, d.url);

			getCurrentPage(data.mobileNav, d.url);

			template = Handlebars.templates[global.templateSources.header](data);

			global.els.header.insertAdjacentHTML('afterbegin', template);
		})
		.catch(err => console.warn(err))
		.finally(() => {
			if (data.currentPage === global.pageURLs.portfolioDetail) {
				nav.initPortfolioDetail();
			} else {
				nav.init();
			}
		});
}

// -- PUBLIC -- //
export const header = {
	buildHeader
};
