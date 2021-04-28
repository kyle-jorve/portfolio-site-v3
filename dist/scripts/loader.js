import{global}from"/dist/scripts/global.js?v=1.0.2";const cssClasses={active:"active",hide:"hide",show:"show",track:"loader__track"},mutationObserverConfig={subtree:!0,childList:!0,characterData:!0,attributes:!0},els={},transDurs={},time=300;let mutationObserver,loadTimeout,revealLoadBar;function initLoader(a=!1){mutationObserver=new MutationObserver((e,t)=>mutationHandler(e,t,a)),els.track=global.els.loader.querySelector(`.${cssClasses.track}`),transDurs.track=1e3*parseFloat(window.getComputedStyle(els.track).getPropertyValue("transition-duration")),transDurs.loader=1e3*parseFloat(window.getComputedStyle(global.els.loader).getPropertyValue("transition-duration")),revealLoadBar=setTimeout(()=>{els.track.classList.add(cssClasses.active)},500),mutationObserver.observe(document,mutationObserverConfig),loadTimeout=setTimeout(()=>{detectLoad(revealPage,a)},time)}function mutationHandler(e,t,a){clearTimeout(loadTimeout),loadTimeout=setTimeout(()=>{detectLoad(revealPage,a)},time)}function detectLoad(t,a=!1){const s=Array.from(document.querySelectorAll("img"));mutationObserver.disconnect(),s.some(e=>!e.complete)?s.forEach(e=>e.addEventListener("load",()=>{s.every(e=>e.complete)&&(t(),a&&a())})):(t(),a&&a())}function revealPage(){clearTimeout(revealLoadBar),els.track.classList.remove(cssClasses.active),setTimeout(()=>{global.els.loader.classList.add(cssClasses.hide)},transDurs.track),global.els.loaderBottom.classList.add(cssClasses.show),global.loaded()}function revealLoader(){global.els.loaderBottom.classList.add(cssClasses.active)}const loader={init:initLoader,dismiss:revealPage,reveal:revealLoader,detectLoad:detectLoad,transDurs:transDurs};export{loader};