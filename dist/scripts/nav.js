import{global}from"/dist/scripts/global.js";import{loader}from"/dist/scripts/loader.js";const cssClasses={active:"active",showNav:"showNav"};let navActive=!1,els;function initiateNav(){els={body:global.els.body,nav:document.querySelector("#mainNav"),navButton:document.querySelector("#navBtn"),navLI:Array.from(document.querySelectorAll(".header .nav__li")),recentWorkItems:Array.from(document.querySelectorAll(".header .portfolio__item")),socialIcons:Array.from(document.querySelectorAll(".header .social__item"))};const e=1e3*parseFloat(window.getComputedStyle(els.nav).getPropertyValue("transition-duration"));els.navButton.addEventListener("click",()=>{if(els.navButton.style.pointerEvents="none",navActive)els.navButton.classList.remove(cssClasses.active),els.body.classList.remove(cssClasses.showNav),setTimeout(()=>{global.unfixBodyScroll(),[...els.navLI,...els.recentWorkItems,...els.socialIcons].forEach(e=>e.classList.remove(cssClasses.active))},e);else{els.navButton.classList.add(cssClasses.active),els.body.classList.add(cssClasses.showNav),global.fixBodyScroll();for(let e=0;e<els.navLI.length;e++){const a=els.navLI[e];var s=100*e;setTimeout(()=>{a.classList.add(cssClasses.active)},s)}for(let e=0;e<els.recentWorkItems.length;e++){const l=els.recentWorkItems[e];var t=100*e;setTimeout(()=>{l.classList.add(cssClasses.active)},t)}for(let e=0;e<els.socialIcons.length;e++){const n=els.socialIcons[e];var o=100*e;setTimeout(()=>{n.classList.add(cssClasses.active)},o)}}setTimeout(()=>{els.navButton.style.pointerEvents=""},300+e),navActive=!navActive})}function initForPortfolioDetail(){const e=document.querySelector("#navBtn");var s=window.location.search;const t=new URLSearchParams(s).get("from");e.addEventListener("click",e=>{e.preventDefault(),loader.reveal(),setTimeout(()=>{window.location.pathname=t},loader.transDurs.loader)})}const nav={init:initiateNav,initPortfolioDetail:initForPortfolioDetail};export{nav};