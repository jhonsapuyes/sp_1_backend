const mongoose = require('mongoose');
const Schema = mongoose.Schema

const marcadoresSchema = new Schema({
    mar_id:{type:Number,trim:true,unique:true,require:true},
    mar_fecha_event:{type:Date,require:true,trim:true},
    mar_fecha_registro:{type:Date,require:true,trim:true},
    mar_hora_event:{type:String,require:true,trim:true},
    mar_hora_registro:{type:String,require:true,trim:true},
    equi_id_1:{type:Number,require:true,trim:true},
    equi_id_2:{type:Number,require:true,trim:true},
    mar_equi_1:{type:Number,require:true,trim:true},
    mar_equi_2:{type:Number,require:true,trim:true},
    mar_dep_id:{type:Number,require:true,trim:true},
    mar_usu_id:{type:Number,require:true,trim:true}
})
module.exports = mongoose.model('marcadores',marcadoresSchema)