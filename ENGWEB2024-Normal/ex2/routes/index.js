var express = require('express');
var router = express.Router();
var axios=require("axios")

/* GET home page. */
router.get('/', function(req, res, next) {
  var d = new Date().toString().substring(0,16)
  axios.get("http://localhost:16000/")
      .then(resp=>{
          dados=resp.data
          res.status(200).render("ListPage",{"listaObjetos":dados,"date":d})
          res.end()

      })
      .catch(erro=>{
          res.status(501).render("error",{"error":erro})
      })
});

router.get('/:idObjeto', function(req, res, next) {
    var d = new Date().toString().substring(0,16);
    var id = req.params.idObjeto;

    axios.get("http://localhost:16000/contratos/" + id)
        .then(resp => {
            var dados = resp.data;
            res.status(200).render("objectPage", {"objeto": dados, "date": d});
        })
        .catch(erro => {
            res.status(503).render("error", {"error": erro});
        });
});

router.get('/entidades/:nipc', function(req, res) {
    var d = new Date().toString().substring(0,16);
    var id = req.params.nipc;
    console.log(id)

    axios.get("http://localhost:16000/contratos?entidade=" + id)
        .then(resp => {
            var dados = resp.data;
            console.log(dados)
            res.status(200).render("entidade", {"objeto": dados, "date": d,"entidade":entidade});
        })
        .catch(erro => {
            res.status(503).render("error", {"error": erro});
        });
    
})

module.exports = router;
