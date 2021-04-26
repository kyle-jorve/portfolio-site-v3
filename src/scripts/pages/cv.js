import { global } from '/dist/scripts/global.js';
import { head } from '/dist/scripts/head.js';
import { loader } from '/dist/scripts/loader.js';
import { helpers } from '/dist/scripts/global-helpers.js';

let data;
let template;

// build the <head>
head.buildHead(global.dataLoc.cv);

// build the page
global
	.fetchFn(global.dataLoc.cv)
	.then(d => {
		data = {
			heroImg: d.heroImg,
			bio: d.bio,
			resume: d.resume
		};

		template = Handlebars.templates[global.templateSources.cv](data);

		global.els.header.insertAdjacentHTML('afterend', template);
	})
	.catch(err => console.warn(err))
	.finally(() => loader.init());
