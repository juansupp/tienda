'use strict';

describe('Service: hummer', function () {

  // load the service's module
  beforeEach(module('tiendaApp'));

  // instantiate service
  var hummer;
  beforeEach(inject(function (_hummer_) {
    hummer = _hummer_;
  }));

  it('should do something', function () {
    expect(!!hummer).toBe(true);
  });

});
