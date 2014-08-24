'use strict';

/* Viewport Directive */

var viewport = angular.module('uk.co.icatalyst.Viewport', []);

viewport.
  directive('icviewport', ['$compile', '$http', '$templateCache',
  	function($compile, $http, $templateCache) {

      var linker = function(scope, element, attrs){
        if (element.children().length === 0)
        {
          var loader = $http.get(attrs.emptytemplateurl || 'app/partials/viewport-empty.tmpl.html', {cache : $templateCache});
          loader.success(function(html){
            element.html(html);
          }).then(function(response){
            element.replaceWith($compile(element.html())(scope));
          });
        }
      };

  		return {
  			restrict : 'EC',
  			replace : true,
        transclude : true,
  			templateUrl: 'app/partials/viewport.tmpl.html',
        link: linker,
        controller : function(){}
  		};
    }
  ]);