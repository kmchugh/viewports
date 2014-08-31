'use strict';

/* Viewport Directive */

var viewport = angular.module('uk.co.icatalyst.Viewport', []);

viewport.
directive('icviewport', ['$compile', '$http', '$templateCache',
    function($compile, $http, $templateCache) {

        /**
         * If there are no children generates using the empty url template
         * @param  {Object} scope   The scope
         * @param  {Object} element the element being decorated
         * @param  {Object} attrs   key value pairs of attributes attached
         */
        var linker = function(scope, element, attrs) {
            if (element.children().length === 0) {
                var loader = $http.get(attrs.emptytemplateurl || 'app/partials/viewport-empty.tmpl.html', {
                    cache: $templateCache
                });
                loader.success(function(html) {
                    element.html(html);
                }).then(function(response) {
                    element.replaceWith($compile(element.html())(scope));
                });
            }
        };

        var controller = function($scope, $element, $attrs){
          // Stores the panes for this viewport
          var panes = $scope.panes = [];

          $scope.allowMultiSelect = $attrs.allowMultiSelect || false;

          /**
           * Selects the pane specified, forces deselection of other panes
           * @param  {pane} pane the pane to select
           */
          $scope.select = function(pane){
            angular.forEach(panes, function(pane){
              pane.selected = false;
            });
            pane.selected = true;
          };

          /**
           * Adds the pane specified to the viewport
           * @param {pane} pane the pane to add to the viewport
           */
          this.addPane = function(pane){
            // If this is the first pane added, select it
            if (!panes.length){
              $scope.select(pane);
            }
            panes.push(pane);
          };
        };

        return {
            restrict: 'EC',
            replace: true,
            transclude: true,
            templateUrl: 'app/partials/viewport.tmpl.html',
            link: linker,
            controller: controller
        };
    }
]);