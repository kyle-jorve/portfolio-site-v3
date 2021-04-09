(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['footer'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            "
    + ((stack1 = (lookupProperty(helpers,"printSocialIcon")||(depth0 && lookupProperty(depth0,"printSocialIcon"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"printSocialIcon","hash":{},"data":data,"loc":{"start":{"line":4,"column":12},"end":{"line":4,"column":38}}})) != null ? stack1 : "")
    + "\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"footer__icons\">\n    <div class=\"social social--footer social--standard\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"socialIcons") : depth0)) != null ? lookupProperty(stack1,"standard") : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":8},"end":{"line":5,"column":17}}})) != null ? stack1 : "")
    + "    </div>\n\n    <div class=\"social social--footer social--commerce\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"socialIcons") : depth0)) != null ? lookupProperty(stack1,"commerce") : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":9,"column":8},"end":{"line":11,"column":17}}})) != null ? stack1 : "")
    + "    </div>\n</div>\n\n<div class=\"footer__copyright\">\n    <div class=\"wrapper wrapper--content\">\n        "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"copyright") || (depth0 != null ? lookupProperty(depth0,"copyright") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"copyright","hash":{},"data":data,"loc":{"start":{"line":17,"column":8},"end":{"line":17,"column":23}}}) : helper))) != null ? stack1 : "")
    + "\n    </div>\n</div>";
},"useData":true});
templates['head'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<title>"
    + alias4(((helper = (helper = lookupProperty(helpers,"metaTitle") || (depth0 != null ? lookupProperty(depth0,"metaTitle") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"metaTitle","hash":{},"data":data,"loc":{"start":{"line":1,"column":7},"end":{"line":1,"column":20}}}) : helper)))
    + "</title>\n<link rel=\"canonical\" href=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"canon") || (depth0 != null ? lookupProperty(depth0,"canon") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"canon","hash":{},"data":data,"loc":{"start":{"line":2,"column":28},"end":{"line":2,"column":37}}}) : helper)))
    + "\" />\n<meta name=\"description\" content=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"metaDesc") || (depth0 != null ? lookupProperty(depth0,"metaDesc") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"metaDesc","hash":{},"data":data,"loc":{"start":{"line":3,"column":34},"end":{"line":3,"column":46}}}) : helper)))
    + "\" />\n\n<!-- ICONS -->\n<link rel=\"shortcut icon\" href=\"/src/media/icons/favicons/favicon.ico\" type=\"image/x-icon\">\n<link rel=\"icon\" href=\"/src/media/icons/favicons/favicon.ico\" type=\"image/x-icon\">\n<link rel=\"apple-touch-icon\" sizes=\"57x57\" href=\"/src/media/icons/favicons/apple-icon-57x57.png\">\n<link rel=\"apple-touch-icon\" sizes=\"60x60\" href=\"/src/media/icons/favicons/apple-icon-60x60.png\">\n<link rel=\"apple-touch-icon\" sizes=\"72x72\" href=\"/src/media/icons/favicons/apple-icon-72x72.png\">\n<link rel=\"apple-touch-icon\" sizes=\"76x76\" href=\"/src/media/icons/favicons/apple-icon-76x76.png\">\n<link rel=\"apple-touch-icon\" sizes=\"114x114\" href=\"/src/media/icons/favicons/apple-icon-114x114.png\">\n<link rel=\"apple-touch-icon\" sizes=\"120x120\" href=\"/src/media/icons/favicons/apple-icon-120x120.png\">\n<link rel=\"apple-touch-icon\" sizes=\"144x144\" href=\"/src/media/icons/favicons/apple-icon-144x144.png\">\n<link rel=\"apple-touch-icon\" sizes=\"152x152\" href=\"/src/media/icons/favicons/apple-icon-152x152.png\">\n<link rel=\"apple-touch-icon\" sizes=\"180x180\" href=\"/src/media/icons/favicons/apple-icon-180x180.png\">\n<link rel=\"icon\" type=\"image/png\" sizes=\"192x192\" href=\"/src/media/icons/favicons/android-icon-192x192.png\">\n<link rel=\"icon\" type=\"image/png\" sizes=\"32x32\" href=\"/src/media/icons/favicons/favicon-32x32.png\">\n<link rel=\"icon\" type=\"image/png\" sizes=\"96x96\" href=\"/src/media/icons/favicons/favicon-96x96.png\">\n<link rel=\"icon\" type=\"image/png\" sizes=\"16x16\" href=\"/src/media/icons/favicons/favicon-16x16.png\">\n<!-- END ICONS -->\n\n<!-- OPEN GRAPH TAGS -->\n<meta property=\"og:title\" content=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"metaTitle") || (depth0 != null ? lookupProperty(depth0,"metaTitle") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"metaTitle","hash":{},"data":data,"loc":{"start":{"line":24,"column":35},"end":{"line":24,"column":48}}}) : helper)))
    + "\" />\n<meta property=\"og:url\" content=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"canon") || (depth0 != null ? lookupProperty(depth0,"canon") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"canon","hash":{},"data":data,"loc":{"start":{"line":25,"column":33},"end":{"line":25,"column":42}}}) : helper)))
    + "\" />\n<meta property=\"og:type\" content=\"website\" />\n<meta property=\"og:locale\" content=\"en_US\" />\n<meta property=\"og:description\" content=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"metaDesc") || (depth0 != null ? lookupProperty(depth0,"metaDesc") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"metaDesc","hash":{},"data":data,"loc":{"start":{"line":28,"column":41},"end":{"line":28,"column":53}}}) : helper)))
    + "\" />\n<meta property=\"og:site_name\" content=\"Kyle Jorve Illustration and Design\" />\n<meta property=\"og:image\" content=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"metaImage") || (depth0 != null ? lookupProperty(depth0,"metaImage") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"metaImage","hash":{},"data":data,"loc":{"start":{"line":30,"column":35},"end":{"line":30,"column":48}}}) : helper)))
    + "\" />\n<!-- END OPEN GRAPH-->\n\n<!-- VIEWPORT -->\n<meta http-equiv=\"content-type\" content=\"text/html; charset=utf-8\" />\n<meta id=\"viewport\" name=\"viewport\" content=\"width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no\">";
},"useData":true});
templates['header'] = template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <a class=\"mobileNav__item\" href=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"url") : depth0), depth0))
    + "\">\n            <img class=\"mobileNav__icon\" src=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"icon") : depth0), depth0))
    + "\" alt=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"alt") : depth0), depth0))
    + "\">\n            <span class=\"mobileNav__label\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"pageName") : depth0), depth0))
    + "</span>\n        </a>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <li class=\"nav__li"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"currentPage") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":35,"column":30},"end":{"line":35,"column":78}}})) != null ? stack1 : "")
    + "\">\n                <a class=\"nav__a\" href=\""
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"url") : depth0), depth0))
    + "\""
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"target") : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":36,"column":53},"end":{"line":36,"column":104}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"rel") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":36,"column":104},"end":{"line":36,"column":146}}})) != null ? stack1 : "")
    + ">\n                    <span class=\"nav__text\">"
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"pageName") : depth0), depth0))
    + "</span>\n                </a>\n            </li>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return " nav__li--current";
},"6":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " target=\""
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"target") : depth0), depth0))
    + "\"";
},"8":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " rel=\""
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"rel") : depth0), depth0))
    + "\"";
},"10":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <div class=\"portfolio__item\">\n                        <img src=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"imageUrl") : depth0), depth0))
    + "\" alt=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"title") : depth0), depth0))
    + " thumbnail\">\n                    </div>\n";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            "
    + ((stack1 = (lookupProperty(helpers,"printSocialIcon")||(depth0 && lookupProperty(depth0,"printSocialIcon"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"printSocialIcon","hash":{},"data":data,"loc":{"start":{"line":59,"column":12},"end":{"line":59,"column":38}}})) != null ? stack1 : "")
    + "\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"header__row\">\n    <a class=\"header__logo logo\" href=\"/\">\n        <img class=\"logo__img\" src=\"/src/media/icons/logo-circle.svg\" alt=\"Kyle Jorve logo\">\n    </a>\n</div>\n\n<div class=\"mobileNav\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"mobileNav") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":4},"end":{"line":13,"column":13}}})) != null ? stack1 : "")
    + "\n    <button class=\"nav__button\" id=\"navBtn\">\n        <div class=\"nav__buttonBlocks\">\n            <span class=\"nav__buttonBlock\"></span>\n            <span class=\"nav__buttonBlock nav__buttonBlock--disapparate\"></span>\n            <span class=\"nav__buttonBlock\"></span>\n\n            <span class=\"nav__buttonBlock nav__buttonBlock--disapparate\"></span>\n            <span class=\"nav__buttonBlock\"></span>\n            <span class=\"nav__buttonBlock nav__buttonBlock--disapparate\"></span>\n\n            <span class=\"nav__buttonBlock\"></span>\n            <span class=\"nav__buttonBlock nav__buttonBlock--disapparate\"></span>\n            <span class=\"nav__buttonBlock\"></span>\n        </div>\n    </button>\n</div>\n\n<nav class=\"nav\">\n    <ul class=\"nav__ul\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"nav") : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":34,"column":8},"end":{"line":40,"column":17}}})) != null ? stack1 : "")
    + "    </ul>\n\n    <section class=\"recentWork\">\n        <div class=\"wrapper wrapper--section\">\n            <h2 class=\"flexLine\">Recent Work</h2>\n\n            <div class=\"portfolio__grid\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"recentWork") : depth0),{"name":"each","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":48,"column":16},"end":{"line":52,"column":25}}})) != null ? stack1 : "")
    + "            </div>\n        </div>\n    </section>\n\n    <div class=\"social social--header\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"social") : depth0),{"name":"each","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":58,"column":8},"end":{"line":60,"column":17}}})) != null ? stack1 : "")
    + "    </div>\n</nav>";
},"useData":true});
templates['pages/cv'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <div class=\"resume__item\">\n                <h3 class=\"resume__itemHeading\">"
    + container.escapeExpression(alias1((depth0 != null ? lookupProperty(depth0,"heading") : depth0), depth0))
    + "</h3>\n\n                "
    + ((stack1 = alias1((depth0 != null ? lookupProperty(depth0,"content") : depth0), depth0)) != null ? stack1 : "")
    + "\n            </div>\n\n            <hr class=\"resume__hr\">\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<section class=\"section bio\">\n    <div class=\"bio__hero\">\n        <img class=\"bio__img\" src=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"heroImg") : depth0)) != null ? lookupProperty(stack1,"url") : stack1), depth0))
    + "\" alt=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"heroImg") : depth0)) != null ? lookupProperty(stack1,"alt") : stack1), depth0))
    + "\">\n        \n        <picture>\n            <source srcset=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"heroImg") : depth0)) != null ? lookupProperty(stack1,"url") : stack1), depth0))
    + "\">\n            <img class=\"bio__bgImg\" src=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"heroImg") : depth0)) != null ? lookupProperty(stack1,"url") : stack1), depth0))
    + "\" alt=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"heroImg") : depth0)) != null ? lookupProperty(stack1,"alt") : stack1), depth0))
    + "\">\n        </picture>\n    </div>\n\n    <div class=\"bio__content\">\n        <div class=\"wrapper wrapper--content\">\n            <h1 class=\"bio__title\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"bio") : depth0)) != null ? lookupProperty(stack1,"title") : stack1), depth0))
    + "</h1>\n\n            "
    + ((stack1 = alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"bio") : depth0)) != null ? lookupProperty(stack1,"content") : stack1), depth0)) != null ? stack1 : "")
    + "\n        </div>\n\n        <span class=\"logoIcon\" aria-hidden=\"true\">\n            <img class=\"logoIcon__img\" src=\"/src/media/icons/logo-circle-icon.svg\">\n        </span>`\n    </div>\n</section>\n\n<section class=\"section resume\">\n    <div class=\"wrapper wrapper--content\">\n        <h2 class=\"resume__heading\">"
    + ((stack1 = alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"resume") : depth0)) != null ? lookupProperty(stack1,"title") : stack1), depth0)) != null ? stack1 : "")
    + "</h2>\n        <div class=\"button__wrapper button__wrapper--justifyCenter\">\n            <a class=\"button button--primary\" href=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"resume") : depth0)) != null ? lookupProperty(stack1,"docUrl") : stack1), depth0))
    + "\" download>"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"resume") : depth0)) != null ? lookupProperty(stack1,"btnText") : stack1), depth0))
    + "</a>\n        </div>\n\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? lookupProperty(depth0,"resume") : depth0)) != null ? lookupProperty(stack1,"items") : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":31,"column":8},"end":{"line":39,"column":17}}})) != null ? stack1 : "")
    + "    </div>\n</section>";
},"useData":true});
templates['pages/home'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <br>\n                <small>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"subtitle") || (depth0 != null ? lookupProperty(depth0,"subtitle") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"subtitle","hash":{},"data":data,"loc":{"start":{"line":6,"column":23},"end":{"line":6,"column":35}}}) : helper)))
    + "</small>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <source srcset=\""
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"url") : depth0), depth0))
    + "\""
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"minScreenWidth") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":14,"column":45},"end":{"line":14,"column":124}}})) != null ? stack1 : "")
    + ">\n";
},"4":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " media=\"(min-width: "
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"minScreenWidth") : depth0), depth0))
    + ")\"";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            "
    + ((stack1 = (lookupProperty(helpers,"printPortfolioItem")||(depth0 && lookupProperty(depth0,"printPortfolioItem"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"printPortfolioItem","hash":{},"data":data,"loc":{"start":{"line":36,"column":12},"end":{"line":36,"column":41}}})) != null ? stack1 : "")
    + "\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, alias3=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<section class=\"section hero\">\n    <div class=\"hero__content\">\n        <h1>"
    + alias2(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":3,"column":12},"end":{"line":3,"column":21}}}) : helper)))
    + "\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"subtitle") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":12},"end":{"line":7,"column":19}}})) != null ? stack1 : "")
    + "        </h1>\n    </div>\n\n    <div class=\"hero__bg\">\n        <picture>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"heroBg") : depth0)) != null ? lookupProperty(stack1,"sources") : stack1),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":13,"column":12},"end":{"line":15,"column":21}}})) != null ? stack1 : "")
    + "            <img class=\"hero__img\" src=\""
    + alias2(alias3(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"heroBg") : depth0)) != null ? lookupProperty(stack1,"sources") : stack1)) != null ? lookupProperty(stack1,"0") : stack1)) != null ? lookupProperty(stack1,"url") : stack1), depth0))
    + "\" alt=\""
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"heroBg") : depth0)) != null ? lookupProperty(stack1,"alt") : stack1), depth0))
    + "\">\n        </picture>\n    </div>\n\n    <a class=\"scrollGraphic\" href=\"#featured-work\">\n        <span class=\"scrollGraphic__icon\">\n            <span class=\"scrollGraphic__mouse\">\n                <span class=\"scrollGraphic__track\">\n                    <span class=\"scrollGraphic__ball\"></span>\n                </span>\n            </span>\n        </span>\n    </a>\n</section>\n\n <section class=\"section portfolio\" id=\"featured-work\">\n     <h2>"
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"portfolio") : depth0)) != null ? lookupProperty(stack1,"heading") : stack1), depth0))
    + "</h2>\n\n    <div class=\"portfolio__grid\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"portfolio") : depth0)) != null ? lookupProperty(stack1,"featured") : stack1),{"name":"each","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":35,"column":8},"end":{"line":37,"column":17}}})) != null ? stack1 : "")
    + "    </div>\n\n    <div class=\"button__wrapper button__wrapper--justifyCenter\">\n        <a class=\"button button--primary\" href=\""
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"portfolio") : depth0)) != null ? lookupProperty(stack1,"url") : stack1), depth0))
    + "\">"
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"portfolio") : depth0)) != null ? lookupProperty(stack1,"btnText") : stack1), depth0))
    + "</a>\n    </div>\n</section>\n\n<section class=\"section bio\" style=\"background-image: url('"
    + alias2(alias3(((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"bio") : depth0)) != null ? lookupProperty(stack1,"img") : stack1)) != null ? lookupProperty(stack1,"desktop") : stack1), depth0))
    + "');\">\n    <div class=\"wrapper wrapper--section\">\n        <article class=\"bio__content\">\n            <img class=\"bio__mobileImg\" src=\""
    + alias2(alias3(((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"bio") : depth0)) != null ? lookupProperty(stack1,"img") : stack1)) != null ? lookupProperty(stack1,"mobile") : stack1), depth0))
    + "\" alt=\""
    + alias2(alias3(((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"bio") : depth0)) != null ? lookupProperty(stack1,"img") : stack1)) != null ? lookupProperty(stack1,"alt") : stack1), depth0))
    + "\">\n            <h3 class=\"bio__heading\">"
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"bio") : depth0)) != null ? lookupProperty(stack1,"title") : stack1), depth0))
    + "</h3>\n            "
    + ((stack1 = alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"bio") : depth0)) != null ? lookupProperty(stack1,"content") : stack1), depth0)) != null ? stack1 : "")
    + "\n\n            <div class=\"bio__btnWrp button__wrapper button__wrapper--justifyRight\">\n                <a class=\"button button--primary\" href=\""
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"bio") : depth0)) != null ? lookupProperty(stack1,"url") : stack1), depth0))
    + "\"></a>\n            </div>\n        </article>\n    </div>\n</section>";
},"useData":true});
templates['pages/portfolio-detail'] = template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <div class=\"showcase__slide\">\n                    <picture>\n                        <source srcset=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"url") : depth0), depth0))
    + "\">\n                        <img class=\"showcase__img\" src=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"url") : depth0), depth0))
    + "\" alt=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"alt") : depth0), depth0))
    + "\">\n                    </picture>\n\n                    <div class=\"showcase__slideIcons\">\n                        <button class=\"portfolio__expand showcase__icon icon icon--expand\">\n                            <span class=\"icon__text\">View Full Screen</span>\n                        </button>\n                    </div>\n                </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "            <div class=\"slider__arrows\">\n                <button class=\"slider__arrow slider__arrow--prev\" id=\"arrowPrev\"></button>\n                <button class=\"slider__arrow slider__arrow--next\" id=\"arrowNext\"></button>\n            </div>\n\n            <div class=\"slider__dots\" id=\"sliderDots\"></div>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <picture aria-hidden=\"true\">\n                <source srcset=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"url") : depth0), depth0))
    + "\">\n                <img class=\"showcase__bg\" src=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"url") : depth0), depth0))
    + "\">\n            </picture>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"showcase\">\n    <section class=\"showcase__section showcase__section--media\">\n        <div class=\"showcase__slider\" id=\"showcaseSlider\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"media") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":12},"end":{"line":17,"column":21}}})) != null ? stack1 : "")
    + "        </div>\n\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isSlider") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":20,"column":8},"end":{"line":27,"column":15}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"media") : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":29,"column":8},"end":{"line":34,"column":17}}})) != null ? stack1 : "")
    + "    </section>\n    \n    <section class=\"showcase__section showcase__section--content\">\n        <div class=\"wrapper wrapper--content\">\n            <h1 class=\"showcase__title\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":39,"column":40},"end":{"line":39,"column":49}}}) : helper)))
    + "</h1>\n\n            "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"content") || (depth0 != null ? lookupProperty(depth0,"content") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data,"loc":{"start":{"line":41,"column":12},"end":{"line":41,"column":25}}}) : helper))) != null ? stack1 : "")
    + "\n        </div>\n    </section>\n</div>";
},"useData":true});
templates['pages/portfolio'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            "
    + ((stack1 = (lookupProperty(helpers,"printPortfolioItem")||(depth0 && lookupProperty(depth0,"printPortfolioItem"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"printPortfolioItem","hash":{},"data":data,"loc":{"start":{"line":7,"column":12},"end":{"line":7,"column":41}}})) != null ? stack1 : "")
    + "\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\n<section class=\"section portfolio\">\n    <h1>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":3,"column":8},"end":{"line":3,"column":17}}}) : helper)))
    + "</h1>\n\n    <div class=\"portfolio__grid\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"items") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":8},"end":{"line":8,"column":17}}})) != null ? stack1 : "")
    + "    </div>\n</section>";
},"useData":true});
})();