const express = require('express')

const router = express.Router()
const usuariosController = require('../controllers/usuariosController')
const marcadoresController = require('../controllers/marcadoresController')
const equiposController = require('../controllers/equiposController')
const deportesController = require('../controllers/deportesController')

module.exports = ()=>{
    router.get('/usuarios',usuariosController.list)
    router.post('/usuarios',usuariosController.add)
    router.get('/usuarios/:id',usuariosController.show)
    router.put('/usuarios/:id',usuariosController.update)
    router.delete('/usuarios/:id',usuariosController.delete)
    router.get('/marcadores',marcadoresController.list)
    router.post('/marcadores',marcadoresController.add)
    //router.get('/marcadores/:id',marcadoresController.show)
    router.get('/marcadores/:lim',marcadoresController.limit)
    router.get('/marcadores/:usuarioName/:usuarioCorreo',marcadoresController.marcadoresDeUsuario)
    router.put('/marcadores/:id',marcadoresController.update)
    router.delete('/marcadores/:id',marcadoresController.delete)
    router.get('/equipos',equiposController.list)
    router.post('/equipos',equiposController.add)
    router.get('/equipos/:id',equiposController.show)
    router.put('/equipos/:id',equiposController.update)
    router.delete('/equipos/:id',equiposController.delete)
    router.get('/deportes',deportesController.list)
    router.post('/deportes',deportesController.add)
    router.get('/deportes/:id',deportesController.show)
    router.put('/deportes/:id',deportesController.update)
    router.delete('/deportes/:id',deportesController.delete)
    return router
}

