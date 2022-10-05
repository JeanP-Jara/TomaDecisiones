
const cnx = require('../common/appsettings')
const { request, response } = require('express');

let pool = cnx.pool;

const get = (request, response) => {
    iddeuda = request.body.iddeuda;
    let cadena = '';
    if (iddeuda == 1) {
        cadena = 'select * from cliente where deuda != 0';
    }else if (iddeuda == 2){
        cadena = 'select * from cliente where deuda = 0';
    }else{
        cadena = 'select * from cliente';
    }
    
    console.log(cadena);
    pool.query(cadena, (error, results) => {
        if (error) {
            response.status(200).json({ estado: false, mensaje: "error: en la consulta BD", data: null });
        } else {
            response.status(200).json({ estado: true, mensaje: "DB:consulta correcto", data: results.rows });
        } 
    });
}

const consulta = (request, response) => {
    ruc = request.body.ruc;
    console.log(ruc);
    let cadena = 'select * from cliente \n\r' +
                'where ruc = \'' + ruc +'\'';
                console.log(cadena);
    pool.query(cadena, (error, results) => {
        if (error) {
            response.status(200).json({ estado: false, mensaje: "error: en la consulta BD", data: null });
        } else {
            response.status(200).json({ estado: true, mensaje: "DB:consulta correcto", data: results.rows });
        } 
    });
}



module.exports = {
    get,
    consulta
}


