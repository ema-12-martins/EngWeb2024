var http = require('http');
var url = require('url');
var axios = require('axios');
var fs = require('fs');
var templates = require('./templates')

//what occores if the user searchs for /compositores
http.createServer((req, res) => {
    console.log(req.method + " " + req.url);

    //List compositores
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

    //Page compositor
    }else if (/\/compositores\/C[0-9]+$/i.test(req.url)) {
        id = req.url.split('/')[2]
        console.log(id)
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
    
    //Delete some compositor
    }else if(/\/compositores\/delete\/C[0-9]+$/i.test(req.url)){
        id = req.url.split('/')[3]
        console.log(id)
        axios.delete("http://localhost:3000/compositores/"+id)
            .then(resp=>{
                res.writeHead(202,{'Content-Type':'text/html;charset=utf-8'})
                res.write("<p>Registo Apagado</p>")
                res.write('<a href="http://localhost:9040/compositores" class="button">Voltar</a>')
                res.end()

            })
            .catch(erro=>{
                res.writeHead(502,{'Content-Type':'text/html;charset=utf-8'})
                res.write("<p>Nao foi possivel eliminar compositor</p>")
                res.end()
            })


    
    //List periodos
    }else if (req.url == '/periodos') {
    axios.get("http://localhost:3000/periodos_musicais?_sort=nome")
        .then(resp=>{
            periodos=resp.data
            pag_periodos=templates.paginaPeriodos(periodos)
            res.writeHead(202,{'Content-Type':'text/html;charset=utf-8'})
            res.write(pag_periodos)
            res.end()
        })
        .catch(erro=>{
            res.writeHead(502,{'Content-Type':'text/html;charset=utf-8'})
            res.write("<p>Nao foi possivel carregar a pagina dos periodos</p>")
            res.end()
        })
    
    //Get the stylesheet
    } else if (req.url == '/w3.css') {
        fs.readFile("w3.css", (erro, dados) => {
            res.writeHead(200, { 'Content-type': 'text/css' });
            res.write(dados);
            res.end();
        });
    }
}).listen(9040)