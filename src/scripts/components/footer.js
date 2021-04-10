import { global } from '/dist/scripts/global.js';

const yearToken = '[[year]]';
const curYear = new Date().getFullYear();
let data;
let template;

// build the footer
global
	.getGlobalData()
	.then(d => {
		data = {
			socialIcons: d.socialIcons,
			copyright: d.copyright.replace(yearToken, curYear)
		};

		template = Handlebars.templates[global.templateSources.footer](data);

		global.els.footer.insertAdjacentHTML('afterbegin', template);
	})
	.catch(err => console.warn(err));
