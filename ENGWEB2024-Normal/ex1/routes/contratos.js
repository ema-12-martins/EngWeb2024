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

router.post('/', function(req, res) {
  console.log(req.body)
  Contratos.insert(req.body)
    .then(data => res.status(201).jsonp(data))
    .catch(erro => res.jsonp(erro))
});

router.delete('/:id', function(req, res) {
  Contratos.remove(req.params.id)
    .then(removedContract => {
      if (!removedContract) {
        return res.status(404).jsonp({ error: 'Contract not found' });
      }
      res.jsonp(removedContract);
    })
    .catch(error => res.status(500).jsonp(error));
});

router.put('/:id', function(req, res) {
  Contratos.update(req.params.id, req.body)
    .then(updatedContract => {
      if (!updatedContract) {
        return res.status(404).jsonp({ error: 'Contract not found' });
      }
      res.jsonp(updatedContract);
    })
    .catch(error => res.status(500).jsonp(error));
});


router.get('/:id', function(req, res){
  Contratos.findById(req.params.id)
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro))
});

module.exports = router;
