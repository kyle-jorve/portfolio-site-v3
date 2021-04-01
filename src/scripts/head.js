import { dataLoc } from './global.js';

const els = {
	head: document.querySelector('head')
};
const data = {};
let template;

fetch(`${dataLoc}global.json`)
	.then(res => res.json())
	.then(d => {
		if (d.seo) {
			data.seo = {
				pageTitle: d.seo.meta_title,
				canonicalUrl: d.seo.canon,
				pageDesc: d.seo.meta_desc,
				metaImage: d.seo.meta_image
			};
		}
	})
	.then(() => fetch(`${dataLoc}home.json`))
	.then(res => res.json())
	.then(d => {
		if (d.seo) {
			for (let prop in d.seo) {
				if (data.seo.hasOwnProperty(prop)) {
					data.seo[prop] += d.seo[prop];
				} else {
					data.seo[prop] = d.seo[prop];
				}
			}
		}

		console.log(data.seo);

		template = Handlebars.templates.head(data.seo);

		els.head.insertAdjacentHTML('afterbegin', template);
	});
