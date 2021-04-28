import { header } from '/dist/scripts/header.js';
import { footer } from '/dist/scripts/footer.js';

// on window pageshow event, if the previous state persists, reload the page
// (this is typically only a problem in Safari)
window.addEventListener('pageshow', event => {
	if (event.persisted) {
		window.location.reload();
	}
});

// build the <header>
header.buildHeader();

// build the <footer>
footer.buildFooter();
