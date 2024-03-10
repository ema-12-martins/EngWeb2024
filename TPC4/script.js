var http = require('http');
var url = require('url');
var axios = require('axios');
var fs = require('fs');
const { parse } = require('querystring');
var templates = require('./templates')

// Aux func to get the parameters from 
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}


//what occores if the user searchs for /compositores
http.createServer((req, res) => {
    console.log(req.method + " " + req.url);


    switch(req.method){
        case "GET": 
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
                axios.get("http://localhost:3000/compositores?id="+id)
                    .then(resp=>{
                        compositor=resp.data
                        pag_compositor=templates.paginaCompositor(compositor)
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

            //Delete some compositor
            }else if(/\/compositores\/edit\/C[0-9]+$/i.test(req.url)){
                id = req.url.split('/')[3]
                axios.delete("http://localhost:3000/compositores/"+id)
                    .then(resp=>{
                        compositor=resp.data
                        pag_compositor=templates.paginaEditarCompositor(compositor)
                        res.writeHead(203,{'Content-Type':'text/html;charset=utf-8'})
                        res.write(pag_compositor)
                        res.end()
                    })
                    .catch(erro=>{
                        res.writeHead(503,{'Content-Type':'text/html;charset=utf-8'})
                        res.write("<p>Nao foi possivel carregar a página para editar o compositor</p>")
                        res.end()
                    })
            
            //Put a new compositor
            }else if(req.url == '/compositores/new'){
                pag_compositor=templates.paginaCriaCompositor()
                console.log(pag_compositor)
                res.writeHead(204,{'Content-Type':'text/html;charset=utf-8'})
                res.write(pag_compositor)
                res.end()
    
            
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

            //Error page
            }else{
                res.writeHead(502,{'Content-Type':'text/html;charset=utf-8'})
                res.write("<p>Get request não suportado:"+req.url+"</p>")
                res.end()
            }
            break;
        case "POST":
            //Edit a compositor
            if (/\/compositores\/edit\/C[0-9]+$/i.test(req.url)) {
                id = req.url.split('/')[3]
                collectRequestBodyData(req, result => {
                    if (result) {
                        console.log(result)
                        axios.put("http://localhost:3000/compositores/" + id, result)
                            .then(resp => {
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'}); // Correct status code
                                res.write("<pre>Registo alterado:" + JSON.stringify(resp.data) + "</pre>");
                                res.end();
                            })
                            .catch(erro => {
                                res.writeHead(503, {'Content-Type': 'text/html;charset=utf-8'}); // Adjusted status code
                                res.write("<p>Não foi possível editar.</p>");
                                res.end();
                            });
            
                    } else {
                        res.writeHead(503, {'Content-Type': 'text/html;charset=utf-8'}); // Adjusted status code
                        res.write("<p>Não foi possível obter os dados do body</p>");
                        res.end();
                    }
                });

            //Create new compositor
            }else if(req.url=="/compositores/new"){
                collectRequestBodyData(req,result=>{
                    if(result){
                        axios.post("http://localhost:3000/compositores",result)
                            .then(resp=>{
                                res.writeHead(204,{'Content-Type':'text/html;charset=utf-8'})
                                res.write("<pre>Registo inserido:"+JSON.stringify(resp.data)+"</pre>")
                                res.end()
                            })
                            .catch(erro=>{
                                res.writeHead(504,{'Content-Type':'text/html;charset=utf-8'})
                                res.write(templates.errorPage("Não foi possivel adicionar o compositor"))
                                res.end()
                            })

                    }else{
                        res.writeHead(504,{'Content-Type':'text/html;charset=utf-8'})
                            res.write("<p>Nao foi possivel obter os dados do body</p>")
                            res.end()
                    }
                }) 
            }
    }
}).listen(9040)