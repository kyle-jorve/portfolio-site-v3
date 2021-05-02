import{global}from"/dist/scripts/global.js";const dataAttrs={active:"data-active",dir:"data-dir",index:"data-index"},cssClasses={active:"active",bg:"showcase__bg",dot:"slider__dot",imgWrp:"showcase__imgWrp",slide:"showcase__slide",videoSlide:"showcase__slide--video",transOut:"transOut"};Handlebars.registerHelper("isSlider",s=>1<s.length),Handlebars.registerHelper("printSliderNav",s=>`
        <div class="slider__arrows">
            <button class="slider__arrow circleBtn circleBtn--prev" data-dir="prev"><span class="icon__text">Previous Slide</span></button>
            <button class="slider__arrow circleBtn circleBtn--next" data-dir="next"><span class="icon__text">Next Slide</span></button>
        </div>

        <div class="slider__dots" id="sliderDots">
            ${s.map((s,e)=>`
                    <button
                        class="${cssClasses.dot}${0===e?` ${cssClasses.active}`:""}"
                        data-index="${e}"
                        ${0===e?dataAttrs.active:""}>
                        </button>`).join("")}
        </div>`),Handlebars.registerHelper("printSlides",i=>{return i.media.map((s,e)=>{return`
                <div
                    class="showcase__slide${0===e?` ${cssClasses.active}`:""}${s.video?` ${cssClasses.videoSlide}`:""}"
                    style="z-index: ${i.media.length-e+1};"
                    ${dataAttrs.index}="${e}"
                    ${0===e?dataAttrs.active:""}>

                    <div
                        class="${cssClasses.imgWrp}${0===e?` ${cssClasses.active}`:""}">

                        ${s.video?s.source:(s=s,`
            <picture>
                ${s.sources.map(s=>`
                            <source srcset="${s.url}" media="(min-width: ${s.minScreenSize}px)">`).join("")}
                
                <img
                    class="showcase__img"
                    src="${s.mobileSource}"
                    alt="${s.alt}">
            </picture>`)}

                        <div class="showcase__slideIcons">
                            <button
                                class="lightbox__slideZoom portfolio__icon showcase__icon icon icon--zoom"
                                data-name="${i.name}"
                                data-index="${e}">

                                <span class="icon__text">View Full Screen</span>
                            </button>
                        </div>
                    </div>
                </div>`}).join("")}),Handlebars.registerHelper("printBgs",i=>{function a(s,e){return`
            <picture>
                ${s.sources.map(s=>`
                            <source srcset="${s.url}" media="(min-width: ${s.minScreenSize}px)">`).join("")}
                <img
                    class="${cssClasses.bg}${0===e?` ${cssClasses.active}`:""}"
                    src="${s.mobileSource}"
                    ${dataAttrs.index}="${e}"
                    ${0===e?dataAttrs.active:""}>
            </picture>`}return i.map((s,e)=>s.video?a(i[s.bgIndex],e):a(s,e)).join("")}),Handlebars.registerHelper("neighbors",s=>{const e=Object.entries(s.neighbors);var i,a,r=e.filter(s=>s[1]??!1).length<2;let t="";for([i,a]of e)a&&(t+=`
                <article class="showcase__neighbor showcase__neighbor--${i}${r?" showcase__neighbor--solo":""}">
                    <a
                        class="showcase__neighborLink"
                        href="/portfolio/detail/?piece=${a.name}&from=${global.urlParams.get("from")}">
                        
                        <div class="showcase__neighborImgWrp">
                            <picture>
                                ${a.detailThumbnail.sources.map(s=>`
                                        <source srcset="${s.url}" media="(min-width: ${s.minScreenSize}px)">`).join("")}
                                <img
                                    class="showcase__neighborImg showcase__neighborImg--${a.orientation}"
                                    src="${a.detailThumbnail.mobileSource}"
                                    alt="${a.detailThumbnail.alt}">
                            </picture>
                        </div>

                        <div class="showcase__neighborInner">
                            <span
                                class="showcase__neighborArrow circleBtn circleBtn--outlined circleBtn--${"previous"===i?"back":"forward"}">
                            </span>

                            <div class="showcase__neighborContent">
                                <h2 class="showcase__neighborHeading">${i.charAt(0).toUpperCase()}${i.slice(1)}</h2>
                                <h3 class="showcase__neighborTitle">${function(e){var i=e.split(" ");let a="";for(let s=0;s<i.length;s++){var r=i[s],t=s===i.length-1;if(!(a.length+r.length<=25)){a=a.trim(),a.length<e.length&&(a+="...");break}a+=`${r}${t?"":" "}`}return a}(a.title)}</h3>
                            </div>
                        </div>

                    </a>
                </article>`);return t}),Handlebars.registerHelper("hasPurchaseLinks",s=>s.purchaseLink||s.downloadLink);const detailHelpers={cssClasses:cssClasses,dataAttrs:dataAttrs,hasPurchaseLinks:Handlebars.helpers.hasPurchaseLinks,isSlider:Handlebars.helpers.isSlider,neighbors:Handlebars.helpers.neighbors,printDots:Handlebars.helpers.printDots,printSlides:Handlebars.helpers.printSlides,printBgs:Handlebars.helpers.printBgs};export{detailHelpers};