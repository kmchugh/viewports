'use strict';

/* jasmine specs for directives go here */
describe('MyApp Tabs', function() {
    var elm, scope;

    // Load the templates required
    beforeEach(module('uk.co.icatalyst.Viewport',
        'app/partials/viewport.tmpl.html',
        'app/partials/tab.tmpl.html',
        'app/partials/pane.tmpl.html',
        'app/partials/viewport-empty.tmpl.html',
        'test/partials/viewport-empty.tmpl.html'));

    beforeEach(inject(function($rootScope, $compile) {
        elm = angular.element(
            '<icViewport>' +
            '<icTabs>' +
            '<icPane title="First Tab">' +
            'First content is {{first}}' +
            '</icPane>' +
            '<icPane title="Second Tab">' +
            'Second content is {{second}}' +
            '</icPane>' +
            '</icTabs>' +
            '</icViewport>');

        scope = $rootScope;
        $compile(elm)(scope);
        scope.$digest();
    }));

    it('should create clickable titles', function() {
        var titles = elm[0].querySelectorAll('ul.nav-tabs li a');

        expect(titles.length).toBe(2);
        expect(angular.element(titles[0]).text()).toBe('First Tab');
        expect(angular.element(titles[1]).text()).toBe('Second Tab');
    });

    it('sould bind the content', function() {
        var contents = elm[0].querySelectorAll('div.tab-content div.tab-pane');

        expect(contents.length).toBe(2);
        expect(angular.element(contents[0]).text()).toBe('First content is ');
        expect(angular.element(contents[1]).text()).toBe('Second content is ');

        scope.$apply(function() {
            scope.first = 123;
            scope.second = 456
        });

        expect(angular.element(contents[0]).text()).toBe('First content is 123');
        expect(angular.element(contents[1]).text()).toBe('Second content is 456');

    });

    it('should set active class on title', function() {
        var titles = elm[0].querySelectorAll('ul.nav-tabs li');

        expect(angular.element(titles[0]).hasClass('active')).toBe(true);
        expect(angular.element(titles[1]).hasClass('active')).toBe(false);
    });

    it('should change active pane when title clicked', function() {
        var titles = elm[0].querySelectorAll('ul.nav-tabs li');
        var contents = elm[0].querySelectorAll('div.tab-content div.tab-pane');

        // click the second tab
        angular.element(angular.element(titles[1]).find('a')).triggerHandler('click')

        // second title should be active
        expect(angular.element(titles[0]).hasClass('active')).toBe(false);
        expect(angular.element(titles[1]).hasClass('active')).toBe(true);

        // second content should be active
        expect(angular.element(contents[0]).hasClass('active')).toBe(false);
        expect(angular.element(contents[1]).hasClass('active')).toBe(true);
    });

});