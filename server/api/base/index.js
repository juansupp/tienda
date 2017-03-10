'use strict';

var express = require('express');
var controller = require('./base.controller');

var router = express.Router();

router.post('/select', controller.select);
router.post('/fiar', controller.fiar);
router.post('/ventas', controller.ventas);
router.post('/flush', controller.flush);
router.post('/addCant', controller.addCant);
router.post('/addProducto', controller.addProducto);
router.post('/addPersona', controller.addPersona);

module.exports = router;
