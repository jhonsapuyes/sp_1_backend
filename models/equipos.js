const mongoose = require('mongoose');
const Schema = mongoose.Schema

const equiposSchema = new Schema({
    equi_id:{type:Number,Trim:true,unique:true,require:true},
    equi_nombre:{type:String,Trim:true,unique:true,lowercase:true,require:true},
    equi_img:{type:String,Trim:true},
    dep_id:{type:Number,Trim:true,require:true}
})

module.exports = mongoose.model('equipos',equiposSchema) 