const mongoose = require('mongoose')
var Contratos = require("../models/contratos")

module.exports.list = () => {
    return Contratos
        .find()
        .exec()
}
