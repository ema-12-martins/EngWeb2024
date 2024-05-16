const mongoose = require('mongoose')
var Contratos = require("../models/contratos")

module.exports.list = () => {
    return Contratos
        .find()
        .exec()
}

//NAO ESTA FUNCIONAL
module.exports.findById = id => {
    return Contracts
        .findOne({_id : id})
        .exec()
}

module.exports.findEntidade = function(id) {
    return Contratos.find({ entidade_comunicante: id });
}

module.exports.findTipo = function(id) {
    return Contratos.find({ tipoprocedimento: id });
}

module.exports.listEntidades = () => {
    return Contratos.distinct("entidade_comunicante").sort()
}

module.exports.listTipos = () => {
    return Contratos.distinct("tipoprocedimento").sort()
}
