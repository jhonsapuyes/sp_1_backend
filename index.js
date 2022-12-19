require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/');


const app = express();

mongoose.Promise=global.Promise

const conexion=process.env.MONGO_CONEXION
const db=process.env.DB
mongoose.connect(
    conexion+db,
    //'mongodb://127.0.0.1/marcador?directConnection=true',
    //'mongodb+srv://sebas2501:c6pGWew44b9McctI@cluster0.pmcotgz.mongodb.net/atlasmarcador',
    {useNewUrlParser:true}
    )  

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())

app.use('/',routes())

//app.get('/',(req,res)=>{
//    res.send('mimongo 2022 g16')
//});

const port_server=process.env.PORT_SERVER || 5000
app.listen(port_server,()=>{
    console.log('server is listening: '+port_server)
})
