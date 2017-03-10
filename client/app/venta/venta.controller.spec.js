'use strict';

describe('Component: VentaComponent', function () {

  // load the controller's module
  beforeEach(module('tiendaApp'));

  var VentaComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    VentaComponent = $componentController('VentaComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
