'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var baseCtrlStub = {
  index: 'baseCtrl.index'
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var baseIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './base.controller': baseCtrlStub
});

describe('Base API Router:', function() {

  it('should return an express router instance', function() {
    baseIndex.should.equal(routerStub);
  });

  describe('GET /api/bases', function() {

    it('should route to base.controller.index', function() {
      routerStub.get
        .withArgs('/', 'baseCtrl.index')
        .should.have.been.calledOnce;
    });

  });

});
