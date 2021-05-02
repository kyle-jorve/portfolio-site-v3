import { globalData } from '/dist/scripts/global-data.js';
import { global } from '/dist/scripts/global.js';

const seoProps = {
	canonicalUrl: 'canon',
	metaImage: 'metaImage',
	metaDesc: 'metaDesc',
	metaTitle: 'metaTitle'
};
let data = globalData.seo;
let template;

data.metaImage = updateMetaImage(data[seoProps.metaImage]);

function updateMetaImage(src) {
	return `${globalData.siteUrl}${src}`;
}

function augmentData(augData) {
	for (let prop in augData) {
		if (data.hasOwnProperty(prop)) {
			if (prop === seoProps.canonicalUrl) {
				data[prop] += augData[prop];
			}

			if (prop === seoProps.metaImage) {
				data[prop] = updateMetaImage(augData[prop]);
			}

			if (prop === seoProps.metaDesc) {
				data[prop] = augData[prop];
			}

			if (prop === seoProps.metaTitle) {
				data[prop] = `${augData[prop]} | ${data[prop]}`;
			}
		} else {
			data[prop] = augData[prop];
		}
	}
}

// build the head
function buildHead(augData = false) {
	if (augData) {
		augmentData(augData);
	}

	template = Handlebars.templates[global.templateSources.head](data);

	global.els.head.insertAdjacentHTML('afterbegin', template);
}

// -- PUBLIC -- //
export const head = {
	buildHead
};
