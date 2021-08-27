import{lightbox}from"/dist/scripts/lightbox.js";import{loader}from"/dist/scripts/loader.js";const cssClasses={loaded:"loaded",portfolioItem:"portfolio__item",portfolioItemLoading:"portfolio__item--loading",portfolioItemTall:"portfolio__item--tall",portfolioItemWide:"portfolio__item--wide"},templateSources={head:"components/head",header:"components/header",footer:"components/footer",lightbox:"components/lightbox",loader:"components/loader",home:"pages/home",portfolio:"pages/portfolio",portfolioDetail:"pages/portfolio-detail",cv:"pages/cv"},pageURLs={home:"/",portfolio:"/portfolio/",portfolioDetail:"/portfolio/detail/",cv:"/cv/"},searchParams={from:"from",piece:"piece",section:"section"},els={body:document.querySelector("body"),footer:document.querySelector("#footer"),head:document.querySelector("head"),header:document.querySelector("#header"),scrollAnchors:[document.querySelector("body"),document.querySelector("html")]};let search=window.location.search,urlParams=new URLSearchParams(search),scrollPos;function updateCurrentSearchParams(){search=window.location.search,urlParams=new URLSearchParams(search)}function setURLSearchParams(o,e){var a;e.searchParams.get(searchParams.from)||(a=urlParams.get(searchParams.from)??window.location.pathname,e.searchParams.set(searchParams.from,a)),e.searchParams.get(searchParams.section)||(a=o.closest("section"),(a=urlParams.get(searchParams.section)??(a&&a.id&&a.id.length?a.id:""))&&a.length&&e.searchParams.set(searchParams.section,a)),o.href=decodeURIComponent(e.href)}function smoothScroll(o,e){e=e.getBoundingClientRect().top+window.scrollY;o.preventDefault(),window.scrollTo({top:e,left:0,behavior:"smooth"})}function smoothPageTransitions(o,e){o.preventDefault(),loader.reveal(),setTimeout(()=>{window.location=e},loader.transDurs.loader)}function updateLinks(){els.localLinks=Array.from(document.querySelectorAll("a")).filter(o=>o.href&&o.origin===window.location.origin),els.localLinks.forEach(o=>{let e=new URL(o.href);var a=e.origin+e.pathname,r=window.location.origin+window.location.pathname,t=o.hash&&o.hash.length&&a===r,s=o.hasAttribute("download");let l;e.pathname.toLowerCase().includes(pageURLs.portfolioDetail)&&setURLSearchParams(o,e),a===r&&e.hash&&e.hash.length&&(l=document.querySelector(e.hash),o.addEventListener("click",o=>smoothScroll(o,l))),t||s||!o.target.includes("self")&&o.target&&o.target.length||o.addEventListener("click",o=>smoothPageTransitions(o,e.href))})}function removeSearchParams(){let o=new URL(window.location.href);for(var e in searchParams)o.searchParams.delete(searchParams[e]);window.history.replaceState({},document.title,o.href),updateCurrentSearchParams()}function scrollToSection(){const o=window.location.hash.length?document.querySelector(window.location.hash):document.querySelector(`#${urlParams.get(searchParams.section)}`);var e=window.location.pathname.includes(pageURLs.portfolioDetail);let a;els.scrollAnchors.forEach(o=>o.classList.add(cssClasses.loaded)),o&&!e&&setTimeout(()=>{a=o.getBoundingClientRect().top+window.scrollY,window.scrollTo(0,a)},100)}function fixBodyScroll(){scrollPos=window.scrollY,els.scrollAnchors.forEach(o=>{o.style.position="fixed",o.style.top=`-${scrollPos}px`,o.style.overflow="hidden"})}function unfixBodyScroll(){els.scrollAnchors.forEach(o=>{o.style.position="",o.style.top="",o.style.overflow=""}),window.scroll(0,scrollPos)}function loaded(){scrollToSection(),window.location.pathname.includes(pageURLs.portfolioDetail)||(removeSearchParams(),lightbox.init()),updateLinks()}const global={cssClasses:cssClasses,els:els,pageURLs:pageURLs,searchParams:searchParams,templateSources:templateSources,urlParams:urlParams,fixBodyScroll:fixBodyScroll,loaded:loaded,removeSearchParams:removeSearchParams,scrollToSection:scrollToSection,smoothPageTransitions:smoothPageTransitions,unfixBodyScroll:unfixBodyScroll,updateLinks:updateLinks};export{global};