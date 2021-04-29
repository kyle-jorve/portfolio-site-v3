import { globalData } from '/dist/scripts/global-data.js';
import { portfolioData } from '/dist/scripts/portfolio-data.js';
import { global } from '/dist/scripts/global.js';
import { nav } from '/dist/scripts/nav.js';
import { helpers } from '/dist/scripts/global-helpers.js';

const data = {
	nav: globalData.nav,
	mobileNav: globalData.nav.filter(ni => ni.showInMobileNav),
	social: [
		...globalData.socialIcons.standard,
		{
			name: 'email',
			cssClass: 'envelope',
			url: `mailto:${globalData.email}`
		},
		...globalData.socialIcons.commerce
	],
	recentWork: portfolioData.items.slice(0, globalData.recentWorkLimit)
};
const template = Handlebars.templates[global.templateSources.header](data);

// build the header
function buildHeader() {
	global.els.header.insertAdjacentHTML('afterbegin', template);

	// initialize nav
	if (window.location.pathname.includes(global.pageURLs.portfolioDetail)) {
		nav.initPortfolioDetail();
	} else {
		nav.init();
	}
}

// -- PUBLIC -- //
export const header = {
	buildHeader
};
