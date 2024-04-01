var mongoose = require('mongoose')

var compositorSchema=new mongoose.Schema({
    _id:{type:String,require:true},
    nome:String,
    bio:String,
    dataNasc:String,
    dataObito:String,
    periodo:String,
},{versionKey:false})

module.exports=mongoose.model('compositores',compositorSchema)