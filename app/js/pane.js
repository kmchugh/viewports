angular.module('uk.co.icatalyst.Viewport').
directive('icpane', [

    function() {
        return {
            require: '^icviewport',
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                title: "@"
            },
            link: function(scope, element, attrs, tabsCtrl) {
                tabsCtrl.addPane(scope);

            },
            templateUrl: 'app/partials/pane.tmpl.html'
        };
    }
]);