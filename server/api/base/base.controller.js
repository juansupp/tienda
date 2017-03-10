/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/bases              ->  index
 */

'use strict';

var Promise = require('promise');
var _ = require('lodash');
var sql = require('mssql');

var config = {
  user: 'sa',
  password: 'A*96NIXZ1996',
  server: '170.117.20.7', // You can use 'localhost\\instance' to connect to named instance
  database: 'tienda' //
};

//
function con(sentence) {
  return new Promise(function(resolve, reject) {
    var connection = new sql.Connection(config, function(err) {
      var request = new sql.Request(connection); // or: var request = connection.request();
      request.query(sentence, function(err, recordset) {
        connection.close();

        err ? reject({
          err: err
        }) : resolve({
          recordset: recordset
        });
      });
    });
  });
}
// Gets a list of Bases
export function select(req, res) {
  //
  var body = req.body;
  //
  var sentence = "select " + body.columns.toString() + " from  " + body.table;
  sentence = body.where ? sentence.concat(" where " + body.where) : sentence;
  //
  con(sentence).then(response => {
      res.json(response.recordset);
    })
    .catch(err => {
      res.send(err);
    });
}

export function fiar(req, res) {
  //
  var body = req.body;
  //
  var sentence = "exec fiar " + body.columns.toString();
  //
  con(sentence).then(response => {
    response.err ? res.send(false) : res.json(response.recordset);
  });
  //
}
//
export function flush(req, res) {
  //
  var body = req.body;
  //
  console.dir(body.columns);
  var sentence = "exec flush " + body.columns.toString();
  //
  con(sentence).then(response => {
    response.err ? res.send(false) : res.json(response.recordset);
  });
  //
}

export function ventas(req, res) {
  //
  var body = req.body;
  //
  for (var i = 0; i < body.columns.length; i++) {
    body.columns[i] = "'" + body.columns[i] + "'";
  }
  //
  var sentence = "exec ventas " + body.columns.toString();
  //
  con(sentence).then(response => {
    response.err ? res.send(false) : res.json(response.recordset);
  });
  //
}

export function addCant(req, res) {
  var body = req.body;
  var sentence =
    "update producto set cantidad_producto = cantidad_producto + " +
    body.columns.cant + " where id_producto = "  + body.columns.id;
  con(sentence).then(response => {
    sentence = 'select * from producto';
    con(sentence).then(responseInventario=>{
        responseInventario.err ? res.send(false) : res.json(responseInventario.recordset);
    });
  });
}

export function addPersona (req,res){
  var body = req.body;
  var sentence = "insert into persona values ('"+ body.nombre +"')";
  con(sentence).then(response=>{
        response.err ? res.send(false) : res.json(response.recordset);
  });
}

export function addProducto(req, res) {
  var body = req.body;
  var sentence =
    "insert into producto values('" + body.columns.nombre_producto  + "', " 
    + body.columns.precio_producto + ", " + body.columns.cantidad_producto + ")";
    
  con(sentence).then(response => {
    response.err ? res.send(false) : res.json(response.recordset);
  });
}
