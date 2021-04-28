import{global}from"/dist/scripts/global.js?v=1.0.2";const wideAspect=1.333,tallAspect=.75;Handlebars.registerHelper("printSocialIcon",e=>{var a="gumroad"===e.name.toLowerCase(),o=e.cssClass??e.name;return`
        <a
            class="social__item${a?"":` icon icon--absoluteCenter icon--${o}`}"
            href="${e.url}"
            target="_blank"
            rel="noopener noreferrer nofollow"
            title="${e.name}">
            ${e.icon??""}
            <span class="icon__text">${e.name}</span>
        </a>`}),Handlebars.registerHelper("printPortfolioItem",(e,a)=>{var o=e.dimensions[0]/e.dimensions[1],i=window.location.pathname,o=o>wideAspect?global.cssClasses.portfolioItemWide:o<tallAspect?global.cssClasses.portfolioItemTall:"",a=`${global.pageURLs.portfolioDetail}?piece=${e.name}&from=${i}${a?`&${global.searchParams.section}=${a}`:""}`;return`
        <article class="${global.cssClasses.portfolioItem} ${o}">
            <a class="portfolio__itemLink" href="${a}">
                <picture>
                    ${e.thumbnail.sources.map(e=>`<source srcset="${e.url}" media="(min-width: ${e.minScreenSize}px)">`).join("")}
                    <img class="portfolio__img portfolio__img--${e.orientation}"
                        src="${e.thumbnail.mobileSource}"
                        alt="${e.thumbnail.alt}"
                        width="${e.dimensions[0]}"
                        height="${e.dimensions[1]}">
                </picture>
            </a>

            <div class="portfolio__itemInner">
                <h3 class="portfolio__itemTitle">${e.title}</h3>
                <div class="portfolio__icons">
                    <a class="portfolio__icon portfolio__icon--desc icon icon--align-justify" href="${a}">
                        <span class="icon__text">View Description</span>
                    </a>
                    <button
                        class="portfolio__icon lightbox__imageZoom icon icon--search-plus"
                        data-name="${e.name}"
                        data-index="${e.thumbnail.mediaIndex}">

                        <span class="icon__text">View Full Screen</span>
                    </button>
                </div>
            </div>

            <div class="portfolio__itemLoader">
                <span class="loader__track">
                    <span class="loader__bar loader__bar--1"></span>
                    <span class="loader__bar loader__bar--2"></span>
                </span>
            </div>
        </article>`}),Handlebars.registerHelper("isOdd",e=>e%2==1),Handlebars.registerHelper("isPortfolioDetailPage",()=>window.location.pathname.includes(global.pageURLs.portfolioDetail)),Handlebars.registerHelper("currentPage",e=>window.location.pathname===e.url);const helpers={currentPage:Handlebars.helpers.currentPage,isOdd:Handlebars.helpers.isOdd,isPortfolioDetailPage:Handlebars.helpers.isPortfolioDetailPage,printPortfolioItem:Handlebars.helpers.printPortfolioItem,printSocialIcon:Handlebars.helpers.printSocialIcon};export{helpers};