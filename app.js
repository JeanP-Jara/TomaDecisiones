const express = require('express');
const fs = require('fs'); 
var bodyParser = require('body-parser');
var cors = require('cors');
var checksum = require('checksum');
var multer = require('multer');
var path = require('path');
const app = express()
const port = 3200
const server = require('http').Server(app)
const ruta = '/archivos';


app.use(bodyParser.json({ limit: '1000mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '1000mb' }));

app.use(cors());
app.use(bodyParser.json())

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, req.query.c_ruta);
  },
  filename: function (req, file, callback) {
    callback(null, req.query.c_nombre);
  }
});

var upload = multer({ storage: storage }).single('DA');

const dbConsulta = require('./dal/consulta')


server.listen(port, function () {
    console.log('\n')
    console.log(`App running on port ${port}.`)
})

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.post('/api/info/get', dbConsulta.get);
app.post('/api/info/consulta', dbConsulta.consulta);
app.post('/api/info/uploadfile', function (req, res) {
  let archivo = req.query.carpeta;
  console.log(archivo)
  let rutaCorta = archivo + "/";
  let dir = __dirname.replace('\dal', '')+ruta+"/"+rutaCorta;
  let c_nombre = req.query.extension;

  console.log(dir)

  if (!fs.existsSync( __dirname.replace('\dal', '')+ruta+"/"+archivo)) {    
    fs.mkdirSync(__dirname.replace('\dal', '')+ruta+"/"+archivo, 0744);
    fs.mkdirSync(dir, 0744);
  }
  if(!fs.existsSync(dir)){
    fs.mkdirSync(dir, 0744);
  }
  req.query.c_ruta = dir;
  req.query.c_nombre = c_nombre;
  dir = dir + '' + c_nombre;

  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      res.status(200).json({ estado: false, mensaje: "No se pudo cargar el archivo: " + err.stack, data: null })
    } else {  
      checksum.file(dir, function (err, sum) {        
        console.log("Ruta check: ",dir);
        console.log(sum);
        nuevoNombreArchivo = __dirname.replace('\dal', '')+ruta+"/"+rutaCorta+sum+path.extname(c_nombre);
        fs.rename(dir, nuevoNombreArchivo, function(err) {
          if ( err ) console.log('ERROR: ' + err);
        });
        newRuta = rutaCorta+sum+path.extname(c_nombre);
        res.status(200).json({ estado: true, mensaje: "Archivo cargado", c_ruta: newRuta, c_nombre: c_nombre, c_checksum: sum+path.extname(c_nombre) });
        console.log("ERror",err)
      })
    }
  });
})


