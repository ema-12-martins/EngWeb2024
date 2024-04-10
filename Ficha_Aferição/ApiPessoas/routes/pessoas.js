var express = require('express');
var router = express.Router();
var Pessoa = require('../controllers/pessoas')

/* GET users listing. */
router.get('/', function(req, res, next) {
  Pessoa.list()
    .then(data=>{
      res.jsonp(data)
    })
    .catch(e => res.jsonp(e))
});

router.post('/', function(req, res, next) {
  Pessoa.insert(req.body)
    .then(data=>{
      res.jsonp(data)
    })
    .catch(e => res.jsonp(e))
});

router.put('/:id', function(req, res, next) {
  Pessoa.update(req.params.id,req.body)
    .then(data=>{
      res.jsonp(data)
    })
    .catch(e => res.jsonp(e))
});

router.delete('/:id', function(req, res, next) {
  Pessoa.remove(req.params.id)
    .then(data=>{
      res.jsonp(data)
    })
    .catch(e => res.jsonp(e))
});

//Pergunta 5
router.get('/modalidades', function(req, res, next) {
  Pessoa.listSports()
    .then(data=>{
      res.jsonp(data)
    })
    .catch(e => res.jsonp(e))
});

//Pergunta 6
router.get('/modalidades/:id', function(req, res, next) {
  console.log(req.params.id)
  Pessoa.listSportNames(req.params.id,req.body)
    .then(data=>{
      res.jsonp(data)
    })
    .catch(e => res.jsonp(e))
});


module.exports = router;