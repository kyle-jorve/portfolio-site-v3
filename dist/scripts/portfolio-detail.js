import{global}from"/dist/scripts/global.js";import{head}from"/dist/scripts/head.js";import{lightbox}from"/dist/scripts/lightbox.js";import{loader}from"/dist/scripts/loader.js";import{helpers}from"/dist/scripts/global-helpers.js";import{detailHelpers}from"/dist/scripts/portfolio-detail-helpers.js";const dataAttrs={active:"data-active",dir:"data-dir",index:"data-index"},directions={next:"next",prev:"prev"},cssClasses={active:"active",bg:"showcase__bg",dot:"slider__dot",imgWrp:"showcase__imgWrp",slide:"showcase__slide",videoSlide:"showcase__slide--video",transOut:"transOut"};let data,template,els,slideTransDur,itemIndex;function initSlider(){els={arrows:Array.from(document.querySelectorAll(".slider__arrow")),bgs:Array.from(document.querySelectorAll(`.${cssClasses.bg}`)),dots:Array.from(document.querySelectorAll(`.${cssClasses.dot}`)),showcaseSlider:document.querySelector("#showcaseSlider")},els.showcaseSlides=Array.from(els.showcaseSlider.querySelectorAll(`.${cssClasses.slide}`)),els.lightboxSlides=Array.from(lightbox.els.wrapper.querySelectorAll(`.${cssClasses.slide}`)),slideTransDur=1e3*parseFloat(window.getComputedStyle(els.showcaseSlides[0]).getPropertyValue("transition-duration")),1<els.showcaseSlides.length&&(els.arrows.forEach(e=>e.addEventListener("click",()=>arrowHandler(e))),els.dots.forEach(e=>e.addEventListener("click",()=>dotHandler(e))))}function arrowHandler(e){var t=e.getAttribute(dataAttrs.dir),e=Number(els.showcaseSlides.find(e=>e.hasAttribute(dataAttrs.active)).getAttribute(dataAttrs.index));let s={};t===directions.prev?s.slide=els.showcaseSlides[e-1]?[els.showcaseSlides[e-1],els.lightboxSlides[e-1]]:[els.showcaseSlides[els.showcaseSlides.length-1],els.lightboxSlides[els.showcaseSlides.length-1]]:s.slide=els.showcaseSlides[e+1]?[els.showcaseSlides[e+1],els.lightboxSlides[e+1]]:[els.showcaseSlides[0],els.lightboxSlides[0]],s.index=Number(s.slide[0].getAttribute(dataAttrs.index)),s.dot=els.dots.filter(e=>e.getAttribute(dataAttrs.index)==s.index),s.bg=els.bgs.filter(e=>e.getAttribute(dataAttrs.index)==s.index),moveSlides(s)}function dotHandler(t){let s={dot:els.dots.filter(e=>e.getAttribute(dataAttrs.index)==t.getAttribute(dataAttrs.index))};s.index=Number(t.getAttribute(dataAttrs.index)),s.slide=[...els.showcaseSlides,...els.lightboxSlides].filter(e=>e.getAttribute(dataAttrs.index)==s.index),s.bg=els.bgs.filter(e=>e.getAttribute(dataAttrs.index)==s.index),moveSlides(s)}function moveSlides(e){var t={bg:els.bgs.filter(e=>e.hasAttribute(dataAttrs.active)),dot:els.dots.filter(e=>e.hasAttribute(dataAttrs.active)),slide:[...els.showcaseSlides,...els.lightboxSlides].filter(e=>e.hasAttribute(dataAttrs.active))};[...els.arrows,...els.dots].forEach(e=>e.style.pointerEvents="none"),deactivateSlide(t),activateBg(e.bg),activateSlide(e),setTimeout(()=>{[...els.arrows,...els.dots].forEach(e=>e.style.pointerEvents="")},slideTransDur)}function deactivateSlide(e){e.slide.forEach(e=>e.classList.add(cssClasses.transOut)),[...e.slide,...e.dot,...e.bg].forEach(e=>{e.classList.remove(cssClasses.active),e.removeAttribute(dataAttrs.active)}),setTimeout(()=>{e.slide.forEach(e=>e.classList.remove(cssClasses.transOut))},slideTransDur)}function activateSlide(e){[...e.dot,...e.slide].forEach(e=>{e.classList.add(cssClasses.active),e.setAttribute(dataAttrs.active,!0)})}function activateBg(e){e.forEach(e=>{e.classList.add(cssClasses.active),e.setAttribute(dataAttrs.active,!0)})}global.fetchFn(global.dataLoc.portfolio).then(e=>{console.log("initialized"),data=e.items.find(e=>e.name===global.urlParams.get("piece")),itemIndex=e.items.indexOf(data),data.neighbors={next:e.items[itemIndex+1],previous:e.items[itemIndex-1]},data.seo={canon:`portfolio/detail/?piece=${data.name}`,metaTitle:data.title,metaImage:data.media[0].url},head.buildHead(!1,data.seo),template=Handlebars.templates[global.templateSources.portfolioDetail](data),global.els.header.insertAdjacentHTML("afterend",template)}).catch(e=>console.warn(e)).finally(()=>{loader.init(),lightbox.init(data),initSlider()});const portfolioDetail={dataAttrs:dataAttrs,directions:directions,cssClasses:cssClasses};export{portfolioDetail};