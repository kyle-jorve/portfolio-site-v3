import{portfolioData}from"/dist/scripts/portfolio-data.js";import{global}from"/dist/scripts/global.js";import{head}from"/dist/scripts/head.js";import{loader}from"/dist/scripts/loader.js";import{helpers}from"/dist/scripts/global-helpers.js";const data={title:portfolioData.title,items:portfolioData.items,url:portfolioData.url},template=Handlebars.templates[global.templateSources.portfolio](data);global.els.header.insertAdjacentHTML("afterend",template),loader.init();