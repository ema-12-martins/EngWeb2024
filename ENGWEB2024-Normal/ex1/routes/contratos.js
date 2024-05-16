var express = require('express');
var router = express.Router();
var Contratos = require('../controllers/contratos');
const contratos = require('../models/contratos');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Contratos.list()
    .then(data => res.jsonp(data))
    .catch(erro => {
      console.log(erro)
      res.jsonp(erro)
    })
});

module.exports = router;
