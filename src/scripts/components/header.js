import { global } from '/src/scripts/global.js';

export const header = (function () {
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
					social: [...d.socialIcons.standard, ...d.socialIcons.commerce]
				};

				return global.fetchFn(dataSrc);
			})
			.then(d => {
				for (let item of data.nav) {
					if (item.url === d.url) {
						item.currentPage = true;

						break;
					}
				}

				template = Handlebars.templates.header(data);

				global.els.header.insertAdjacentHTML('afterbegin', template);
			})
			.catch(err => console.warn(err));
	}

	// -- PUBLIC -- //
	return {
		buildHeader
	};
})();
