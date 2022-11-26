

const expres= require('express')
const app= expres()
const cors= require('cors')

const puerto= 9000
app.set('port', puerto)

app.use(expres.urlencoded({extended:false}))
app.use(expres.json())
app.use(cors())




//app.use('/api/tododeportes',require('./routes/index'));
app.use('/api', require('./routes/process_user'));



// hace lo mismo que la funcion de arriba //
//app.get('/',(req,res)=>{
//    res.json({"items":"get"})
//})

app.listen(app.get('port'),()=>{
console.log(`server running to port ${app.get('port')}`)
}
)





