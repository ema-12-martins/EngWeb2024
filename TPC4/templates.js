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
                    <a href="http://localhost:9040/compositores/new" class="w3-btn w3-purple w3-mb-2">Registar novo compositor</a>
                </header>
                <table class="w3-table w3-bordered">`;

    for(let i=0; i < compositores.length ; i++){
        pagHTML +=`
                    <tr>
                    <td><a href="/compositores/${compositores[i].id}">${compositores[i].nome}</a></td>
                    <td><a href="http://localhost:9040/compositores/delete/${compositores[i].id}" class="button">Eliminar</a></td>
                    <td><a href="http://localhost:9040/compositores/edit/${compositores[i].id}" class="button">Editar</a></td>
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
                            <th>Periodo id</th>

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
                            <td>${compositores[i].periodo_id}</td>
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

// HTML Template Issues
exports.paginaEditarCompositor = function(compositor){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="stylesheet" href="/w3.css"/>
            <title>Editar Compositor</title>
        </head>
        <body>
            <form class="w3-container" method="POST" action="/compositores/edit/${compositor.id}"> <!-- Correct form action -->
                <fieldset>
                    <legend>Informações</legend>
                    <label>Id</label>
                    <input class="w3-input w3-round" type="text" name="id" value="${compositor.id}"/>
                    <label>Nome</label>
                    <input class="w3-input w3-round" type="text" name="nome" value="${compositor.nome}"/>
                    <label>Bio</label>
                    <input class="w3-input w3-round" type="text" name="bio" value="${compositor.bio}"/>
                    <label>Data nascimento:</label>
                    <input class="w3-input w3-round" type="text" name="dataNasc" value="${compositor.dataNasc}"/>
                    <label>Data obito:</label>
                    <input class="w3-input w3-round" type="text" name="dataObito" value="${compositor.dataObito}"/>
                    <label>Periodo:</label>
                    <input class="w3-input w3-round" type="text" name="periodo" value="${compositor.periodo}"/>
                    <label>Periodo id:</label>
                    <input class="w3-input w3-round" type="text" name="periodo_id" value="${compositor.periodo_id}"/>
                </fieldset>
                <button class="w3-btn w3-purple w3-mb-2" type="submit">Alterar</button>
            </form>
        </body>
    </html>`;
    return pagHTML;
}

exports.paginaCriaCompositor = function(){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="stylesheet" href="/w3.css"/>
            <title>Criar Compositor</title>
        </head>
        <body>
            <form class="w3-container" method="POST" action="/compositores/new"> <!-- Correct form action -->
                <fieldset>
                    <legend>Informações</legend>
                    <label>Nome</label>
                    <input class="w3-input w3-round" type="text" name="name"/>
                    <label>Bio</label>
                    <input class="w3-input w3-round" type="text" name="bio"/>
                    <label>Data nascimento:</label>
                    <input class="w3-input w3-round" type="text" name="dataNas"/>
                    <label>Data obito:</label>
                    <input class="w3-input w3-round" type="text" name="dataOb"/>
                    <label>Periodo:</label>
                    <input class="w3-input w3-round" type="text" name="periodo"/>
                </fieldset>
                <button class="w3-btn w3-purple w3-mb-2" type="submit">Registar</button>
            </form>
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