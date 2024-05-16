const mongoose = require('mongoose')
var Contratos = require("../models/contratos")

module.exports.list = () => {
    return Contratos
        .find()
        .exec()
}

//NAO ESTA FUNCIONAL
module.exports.findById = id => {
    return Contratos
        .find({_id : id},{})
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

module.exports.insert = con => {
    if((Contratos.find({_id : con._id}).exec()).length != 1){
        var newContratos = new Contratos(con)
        return newContratos.save()
    }
}

module.exports.remove = id => {
    return Contratos
        .find({_id : id})
        .deleteOne()
        .exec()
}

module.exports.update = (id, cont) => {
    return Contratos
        .findByIdAndUpdate(id, cont, {new : true})
        .exec()
}