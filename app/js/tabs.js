'use strict';

/* Viewport Directive */

angular.module('uk.co.icatalyst.Viewport').
  directive('tabs', [
  	function() {
  		return {
        require : '^icviewport',
  			restrict : 'EC',
        transclude: true,
        replace: false,
        controller : function($scope, $element){
          var panes = $scope.panes = [];

          $scope.select = function(pane){
            angular.forEach(panes, function(pane){
              pane.selected = false;
            });
            pane.selected = true;
          };

          this.addPane = function(pane){
            if (!panes.length)
            {
              $scope.select(pane);
            }
            panes.push(pane);
          };
        },
        // This is required due to a bug in angular
        link : angular.noop,
  			templateUrl: 'app/partials/tab.tmpl.html'
  		};
    }
  ]);