

const {Router}= require('express')
const { each } = require('underscore')
const route= Router()
const _= require('underscore')

const usuarios= require('../datos/sample.json')

const querys= require('./sql/process_sql')

//http://localhost:9000/api/deportes
//http://localhost:9000/api/usuarios
route.get('/:table',(req,res)=>{
    const sql_get='SELECT * from '+ req.params.table
    querys.conn.query(sql_get, (error,results,fields) => {
        if(error){
            throw error;
        }
        if(results.length > 0){
            res.json(results)
        }
        else{
            res.json([{"respuesta":"not results"}])
        }
    })
        //res.json(usuarios)
})

//http://localhost:9000/api/usuarios/nombre_equipo
route.get('/:table/:nombre/p',(req,res)=>{
    const sql_get='SELECT * from '+ req.params.table + ' WHERE mar_dep_id= "'+req.params.nombre+'" ORDER BY mar_fecha_event DESC LIMIT 3'
    querys.conn.query(sql_get, (error,results) => {
        if(error){
            throw error;
        }
        if(results.length > 0){
            res.json(results)
        }
        else{
            res.json([{"respuesta":"not results"}])
        }
    })
        //res.json(usuarios)
})
//http://localhost:9000/api/usuarios/nombre_equipo
route.get('/:table/:nombre/e',(req,res)=>{
    const sql_get='SELECT * from '+ req.params.table + ' WHERE mar_dep_id= "'+req.params.nombre+'"'
    querys.conn.query(sql_get, (error,results) => {
        if(error){
            throw error;
        }
        if(results.length > 0){
            res.json(results)
        }
        else{
            res.json([{"respuesta":"not results"}])
        }
    })
        //res.json(usuarios)
})

//http://localhost:9000/api/usuarios
route.post('/:table',(req,res)=>{

        const sql_post='INSERT INTO '+req.params.table+' SET ?'
        querys.conn.query(sql_post, [req.body], error => {
            if(error){
                throw error;
            }
            else{
                res.send("guardado")
            }
        })

        //const id=usuarios.length +1
        //const new_user={...req.body,id}
        //usuarios.push(new_user)
        //res.send(usuarios)
    

})

//http://localhost:9000/api/usuarios/ID/4
route.put('/:table/:field/:id',(req,res)=>{
    const {id}= req.params
    const tabla= req.params.table
    const campo_id= req.params.field

    const sql_put= 'UPDATE '+tabla+' SET ? WHERE '+campo_id+'= ?'
    querys.conn.query(sql_put,[req.body,req.params.id], error => {
        if(error){
            throw error;
        }
        else{
            res.send("actualizado")
        }
    })


    //const {id}= req.params;
    //const {nombre,password}= req.body
    //if(nombre&&password){
    //    _,each(usuarios,(usuario, i)=>{
    //        if(usuario.id == id){
    //            usuario.nombre= nombre,
    //            usuario.password= password
    //        }
    //    })
    //    res.json(usuarios)
    //}
    //else{
    //    res.status(500).json({error:"there was an error"})
    //}
})

//http://localhost:9000/api/usuarios/ID/4
route.delete('/:table/:field/:id',(req,res)=>{
    const tabla= req.params.table
    const campo_id= req.params.field
    const id= req.params.id

    const sql_put= 'DELETE FROM '+tabla+' WHERE '+campo_id+'='+id+''
    querys.conn.query(sql_put, error => {
        if(error){
            throw error;
        }
        else{
            res.send("borrado")
        }
    })


    //const {id}= req.params;
    //_,each(usuarios,(usuario, i)=>{
    //    if(usuario.id == id){
    //        usuarios.splice(i,1)
    //    }
    //})
    //res.json(usuarios)
})

//login   //http://localhost:9000/api/usuarios/usuario_1/clave_1
route.get('/:table/:user/:pass',(req,res)=>{
    const sql_get='SELECT * from '+ req.params.table + ' WHERE usu_nombre="' + req.params.user + '" AND usu_clave="' + req.params.pass +'"'
    querys.conn.query(sql_get, (error,results,fields) => {
        if(error){
            throw error;
        }
        if(results.length > 0){
            res.json(results)
        }
        else{
            res.json([{"respuesta":"not results"}])
        }
    })
        //res.json(usuarios)
})

module.exports= route;




