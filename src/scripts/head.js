import * as globalMod from './global.js';

const { global } = globalMod;

export const head = (function () {
	const els = {
		head: document.querySelector('head')
	};
	const seoProps = {
		canonicalUrl: 'canon',
		metaImage: 'metaImage',
		metaDesc: 'metaDesc',
		metaTitle: 'metaTitle'
	};
	let data = {};
	let template;

	function buildHead(dataSrc = false) {
		global
			.getGlobalData()
			.then(d => {
				if (d.seo) {
					data = d.seo;
				}

				if (dataSrc) {
					return global.fetchFn(dataSrc);
				} else {
					throw new Error('No augmenting data, moving on');
				}
			})
			.then(d => {
				if (d.seo) {
					d = d.seo;

					for (let prop in d) {
						if (data.hasOwnProperty(prop)) {
							if (prop === seoProps.canonicalUrl) {
								data[prop] += d[prop];
							}

							if (prop === seoProps.metaImage || prop === seoProps.metaDesc) {
								data[prop] = d[prop];
							}

							if (prop === seoProps.metaTitle) {
								data[prop] += ` | ${d[prop]}`;
							}
						} else {
							data[prop] = d[prop];
						}
					}
				}
			})
			.catch(err => {
				console.warn(err);
			})
			.finally(() => {
				template = Handlebars.templates.head(data);

				els.head.insertAdjacentHTML('afterbegin', template);
			});
	}

	return {
		buildHead
	};
})();
