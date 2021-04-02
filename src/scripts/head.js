import * as globalMod from './global.js';

const { global } = globalMod;

export const head = (function () {
	const els = {
		head: document.querySelector('head')
	};
	const seoProps = {
		canonicalUrl: 'canon',
		metaImage: 'meta_image',
		pageDesc: 'meta_desc',
		pageTitle: 'meta_title'
	};
	const reverseProps = {
		canon: 'canonicalUrl',
		meta_image: 'metaImage',
		meta_desc: 'pageDesc',
		meta_title: 'pageTitle'
	};
	let data = {};
	let template;

	function buildHead(dataSrc = false) {
		global
			.getGlobalData()
			.then(d => {
				if (d.seo) {
					data = {
						[reverseProps.canon]: d.seo[seoProps.canonicalUrl],
						[reverseProps.meta_image]: `${d.site_url}${d.seo[seoProps.metaImage]}`,
						[reverseProps.meta_desc]: d.seo[seoProps.pageDesc],
						[reverseProps.meta_title]: d.seo[seoProps.pageTitle]
					};
				}

				if (dataSrc) {
					return global.fetchFn(dataSrc);
				} else {
					throw Error('No augmenting data, moving on');
				}
			})
			.then(d => {
				if (d.seo) {
					d = d.seo;

					for (let prop in d) {
						if (data.hasOwnProperty(reverseProps[prop])) {
							if (prop === seoProps.canonicalUrl) {
								data.canonicalUrl += d[prop];
							}

							if (prop === seoProps.metaImage || prop === seoProps.pageDesc) {
								data.metaImage = d[prop];
							}

							if (prop === seoProps.pageTitle) {
								data.pageTitle += ` | ${d[prop]}`;
							}
						} else {
							data[reverseProps[prop]] = d[prop];
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
