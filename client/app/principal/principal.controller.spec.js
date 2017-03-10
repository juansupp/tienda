'use strict';

describe('Component: PrincipalComponent', function () {

  // load the controller's module
  beforeEach(module('tiendaApp'));

  var PrincipalComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    PrincipalComponent = $componentController('PrincipalComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
