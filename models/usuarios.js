const mongoose = require('mongoose');
const Schema = mongoose.Schema

const usuariosSchema = new Schema({
    usu_id:{type:Number,Trim:true,unique:true},
    usu_email:{type:String,Trim:true,unique:true,lowercase:true},
    usu_clave:{type:String,require:true,trim:true},
    usu_nombre:{type:String,require:true,trim:true},
    usu_access:{type:String,require:true,trim:true}
})

module.exports = mongoose.model('usuarios',usuariosSchema)