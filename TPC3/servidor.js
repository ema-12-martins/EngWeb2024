var http = require('http');
var axios = require('axios');
var fs = require('fs');




http.createServer((req, res) => {
    // Write in the terminal the method and the url
    console.log(req.method + " " + req.url);

    if (req.url == '/films') {
        axios.get("http://localhost:3000/films?_sort=title") // No need for query parameters here
            .then(resp => {
                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                let header = `<!DOCTYPE html>
                    <html>
                        <head>
                            <meta charset="utf-8"/>
                            <title>Films list</title>
                            <link rel="stylesheet" href="style.css"/>
                        </head>
                        <body>`
                let data=resp.data

                res.write(header);
                res.write("<h1>Films List</h1>")
                res.write("<p>Click on the film you want to know more about.</p>")
                res.write('<ul class="custom-list">')
                data.forEach(element => {
                    res.write('<li><a href="films/' + element.id + '">' + element.title + '</a></li>');
                });
                res.write('</ul>')

                res.end();
            })
            .catch(error => {
                console.error(error)
                res.writeHead(500, { 'Content-Type': 'text/html;charset=utf-8' })
                res.end("<h1>Internal Server Error</h1>")
            });
    
    } else if (req.url == '/style.css') {
        fs.readFile("style.css", (error, data) => {
            if (error) {
                res.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' })
                res.end("<h1>Not Found</h1>");
            } else {
                res.writeHead(200, { 'Content-Type': 'text/css' })
                res.write(data)
                res.end()
            }
        })
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' })
        res.end("<h1>Not Found</h1>");
    }
}).listen(8080)

console.log('Server running at http://localhost:8080/')
