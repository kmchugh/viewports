'use strict';

/* jasmine specs for directives go here */

describe('viewports', function() {
  var validElement, scope;

  beforeEach(module('uk.co.icatalyst.Viewport',
    'app/partials/viewport.tmpl.html',
    'app/partials/viewport-empty.tmpl.html',
    'test/partials/viewport-empty.tmpl.html'));

  beforeEach(inject(function($rootScope, $compile){
    validElement = angular.element('<icviewport></icviewport>');

    scope = $rootScope;
    $compile(validElement)(scope);
    scope.$digest();

  }));

  it('can be defined as a class', function(){
    var altElement;
    inject(function($rootScope, $compile){
      altElement = angular.element('<div class="icviewport"></div>');

      scope = $rootScope;
      $compile(altElement)(scope);
      scope.$digest();
    });

    expect(altElement.hasClass('viewport')).toBe(true);
  });

  it('should have the correct class names', function(){
    expect(validElement.hasClass('ic')).toBe(true);
    expect(validElement.hasClass('viewport')).toBe(true);

    var altElement;
    inject(function($rootScope, $compile){
      altElement = angular.element('<icviewport class="test"></icviewport>');

      scope = $rootScope;
      $compile(altElement)(scope);
      scope.$digest();
    });

    expect(altElement.hasClass('test')).toBe(true);
  });

  it('should have content', function(){
    var emptyElement;
    inject(function($rootScope, $compile){
      emptyElement = angular.element('<icviewport></icviewport>');

      scope = $rootScope;
      $compile(emptyElement)(scope);
      scope.$digest();
    });

    expect(emptyElement.children().length).not.toBe(0);
  });

  it('can define content from the emptyTemplateURL attribute', function(){

    var altElement;
    inject(function($rootScope, $compile){
      altElement = angular.element('<icviewport emptyTemplateUrl="test/partials/viewport-empty.tmpl.html"></icviewport>');

      scope = $rootScope;
      $compile(altElement)(scope);
      scope.$digest();
    });

    expect(altElement.children().text()).toBe('empty test');

  });

});