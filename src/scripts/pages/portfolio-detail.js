import { portfolioData } from '/dist/scripts/portfolio-data.js';
import { global } from '/dist/scripts/global.js';
import { head } from '/dist/scripts/head.js';
import { lightbox } from '/dist/scripts/lightbox.js';
import { loader } from '/dist/scripts/loader.js';
import { slider } from '/dist/scripts/slider.js';
import { helpers } from '/dist/scripts/global-helpers.js';
import { detailHelpers } from '/dist/scripts/portfolio-detail-helpers.js';

let data = portfolioData.items.find(i => i.name === global.urlParams.get(global.searchParams.piece));
const itemIndex = portfolioData.items.indexOf(data);
let template;

// massage data
data.neighbors = {
	next: portfolioData.items[itemIndex + 1],
	previous: portfolioData.items[itemIndex - 1]
};

data.seo = {
	canon: `${global.pageURLs.portfolioDetail}?${global.searchParams.piece}=${data.name}`,
	metaTitle: data.title,
	metaImage: data.media[0].mobileSource
};

template = Handlebars.templates[global.templateSources.portfolioDetail](data);

// build the head
head.buildHead(data.seo);

// build the page
global.els.header.insertAdjacentHTML('afterend', template);

// initialize loader
loader.init();

// initialize lightbox
lightbox.init(data);

// initialize slider
slider.init();
