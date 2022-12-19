const mongoose = require('mongoose');
const Schema = mongoose.Schema

const deportesSchema = new Schema({
    dep_id:{type:Number,unique:true,Trim:true},
    dep_nombre:{type:String,unique:true,Trim:true}
})

module.exports = mongoose.model('deportes',deportesSchema) 