import{portfolioDetail}from"/dist/scripts/portfolio-detail.js?v=1.0.0";import{global}from"/dist/scripts/global.js";Handlebars.registerHelper("isSlider",e=>1<e.length),Handlebars.registerHelper("printSliderNav",e=>`
        <div class="slider__arrows">
            <button class="slider__arrow circleBtn circleBtn--prev" data-dir="prev"><span class="icon__text">Previous Slide</span></button>
            <button class="slider__arrow circleBtn circleBtn--next" data-dir="next"><span class="icon__text">Next Slide</span></button>
        </div>

        <div class="slider__dots" id="sliderDots">
            ${e.map((e,s)=>`
                    <button
                        class="${portfolioDetail.cssClasses.dot}${0===s?` ${portfolioDetail.cssClasses.active}`:""}"
                        data-index="${s}"
                        ${0===s?portfolioDetail.dataAttrs.active:""}>
                        </button>`).join("")}
        </div>`),Handlebars.registerHelper("printSlides",i=>{return i.media.map((e,s)=>{return`
                <div
                    class="showcase__slide${0===s?` ${portfolioDetail.cssClasses.active}`:""}${e.video?` ${portfolioDetail.cssClasses.videoSlide}`:""}"
                    style="z-index: ${i.media.length-s+1};"
                    ${portfolioDetail.dataAttrs.index}="${s}"
                    ${0===s?portfolioDetail.dataAttrs.active:""}>

                    <div
                        class="${portfolioDetail.cssClasses.imgWrp}${0===s?` ${portfolioDetail.cssClasses.active}`:""}">

                        ${e.video?e.source:(e=e,`
            <picture>
                ${e.sources.map(e=>`
                            <source srcset="${e.url}" media="(min-width: ${e.minScreenSize}px)">`).join("")}
                
                <img
                    class="showcase__img"
                    src="${e.mobileSource}"
                    alt="${e.alt}">
            </picture>`)}

                        <div class="showcase__slideIcons">
                            <button
                                class="lightbox__slideZoom portfolio__icon showcase__icon icon icon--zoom"
                                data-name="${i.name}"
                                data-index="${s}">

                                <span class="icon__text">View Full Screen</span>
                            </button>
                        </div>
                    </div>
                </div>`}).join("")}),Handlebars.registerHelper("printBgs",i=>{function r(e,s){return`
            <picture>
                ${e.sources.map(e=>`
                            <source srcset="${e.url}" media="(min-width: ${e.minScreenSize}px)">`).join("")}
                <img
                    class="${portfolioDetail.cssClasses.bg}${0===s?` ${portfolioDetail.cssClasses.active}`:""}"
                    src="${e.mobileSource}"
                    ${portfolioDetail.dataAttrs.index}="${s}"
                    ${0===s?portfolioDetail.dataAttrs.active:""}>
            </picture>`}return i.map((e,s)=>e.video?r(i[e.bgIndex],s):r(e,s)).join("")}),Handlebars.registerHelper("neighbors",e=>{const s=Object.entries(e.neighbors);var i,r,t=s.filter(e=>e[1]??!1).length<2;let a="";for([i,r]of s)r&&(a+=`
                <article class="showcase__neighbor showcase__neighbor--${i}${t?" showcase__neighbor--solo":""}">
                    <a
                        class="showcase__neighborLink"
                        href="/portfolio/detail/?piece=${r.name}&from=${global.urlParams.get("from")}">
                        
                        <div class="showcase__neighborImgWrp">
                            <picture>
                                ${r.detailThumbnail.sources.map(e=>`
                                        <source srcset="${e.url}" media="(min-width: ${e.minScreenSize}px)">`).join("")}
                                <img
                                    class="showcase__neighborImg showcase__neighborImg--${r.orientation}"
                                    src="${r.detailThumbnail.mobileSource}"
                                    alt="${r.detailThumbnail.alt}">
                            </picture>
                        </div>

                        <div class="showcase__neighborInner">
                            <span
                                class="showcase__neighborArrow circleBtn circleBtn--outlined circleBtn--${"previous"===i?"back":"forward"}">
                            </span>

                            <div class="showcase__neighborContent">
                                <h2 class="showcase__neighborHeading">${i.charAt(0).toUpperCase()}${i.slice(1)}</h2>
                                <h3 class="showcase__neighborTitle">${function(s){var i=s.split(" ");let r="";for(let e=0;e<i.length;e++){var t=i[e],a=e===i.length-1;if(!(r.length+t.length<=25)){r=r.trim(),r.length<s.length&&(r+="...");break}r+=`${t}${a?"":" "}`}return r}(r.title)}</h3>
                            </div>
                        </div>

                    </a>
                </article>`);return a}),Handlebars.registerHelper("hasPurchaseLinks",e=>e.purchaseLink||e.downloadLink);const detailHelpers={hasPurchaseLinks:Handlebars.helpers.hasPurchaseLinks,isSlider:Handlebars.helpers.isSlider,neighbors:Handlebars.helpers.neighbors,printDots:Handlebars.helpers.printDots,printSlides:Handlebars.helpers.printSlides,printBgs:Handlebars.helpers.printBgs};export{detailHelpers};