
const cnx = require('../common/appsettings')
const { request, response } = require('express');

let pool = cnx.pool;


const consulta = async (request, response) => {
    ruc = request.body.ruc;
    console.log(ruc);
    let cadena = 'select * from cliente \n\r' +
                'where ruc = \'' + ruc +'\'';
                console.log(cadena);
    await pool.query(cadena, (error, results) => {
        if (error) {
            response.status(200).json({ estado: false, mensaje: "error: en la consulta BD", data: null });
        } else {
            response.status(200).json({ estado: true, mensaje: "DB:consulta correcto", data: results.rows });
        } 
    });
}

module.exports = {
    consulta
}


