(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['head'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<title>"
    + alias4(((helper = (helper = lookupProperty(helpers,"pageTitle") || (depth0 != null ? lookupProperty(depth0,"pageTitle") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pageTitle","hash":{},"data":data,"loc":{"start":{"line":1,"column":7},"end":{"line":1,"column":20}}}) : helper)))
    + "</title>\n<link rel=\"canonical\" href=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"canonicalUrl") || (depth0 != null ? lookupProperty(depth0,"canonicalUrl") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"canonicalUrl","hash":{},"data":data,"loc":{"start":{"line":2,"column":28},"end":{"line":2,"column":44}}}) : helper)))
    + "\" />\n<meta name=\"description\" content=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"pageDesc") || (depth0 != null ? lookupProperty(depth0,"pageDesc") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pageDesc","hash":{},"data":data,"loc":{"start":{"line":3,"column":34},"end":{"line":3,"column":46}}}) : helper)))
    + "\" />\n\n<!-- ICONS -->\n<link rel=\"shortcut icon\" href=\"/src/media/icons/favicons/favicon.ico\" type=\"image/x-icon\">\n<link rel=\"icon\" href=\"/src/media/icons/favicons/favicon.ico\" type=\"image/x-icon\">\n<link rel=\"apple-touch-icon\" sizes=\"57x57\" href=\"/src/media/icons/favicons/apple-icon-57x57.png\">\n<link rel=\"apple-touch-icon\" sizes=\"60x60\" href=\"/src/media/icons/favicons/apple-icon-60x60.png\">\n<link rel=\"apple-touch-icon\" sizes=\"72x72\" href=\"/src/media/icons/favicons/apple-icon-72x72.png\">\n<link rel=\"apple-touch-icon\" sizes=\"76x76\" href=\"/src/media/icons/favicons/apple-icon-76x76.png\">\n<link rel=\"apple-touch-icon\" sizes=\"114x114\" href=\"/src/media/icons/favicons/apple-icon-114x114.png\">\n<link rel=\"apple-touch-icon\" sizes=\"120x120\" href=\"/src/media/icons/favicons/apple-icon-120x120.png\">\n<link rel=\"apple-touch-icon\" sizes=\"144x144\" href=\"/src/media/icons/favicons/apple-icon-144x144.png\">\n<link rel=\"apple-touch-icon\" sizes=\"152x152\" href=\"/src/media/icons/favicons/apple-icon-152x152.png\">\n<link rel=\"apple-touch-icon\" sizes=\"180x180\" href=\"/src/media/icons/favicons/apple-icon-180x180.png\">\n<link rel=\"icon\" type=\"image/png\" sizes=\"192x192\" href=\"/src/media/icons/favicons/android-icon-192x192.png\">\n<link rel=\"icon\" type=\"image/png\" sizes=\"32x32\" href=\"/src/media/icons/favicons/favicon-32x32.png\">\n<link rel=\"icon\" type=\"image/png\" sizes=\"96x96\" href=\"/src/media/icons/favicons/favicon-96x96.png\">\n<link rel=\"icon\" type=\"image/png\" sizes=\"16x16\" href=\"/src/media/icons/favicons/favicon-16x16.png\">\n<!-- END ICONS -->\n\n<!-- OPEN GRAPH TAGS -->\n<meta property=\"og:title\" content=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"pageTitle") || (depth0 != null ? lookupProperty(depth0,"pageTitle") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pageTitle","hash":{},"data":data,"loc":{"start":{"line":24,"column":35},"end":{"line":24,"column":48}}}) : helper)))
    + "\" />\n<meta property=\"og:url\" content=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"canonicalUrl") || (depth0 != null ? lookupProperty(depth0,"canonicalUrl") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"canonicalUrl","hash":{},"data":data,"loc":{"start":{"line":25,"column":33},"end":{"line":25,"column":49}}}) : helper)))
    + "\" />\n<meta property=\"og:type\" content=\"website\" />\n<meta property=\"og:locale\" content=\"en_US\" />\n<meta property=\"og:description\" content=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"pageDesc") || (depth0 != null ? lookupProperty(depth0,"pageDesc") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pageDesc","hash":{},"data":data,"loc":{"start":{"line":28,"column":41},"end":{"line":28,"column":53}}}) : helper)))
    + "\" />\n<meta property=\"og:site_name\" content=\"Kyle Jorve Illustration and Design\" />\n<meta property=\"og:image\" content=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"metaImage") || (depth0 != null ? lookupProperty(depth0,"metaImage") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"metaImage","hash":{},"data":data,"loc":{"start":{"line":30,"column":35},"end":{"line":30,"column":48}}}) : helper)))
    + "\" />\n<!-- END OPEN GRAPH-->\n\n<!-- VIEWPORT -->\n<meta http-equiv=\"content-type\" content=\"text/html; charset=utf-8\" />\n<meta id=\"viewport\" name=\"viewport\" content=\"width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no\">";
},"useData":true});
templates['portfolio'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <div class=\"portfolio__item\">\n            <h2>"
    + container.escapeExpression(alias1((depth0 != null ? lookupProperty(depth0,"title") : depth0), depth0))
    + "</h2>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"media") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":12},"end":{"line":8,"column":21}}})) != null ? stack1 : "")
    + "            "
    + ((stack1 = alias1((depth0 != null ? lookupProperty(depth0,"content") : depth0), depth0)) != null ? stack1 : "")
    + "\n        </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <img src=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"url") : depth0), depth0))
    + "\" alt=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"alt") : depth0), depth0))
    + "\">\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\n<section class=\"portfolio\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"items") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":4},"end":{"line":11,"column":13}}})) != null ? stack1 : "")
    + "</section>";
},"useData":true});
})();