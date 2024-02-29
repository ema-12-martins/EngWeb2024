var http = require('http');
var axios = require('axios');

http.createServer((req, res) => {
    // Write in the terminal the method and the url
    console.log(req.method + " " + req.url);

    if (req.url == '/films') {
        axios.get("http://localhost:3000/films") // No need for query parameters here
            .then(resp => {
                console.log(resp);
                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                const html = genOcorrencias(resp.data);
                res.write(html);
                res.end();
            })
            .catch(error => {
                console.error(error);
                res.writeHead(500, { 'Content-Type': 'text/html;charset=utf-8' });
                res.end("<h1>Internal Server Error</h1>");
            });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' });
        res.end("<h1>Not Found</h1>");
    }
}).listen(8080);

console.log('Server running at http://localhost:8080/');
