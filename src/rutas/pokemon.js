const express = require('express')
const router = express.Router()

const controladorpkmn = require('../controladores/controladorpkmn')

router.get('/', controladorpkmn.listar)
router.post('/add', controladorpkmn.agregar)
router.post('/save', controladorpkmn.guardar)
router.get('/delete/:num', controladorpkmn.eliminar)
router.get('/update/:num', controladorpkmn.editar)
router.post('/save/:num', controladorpkmn.actualizar)

module.exports = router
