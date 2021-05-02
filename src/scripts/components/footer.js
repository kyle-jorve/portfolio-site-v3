import { globalData } from '/dist/scripts/global-data.js';
import { global } from '/dist/scripts/global.js';
import { helpers } from '/dist/scripts/global-helpers.js';

const yearToken = '[[year]]';
const curYear = new Date().getFullYear();
const data = {
	socialIcons: {
		standard: [
			...globalData.socialIcons.standard,
			{
				name: 'email',
				cssClass: 'envelope',
				url: `mailto:${globalData.email}`
			}
		],
		commerce: globalData.socialIcons.commerce
	},
	copyright: globalData.copyright.replace(yearToken, curYear),
	email: globalData.email
};
const template = Handlebars.templates[global.templateSources.footer](data);

// build the footer
function buildFooter() {
	global.els.footer.insertAdjacentHTML('afterbegin', template);
}

export const footer = {
	buildFooter
};
