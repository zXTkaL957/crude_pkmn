const { response } = require("express")

const controlador = {}

controlador.listar = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('CREATE DATABASE IF NOT EXISTS crudejs;')
        conn.query('USE crudejs;')
        conn.query('CREATE TABLE IF NOT EXISTS pkmn (' +
            'num VARCHAR(10) NOT NULL PRIMARY KEY,' +
            'nombre VARCHAR(50) NOT NULL,' +
            'region VARCHAR(15) NOT NULL,' +
            'tipo VARCHAR(30),' +
            'peso VARCHAR(10),' +
            'estatura VARCHAR(10));')
               
        conn.query('SELECT * FROM pkmn', (err, pkmn) => {
            if (err) {
                res.json(err)
            }
            res.render('pkmn', {
                data: pkmn
            })
        })
    })
}

controlador.agregar = (req, res) => {
    res.render('guardar_pkmn')
}

controlador.guardar = (req, res) => {
    const data = req.body

    req.getConnection((err, conn) => {
        conn.query('INSERT INTO pkmn set ?', [data], (err, pkmn) => {
            res.redirect('/')
        })
    })
}

controlador.editar = (req, res) => {
    const num = req.params.num

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM pkmn WHERE num = ?', [num], (err, pkmn) => {
            res.render('editar_pkmn', {
                data: pkmn[0]
            })
        })
    })
}

controlador.actualizar = (req, res) => {
    const num = req.params.num
    const nuevopkmn = req.body
    console.log(nuevopkmn)

    req.getConnection((err, conn) => {
        conn.query('UPDATE pkmn set ? WHERE num = ?', [nuevopkmn, num], (err, rows) => {
            res.redirect('/')
        })
    })
}

controlador.eliminar = (req, res) => {
    const num = req.params.num

    req.getConnection((err, conn) => {
        conn.query('DELETE FROM pkmn WHERE num =  ?', [num], (err, rows) => {
            res.redirect('/')
        })
    })
}

module.exports = controlador