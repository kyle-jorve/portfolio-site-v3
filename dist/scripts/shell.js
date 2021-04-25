import { loader } from '/dist/scripts/loader.js';
import { header } from '/dist/scripts/header.js';
import { footer } from '/dist/scripts/footer.js';

// initialize loader
loader.init();

// build the <header>
header.buildHeader();

// build the <footer>
footer.buildFooter();
