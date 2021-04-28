import { global } from '/dist/scripts/global.js?v=1.0.2';
import { nav } from '/dist/scripts/nav.js';
import { helpers } from '/dist/scripts/global-helpers.js';

let data;
let template;

// build the header
function buildHeader() {
	global
		.getGlobalData()
		.then(d => {
			data = {
				nav: d.nav,
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

			data.mobileNav = d.nav.filter(ni => ni.showInMobileNav);

			return global.fetchFn(global.dataLoc.portfolio);
		})
		.then(d => {
			data.recentWork = d.items.slice(0, data.recentWorkLimit);

			// build header
			template = Handlebars.templates[global.templateSources.header](data);

			global.els.header.insertAdjacentHTML('afterbegin', template);
		})
		.catch(err => console.warn(err))
		.finally(() => {
			// initialize nav
			if (window.location.pathname.includes(global.pageURLs.portfolioDetail)) {
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
