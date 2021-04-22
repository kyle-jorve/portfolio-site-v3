import { global } from '/dist/scripts/global.js';

const template = Handlebars.templates[global.templateSources.lightbox]();

global.els.header.insertAdjacentHTML('afterend', template);
