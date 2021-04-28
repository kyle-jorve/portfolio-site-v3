import{lightbox}from"/dist/scripts/lightbox.js";import{loader}from"/dist/scripts/loader.js";const cssClasses={portfolioItem:"portfolio__item",portfolioItemLoading:"portfolio__item--loading",portfolioItemTall:"portfolio__item--tall",portfolioItemWide:"portfolio__item--wide"},dataLoc={root:"/dist/abstracts/data/",global:"global.json",home:"home.json",portfolio:"portfolio.json",portfolioDetail:"portfolio-detail.json",cv:"cv.json"},templateSources={head:"components/head",header:"components/header",footer:"components/footer",lightbox:"components/lightbox",loader:"components/loader",home:"pages/home",portfolio:"pages/portfolio",portfolioDetail:"pages/portfolio-detail",cv:"pages/cv"},pageURLs={home:"/",portfolio:"/portfolio/",portfolioDetail:"/portfolio/detail/",cv:"/cv/"},searchParams={from:"from",piece:"piece",section:"section"},els={body:document.querySelector("body"),footer:document.querySelector("#footer"),head:document.querySelector("head"),header:document.querySelector("#header"),loader:document.querySelector("#loader"),loaderBottom:document.querySelector("#loaderBottom"),scrollAnchors:[document.querySelector("body"),document.querySelector("html")]};let search=window.location.search,urlParams=new URLSearchParams(search),scrollPos;function updateCurrentSearchParams(){search=window.location.search,urlParams=new URLSearchParams(search)}function fetchFn(o){return fetch(`${dataLoc.root}${o}`).then(o=>{if(o.ok)return o.json();throw new Error(`${status}: ${o.statusText}`)})}function getGlobalData(){return fetchFn(dataLoc.global)}function setURLSearchParams(o,e){var t;e.searchParams.get(searchParams.from)||(t=urlParams.get(searchParams.from)??window.location.pathname,e.searchParams.set(searchParams.from,t)),e.searchParams.get(searchParams.section)||(t=o.closest("section"),(t=urlParams.get(searchParams.section)??(t&&t.id&&t.id.length?t.id:""))&&t.length&&e.searchParams.set(searchParams.section,t)),o.href=decodeURIComponent(e.href)}function smoothScroll(o,e){e=e.getBoundingClientRect().top+window.scrollY;o.preventDefault(),window.scrollTo({top:e,left:0,behavior:"smooth"})}function smoothPageTransitions(o,e){o.preventDefault(),loader.reveal(),setTimeout(()=>{window.location=e},loader.transDurs.loader)}function updateLinks(){els.localLinks=Array.from(document.querySelectorAll("a")).filter(o=>o.href&&o.origin===window.location.origin),els.localLinks.forEach(o=>{let e=new URL(o.href);var t=e.origin+e.pathname,r=window.location.origin+window.location.pathname,a=o.hash&&o.hash.length&&t===r;let s;e.pathname.toLowerCase().includes(pageURLs.portfolioDetail)&&setURLSearchParams(o,e),t===r&&e.hash&&e.hash.length&&(s=document.querySelector(e.hash),o.addEventListener("click",o=>smoothScroll(o,s))),a||!o.target.includes("self")&&o.target&&o.target.length||o.addEventListener("click",o=>smoothPageTransitions(o,e.href))})}function removeSearchParams(){let o=new URL(window.location.href);for(var e in searchParams)o.searchParams.delete(searchParams[e]);window.history.replaceState({},document.title,o.href),updateCurrentSearchParams()}function scrollToSection(){const o=window.location.hash.length?document.querySelector(window.location.hash):document.querySelector(`#${urlParams.get(searchParams.section)}`);let e;o?setTimeout(()=>{e=o.getBoundingClientRect().top+window.scrollY,window.scrollTo(0,e)},100):window.scrollTo(0,0)}function fixBodyScroll(){scrollPos=window.scrollY,els.scrollAnchors.forEach(o=>{o.style.position="fixed",o.style.top=`-${scrollPos}px`,o.style.overflow="hidden"})}function unfixBodyScroll(){els.scrollAnchors.forEach(o=>{o.style.position="",o.style.top="",o.style.overflow=""}),window.scroll(0,scrollPos)}function loaded(){scrollToSection(),window.location.pathname.includes(pageURLs.portfolioDetail)||(removeSearchParams(),lightbox.init()),updateLinks()}const global={cssClasses:cssClasses,dataLoc:dataLoc,els:els,pageURLs:pageURLs,searchParams:searchParams,templateSources:templateSources,fetchFn:fetchFn,fixBodyScroll:fixBodyScroll,getGlobalData:getGlobalData,loaded:loaded,removeSearchParams:removeSearchParams,scrollToSection:scrollToSection,smoothPageTransitions:smoothPageTransitions,unfixBodyScroll:unfixBodyScroll,updateLinks:updateLinks,get urlParams(){return search=window.location.search,urlParams=new URLSearchParams(search),urlParams}};export{global};