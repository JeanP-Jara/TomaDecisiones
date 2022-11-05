const cnx = require('../common/appsettings')
const { request, response } = require('express');

let pool = cnx.pool;

const login = (request, response) => {

    pool.query('Select n_idseg_userprofile, c_username, c_nombre1,c_nombre2, c_nombre3, c_appaterno, c_apmaterno, b_activo from seg_userprofile where n_borrado = 0 and c_username = $1 and c_password = $2',
        [request.body.c_username, request.body.c_password], (error, results) => {
            if (error) {
                response.status(200).json({ estado: false, mensaje: "error: usuario o contraseña inválidos!.", data: null })
            } else {
                if (results.rowCount > 0) {
                    console.log("estado",results.rows[0].b_activo);
                    if(results.rows[0].b_activo){                        
                        response.status(200).json({ estado: true, mensaje: "", data: results.rows[0] })
                    }else{
                        response.status(200).json({ estado: false, mensaje: "DB: Usuario no Activo", data: null })
                    }
                    
                } else {
                    response.status(200).json({ estado: false, mensaje: "DB:usuario o contraseña inválidos!.", data: null })
                }
            }
        })
} 

module.exports = {
    login
}
