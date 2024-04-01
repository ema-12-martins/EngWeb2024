var express = require('express');
var router = express.Router();
var Compositor = require('../controllers/compositores')

/* GET users listing. */
router.get('/', function(req, res, next) {
  Compositor.list()
    .then(data=>{
      res.jsonp(data)
    })
    .catch(e => res.jsonp(e))
});

router.post('/', function(req, res, next) {
  Compositor.insert(req.body)
    .then(data=>{
      res.jsonp(data)
    })
    .catch(e => res.jsonp(e))
});

router.put('/:id', function(req, res, next) {
  Compositor.update(req.params.dictionary,req.body)
    .then(data=>{
      res.jsonp(data)
    })
    .catch(e => res.jsonp(e))
});

router.delete('/:id', function(req, res, next) {
  Compositor.remove(req.params.dictionary,req.body)
    .then(data=>{
      res.jsonp(data)
    })
    .catch(e => res.jsonp(e))
});


module.exports = router;