import { global } from '/src/scripts/global.js';
import { head } from '/src/scripts/components/head.js';
import { header } from '/src/scripts/components/header.js';

let data;
let template;

// build the <head>
head.buildHead(global.dataLoc.cv);

// build the <header>
header.buildHeader(global.dataLoc.cv);

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
	.catch(err => console.warn(err));