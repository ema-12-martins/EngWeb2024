var http = require('http');
var url = require('url');
var axios = require('axios');
var fs = require('fs');
var templates = require('./templates')

//what occores if the user searchs for /compositores
http.createServer((req, res) => {
    console.log(req.method + " " + req.url);
    if (req.url == '/compositores') {
        axios.get("http://localhost:3000/compositores?_sort=nome")
            .then(resp=>{
                compositores=resp.data
                pag_compositores=templates.paginaCompositores(compositores)
                res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
                res.write(pag_compositores)
                res.end()
            })
            .catch(erro=>{
                res.writeHead(500,{'Content-Type':'text/html;charset=utf-8'})
                res.write("<p>Nao foi possivel carregar a pagina de compositores</p>")
                res.end()
            })
    }else if (/\/compositores\/C[0-9]+$/i.test(req.url)) {
        id = req.url.split('/')[2]
        axios.get("http://localhost:3000/compositores?id="+id)
            .then(resp=>{
                compositor=resp.data
                pag_compositor=templates.paginaCompositor(compositor)
                console.log(pag_compositor)
                res.writeHead(201,{'Content-Type':'text/html;charset=utf-8'})
                res.write(pag_compositor)
                res.end()
            })
            .catch(erro=>{
                res.writeHead(501,{'Content-Type':'text/html;charset=utf-8'})
                res.write("<p>Nao foi possivel carregar a pagina do compositor</p>")
                res.end()
            })

    } else if (req.url == '/w3.css') {
        fs.readFile("w3.css", (erro, dados) => {
            res.writeHead(200, { 'Content-type': 'text/css' });
            res.write(dados);
            res.end();
        });
    }
}).listen(9040)