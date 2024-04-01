var mongoose = require('mongoose')
const {modelName}=require('../models/compositores')
var Compositor = require('../models/compositores')

//Get
module.exports.list=()=>{
    return Compositor.find().sort({nome:1}).exec()
}

//Insert
module.exports.insert=compositor=>{
    var newCompositor=new Compositor(compositor)
    return newCompositor.save()
}

//Update
module.exports.list=(id,compositor)=>{
    return Compositor.findByIdAndUpdate(id,compositor,{new:true}).exec() //new é para devolver os dados que foram mudados
}

//Delete
module.exports.remove=id=>{
    return Compositor.findByIdAndDelete(id).exec()
}