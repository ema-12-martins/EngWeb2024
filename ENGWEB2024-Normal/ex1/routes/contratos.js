// routes/contratos.js

var express = require('express');
var router = express.Router();
var Contratos = require('../controllers/contratos');

router.get('/', function(req, res, next) {
  if (req.query.entidade) {
    Contratos.findEntidade(req.query.entidade)
      .then(data => res.jsonp(data))
      .catch(erro => res.jsonp(erro));
  } else if (req.query.tipo) {
    Contratos.findTipo(req.query.tipo)
      .then(data => res.jsonp(data))
      .catch(erro => res.jsonp(erro));
  } else {
    Contratos.list()
      .then(data => res.jsonp(data))
      .catch(erro => res.jsonp(erro));
  }
});

router.get('/entidades', function(req, res){
  Contratos.listEntidades()
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro))
});

router.get('/tipos', function(req, res){
  Contratos.listTipos()
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro))
});

//ALGUMA COISA ERRADA
router.get('/:id', function(req, res){
  Contratos.findById(req.params.id)
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro))
});

module.exports = router;
