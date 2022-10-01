
const cnx = require('../common/appsettings')
const { request, response } = require('express');

let pool = cnx.pool;


const consulta = (request, response) => {
    ruc = request.body.ruc;
    let cadena = 'select * from cliente \n\r' +
                'where ruc = \' ' + ruc +' \'';
    pool.query('select * from name_table',[request.body.ruc],
    (error, results)=>{
        if (error) {
            response.status(200).json({ estado: false, mensaje: "error: en la consulta BD", data: null });
        } else {
            response.status(200).json({ estado: false, mensaje: "DB:consulta correcto", data: results.rows })
            console.log(results.rows);
        }
    });
}

module.exports = {
    consulta
}


