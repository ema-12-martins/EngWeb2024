var mongoose = require('mongoose')
const {modelName}=require('../models/pessoas')
var Pessoa = require('../models/pessoas')

//Get
module.exports.list=()=>{
    return Pessoa.find().sort({nome:1}).exec()
}

//Insert
module.exports.insert=Pessoa=>{
    var newPessoa=new Pessoa(Pessoa)
    return newPessoa.save()
}

//Update
module.exports.update=(id,Pessoa)=>{
    return Pessoa.findByIdAndUpdate(id,Pessoa,{new:true}).exec() //new é para devolver os dados que foram mudados
}

//Delete
module.exports.remove=id=>{
    return Pessoa.findByIdAndDelete(id).exec()

    //ALTERNATIVA QUE FUNCIONA
    //Pessoa.find({_id:id}).deleteOne().exec()
}