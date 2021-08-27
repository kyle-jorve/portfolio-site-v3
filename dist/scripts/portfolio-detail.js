import{portfolioData}from"/dist/scripts/portfolio-data.js";import{global}from"/dist/scripts/global.js";import{head}from"/dist/scripts/head.js";import{lightbox}from"/dist/scripts/lightbox.js";import{loader}from"/dist/scripts/loader.js";import{slider}from"/dist/scripts/slider.js";import{helpers}from"/dist/scripts/global-helpers.js";import{detailHelpers}from"/dist/scripts/portfolio-detail-helpers.js";const portfolioDataCopy={...portfolioData};let data=portfolioDataCopy.items.find(t=>t.name===global.urlParams.get(global.searchParams.piece));const itemIndex=portfolioDataCopy.items.indexOf(data);let template;data.neighbors={next:portfolioDataCopy.items[itemIndex+1],previous:portfolioDataCopy.items[itemIndex-1]},data.seo={canon:`${global.pageURLs.portfolioDetail}?${global.searchParams.piece}=${data.name}`,metaTitle:data.title,metaImage:data.media[0].mobileSource},template=Handlebars.templates[global.templateSources.portfolioDetail](data),head.buildHead(data.seo),global.els.header.insertAdjacentHTML("afterend",template),loader.init(),lightbox.init(data),slider.init();