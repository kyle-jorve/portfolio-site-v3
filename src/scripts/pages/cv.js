import { cvData } from '/dist/scripts/cv-data.js';
import { global } from '/dist/scripts/global.js';
import { head } from '/dist/scripts/head.js';
import { loader } from '/dist/scripts/loader.js';
import { helpers } from '/dist/scripts/global-helpers.js';

const data = {
	heroImg: cvData.heroImg,
	bio: cvData.bio,
	resume: cvData.resume
};
const template = Handlebars.templates[global.templateSources.cv](data);

// build the <head>
head.buildHead(cvData.seo);

// build the page
global.els.header.insertAdjacentHTML('afterend', template);

// initialize loader
loader.init();
