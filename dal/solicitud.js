const cnx = require('../common/appsettings')
const { request, response } = require('express');

let pool = cnx.pool;

const registrarSolicitud = (request, response) => {
    
    console.log(request.body);
    
    let n_id_solicitud_cliente = request.body.n_id_solicitud_cliente;
    let c_nombre = request.body.c_nombre;
    let n_id_tipo_doc = request.body.n_id_tipo_doc;
    let c_documento = request.body.c_documento;
    let c_direccion = request.body.c_direccion;
    let c_codigo = request.body.c_codigo;
    let c_tipo_persona = request.body.c_tipo_persona;

    let cadena = 'do $$ \n\r' +
        '   begin \n\r' +
        '       if(exists(select n_id_solicitud_cliente from solicitud_cliente where n_id_solicitud_cliente =' + n_id_solicitud_cliente + ')) then \n\r' +
        '           update solicitud_cliente set c_nombre = \'' + c_nombre + '\', n_id_tipo_doc=' + n_id_tipo_doc + ', c_documento=\'' + c_documento + '\', c_direccion=\'' + c_direccion + '\', d_fechamodi= now() where n_id_solicitud_cliente = ' + n_id_solicitud_cliente + '; \n\r' +
        '       else \n\r' +
        '           insert into solicitud_cliente(n_id_solicitud_cliente, c_direccion, n_id_tipo_doc, c_documento, c_nombre, c_codigo, n_borrado, d_fechacrea, c_tipo_persona) \n\r' +
        '           values (default,\'' + c_direccion + '\',' + n_id_tipo_doc + ',\''+ c_documento +'\', \'' + c_nombre + '\', \'' + c_codigo + '\', 0, now(), \''+c_tipo_persona+'\' ); \n\r' +
        '       end if; \n\r' +
        '   end \n\r' +
        '$$';
    pool.query(cadena,
        (error, results) => {
            if (error) {
                console.log(error);
                response.status(200).json({ estado: false, mensaje: "DB: error! registrarSolicitud!.", data: null })
            } else {
                response.status(200).json({ estado: true, mensaje: "", data: results.rows })
            }
        })
}

const saveFile = (request,response)=>{
    
    let c_nombre = request.body.c_nombre; 
    let c_ruta = request.body.c_ruta;
    let c_checksum = request.body.c_checksum;

    let cadena ='insert into doc_archivo(n_id_doc_archivo, c_nombre, c_ruta, c_checksum,  n_borrado, d_fechacrea) \n\r' +
    '           values (default, \'' + c_nombre + '\',\''+ c_ruta +'\', \''+ c_checksum +'\', 0, now() );' ;       
    pool.query(cadena,
        (error, results) => {
            if (error) {
                console.log(error);
                response.status(200).json({ estado: false, mensaje: "DB: error!. saveFile!", data: null })
            } else {
                response.status(200).json({ estado: true, mensaje: "", data: results.rows })
            }
        })
}

const getSolicitudes = (request,response)=>{
    
    let c_codigo = request.body.c_codigo; 
    let codigo = '%'+c_codigo+'%'

    let cadena ='SELECT * FROM solicitud_cliente \n\r' +
                'WHERE  c_codigo like \''+codigo+'\' ';
    pool.query(cadena,
        (error, results) => {
            if (error) {
                console.log(error);
                response.status(200).json({ estado: false, mensaje: "DB: error!. saveFile!", data: null })
            } else {
                response.status(200).json({ estado: true, mensaje: "", data: results.rows })
            }
        })
}

module.exports = {
    registrarSolicitud,
    saveFile,
    getSolicitudes
}

