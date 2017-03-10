'use strict';

describe('Component: DialogComponent', function () {

  // load the controller's module
  beforeEach(module('tiendaApp'));

  var DialogComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    DialogComponent = $componentController('DialogComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
