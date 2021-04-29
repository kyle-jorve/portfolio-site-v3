import { globalData } from '/dist/scripts/global-data.js';
import { global } from '/dist/scripts/global.js';
import { helpers } from '/dist/scripts/global-helpers.js';

const yearToken = '[[year]]';
const curYear = new Date().getFullYear();
let data = {
	socialIcons: globalData.socialIcons,
	copyright: globalData.copyright.replace(yearToken, curYear),
	email: globalData.email
};
let template;

// massage data
data.socialIcons.standard.push({
	name: 'email',
	cssClass: 'envelope',
	url: `mailto:${globalData.email}`
});

// build the footer
function buildFooter() {
	template = Handlebars.templates[global.templateSources.footer](data);

	global.els.footer.insertAdjacentHTML('afterbegin', template);
}

export const footer = {
	buildFooter
};
