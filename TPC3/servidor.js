const axios = require('axios');

axios.get('http://localhost:3000/filmes')
    .then(resp => {
        data = resp.data;
        data.forEach(a => {
            console.log(JSON.stringify(data)); // Passa o objeto para string
        });
    })
    .catch(error => {
        console.log(error);
    });