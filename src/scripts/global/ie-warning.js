(function () {
	var cssClasses = {
		active: 'active',
		messageMode: 'lightbox--message'
	};
	var els = {
		body: document.querySelector('body')
	};
	var agent = window.navigator.userAgent.toLowerCase();
	var isIE = agent.indexOf('msie') > -1 || agent.indexOf('trident') > -1;
	var templateLoc = 'components/ie-lightbox';
	var template;
	var lbTransDur;

	if (isIE) {
		template = Handlebars.templates[templateLoc]();

		els.body.insertAdjacentHTML('afterbegin', template);

		els.box = document.querySelector('#ie-lightbox');
		els.wrapper = document.querySelector('#ie-lbWrapper');

		lbTransDur = parseFloat(window.getComputedStyle(els.wrapper).getPropertyValue('transition-duration')) * 1000;

		window.addEventListener('load', function () {
			els.wrapper.classList.add(cssClasses.active);

			setTimeout(function () {
				els.box.classList.add(cssClasses.active);
			}, lbTransDur);
		});
	}
})();
