var mongoose = require('mongoose')

var pessoaSchema=new mongoose.Schema({
    nome:String,
    idaed:String,
    sexo:String,
    morada: {
        cidade: String,
        distrito: String
    },
    BI:String,
    descricao: String,
    profissao: String,
    partido_politico:{
        party_abbr:String,
        party_name: String,
    },
    religiao: String,
    desportos:[String],
    animais:[String],
    figura_publica_pt:[String],
    marca_carro:String,
    destinos_favoritos:[String],
    atributos:{
        fumados: Boolean,
        gosta_cinema: Boolean,
        gosta_viajar: Boolean,
        acorda_cedo: Boolean,
        gosta_ler: Boolean,
        gosta_musica: Boolean,
        gosta_comer : Boolean,
        gosta_animais_estimacao: Boolean,
        gosta_dancar: Boolean,
        comida_favorita: String

    },
    _id:{type:Number,require:true},


},{versionKey:false})

module.exports=mongoose.model('prova_afericao',pessoaSchema,'prova_afericao') //Nome da colecao .... Para nao meter o s no fim