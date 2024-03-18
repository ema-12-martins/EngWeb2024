var express = require('express');
var router = express.Router();

var express = require('express');
var router = express.Router();
var axios=require("axios")


//Listagem
router.get('/', function(req, res, next) {
    axios.get("http://localhost:3000/compositores?_sort=nome")
        .then(resp=>{
            compositores=resp.data
            res.status(200).render("compositoresListagem",{"compositoreslist":compositores})
        })
        .catch(erro=>{
           res.status(501).render("error",{"error":erro})
        })
});

//Registo
router.get('/registo', function(req, res, next) {
    res.status(200).render("compositoresRegisto",{})
});

router.post('/registo', function(req, res, next) {
    result=req.body
    axios.post("http://localhost:3000/compositores",result)
      .then(resp=>{
            res.redirect("/")
        })
        .catch(erro=>{
            res.status(502).render("error",{"error":erro})
        })
  });

//Alterar
router.get('/editar/:idCompositor', function(req, res, next) {
    var id=req.params.idCompositor
    axios.get("http://localhost:3000/compositores/"+id)
        .then(resp=>{
            compositor=resp.data
            res.status(200).render("compositoresAltera",{"compositor":compositor})
  
        })
        .catch(erro=>{
            res.status(504).render("error",{"error":erro})
        })
  });
  
  router.post('/editar/:idCompositor', function(req, res, next) {
    var compositor=req.body
    axios.put("http://localhost:3000/compositores/"+compositor.id, compositor)
        .then(resp=>{
            res.redirect("/")
        })
        .catch(erro=>{
            res.status(505).render("error",{"error":erro})
        })
  });

  
module.exports = router;
