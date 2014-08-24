'use strict';

/* Tabs directive */

angular.module('uk.co.icatalyst.Viewport').
directive('ictabs', [

    function() {
        return {
            require: '^icviewport',
            restrict: 'EC',
            transclude: true,
            replace: false,
            // This is required due to a bug in angular
            link: angular.noop,
            templateUrl: 'app/partials/tab.tmpl.html'
        };
    }
]);