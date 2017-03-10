'use strict';

describe('Service: base', function () {

  // load the service's module
  beforeEach(module('tiendaApp'));

  // instantiate service
  var base;
  beforeEach(inject(function (_base_) {
    base = _base_;
  }));

  it('should do something', function () {
    expect(!!base).toBe(true);
  });

});
