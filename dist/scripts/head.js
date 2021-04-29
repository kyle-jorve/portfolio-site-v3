import { globalData } from '/dist/scripts/global-data.js';
import { global } from '/dist/scripts/global.js';

const seoProps = {
	canonicalUrl: 'canon',
	metaImage: 'metaImage',
	metaDesc: 'metaDesc',
	metaTitle: 'metaTitle'
};
let data;
let template;

function updateMetaImage(src) {
	return `${data.siteUrl}${src}`;
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
function buildHead(dataSrc = false, augData = false) {
	if (globalData.seo) {
		data = globalData.seo;
	}

	data.siteUrl = globalData.siteUrl;

	data.metaImage = updateMetaImage(data[seoProps.metaImage]);

	if (augData) {
		augmentData(augData);
	}

	if (dataSrc && dataSrc.seo) {
		dataSrc = dataSrc.seo;

		augmentData(dataSrc);
	}

	template = Handlebars.templates[global.templateSources.head](data);

	global.els.head.insertAdjacentHTML('afterbegin', template);
}

// -- PUBLIC -- //
export const head = {
	buildHead
};
