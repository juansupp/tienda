'use strict';

var app = require('../..');
import request from 'supertest';

describe('Base API:', function() {

  describe('GET /api/bases', function() {
    var bases;

    beforeEach(function(done) {
      request(app)
        .get('/api/bases')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          bases = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      bases.should.be.instanceOf(Array);
    });

  });

});
