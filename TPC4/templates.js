exports.paginaCompositores = function(compositores){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Pagina Compositores</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-teal">
                    <h1>Compositores</h1>
                </header>
                <table class="w3-table w3-bordered">`;

    for(let i=0; i < compositores.length ; i++){
        pagHTML +=`
                    <tr>
                    <td><a href="/compositores/${compositores[i].id}">${compositores[i].nome}</a></td>
                    <td><a href="http://localhost:9040/compositores/delete/${compositores[i].id}" class="button">Eliminar</a></td>
                    </tr>`;
    }
    pagHTML += `
                </table>
            </div>
        </body>
    </html>`;
    return pagHTML;
}


exports.paginaCompositor = function(compositores){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="stylesheet" href="/w3.css"/>
            <title>Pagina Compositores</title>
        </head>
        <body>
            <div class="w3-card-4">
        
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Bio</th>
                            <th>Data Nascimento</th>
                            <th>Data Obito</th>
                            <th>Periodo</th>
                        </tr>`;

    // Iterate over each composer in the array
    for(let i = 0; i < compositores.length; i++){
        pagHTML += `
                        <tr>
                            <td>${compositores[i].id}</td>
                            <td>${compositores[i].nome}</td>
                            <td>${compositores[i].bio}</td>
                            <td>${compositores[i].dataNasc}</td>
                            <td>${compositores[i].dataObito}</td>
                            <td>${compositores[i].periodo}</td>
                        </tr>`;
    }

    pagHTML += `
                    </table>
                </div>
            </div>
        </body>
    </html>`;
    return pagHTML;
}

exports.paginaPeriodos = function(periodos){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Pagina Compositores</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-teal">
                    <h1>Periodos</h1>
                </header>
                <table class="w3-table w3-bordered">`;

    for(let i=0; i < periodos.length ; i++){
        pagHTML +=`
                    <tr>
                    <td><a href="/periodos/${periodos[i].id}">${periodos[i].nome}</a></td>
                    </tr>`;
    }
    pagHTML += `
                </table>
            </div>
        </body>
    </html>`;
    return pagHTML;
}