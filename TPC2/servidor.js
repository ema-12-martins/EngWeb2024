var http = require('http');
var axios = require('axios'); // Fazer pedidos a api de dados
const { write } = require('fs');

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

    if (req.url === "/cidades") {

        //Faz a pagina princiapal
        axios.get("http://localhost:3000/cidades?_sort=nome")
            .then((resp) => {
                var data = resp.data;
                
                res.write("<h1 style='text-align:center;background-color:Grey'>Cidades</h1>");
                res.write("<ul>");
                for (var i in data) {
                    res.write("<li><a href='/cidades/" + data[i].id + "'>" + data[i].nome + "</a></li>");
                }
                res.write("</ul>");
                res.end();
            })
            .catch((erro) => {
                console.log("Erro: " + erro);
                res.write("<p>Erro ao obter as cidades: " + erro + "</p>");
                res.end(); 
            });

    }else if (req.url.startsWith("/cidades/")) {
        var codigoCidade = req.url.split("/")[2];
        
        axios.get("http://localhost:3000/cidades/" + codigoCidade)
            .then((resp) => {
                var data = resp.data;
    
                var cabecalho = `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>Cidades</title>
                        <meta charset="UTF-8">
                    </head>
                    <body>
                `;
                
                res.write(cabecalho);
                res.write("<h1 style='text-align:center;background-color:Grey'>" + data.nome + "</h1>");
                res.write("<p><b>Código da Cidade: </b>"+data.id+"</p>")
                res.write("<p><b>População: </b>"+data.população+"</p>")
                res.write("<p><b>Destrito: </b>"+data.distrito+"</p>")
                res.write("<p><b>Descrição: </b>"+data.descrição+"</p>")
                res.write("<h3 style='text-align:center'><a href='/cidades'>Voltar</a></h3>");
                
                res.write("</body>")
                res.write("</html>")
                res.end(); // Finaliza a resposta após escrever o conteúdo HTML
            })
            .catch((erro) => {
                console.log("Erro: " + erro);
                res.write("<p>Erro ao obter informações da cidade: " + erro + "</p>");
                res.end(); 
            });

    } else {
        res.write("<p>Rota não encontrada</p>");
        res.end();
    }
}).listen(2324);

console.log("Servidor à escuta na porta 2324");
