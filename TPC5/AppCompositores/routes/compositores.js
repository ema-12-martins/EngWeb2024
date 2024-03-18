var express = require('express');
var router = express.Router();

var express = require('express');
var router = express.Router();
var axios=require("axios")

router.get('/', function(req, res, next) {
    axios.get("http://localhost:3000/compositores?_sort=nome")
        .then(resp=>{
            compositores=resp.data
            res.status(200).render("compositoresListPage",{"compositoreslist":compositores})
        })
        .catch(erro=>{
           res.status(501).render("error",{"error":erro})
        })
});

router.get('/registo', function(req, res, next) {
    res.status(200).render("compositoresFormPage",{})
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

  
module.exports = router;
