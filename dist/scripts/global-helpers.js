import{global}from"/dist/scripts/global.js";const wideAspect=1.333,tallAspect=.75;Handlebars.registerHelper("printSocialIcon",e=>{var o="gumroad"===e.name.toLowerCase(),a=e.cssClass??e.name;return`
        <a
            class="social__item${o?"":` icon icon--absoluteCenter icon--${a}`}"
            href="${e.url}"
            target="_blank"
            rel="noopener noreferrer nofollow"
            title="${e.name}">
            ${e.icon??""}
            <span class="icon__text">${e.name}</span>
        </a>`}),Handlebars.registerHelper("printPortfolioItem",(e,o,a=!1,s=!1,i=!1)=>{var l=e.dimensions[0]/e.dimensions[1],r=window.location.pathname,l=l>wideAspect?global.cssClasses.portfolioItemWide:l<tallAspect?global.cssClasses.portfolioItemTall:"",a=`${global.pageURLs.portfolioDetail}?piece=${e.name}&from=${r}${a?`&${global.searchParams.section}=${a}`:""}`;const t=s?e.featuredThumbnail:i&&0===o?e.newThumbnail:e.thumbnail;return`
        <article class="${global.cssClasses.portfolioItem} ${l}">
            ${0===o?'<span class="portfolio__itemNew">New</span>':""}

            <a class="portfolio__itemLink" href="${a}">
                <picture>
                    ${t.sources.map(e=>`<source srcset="${e.url}" media="(min-width: ${e.minScreenSize}px)">`).join("")}
                    <img class="portfolio__img portfolio__img--${e.orientation}"
                        src="${t.mobileSource}"
                        alt="${t.alt}"
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
                        data-index="${t.mediaIndex}">

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