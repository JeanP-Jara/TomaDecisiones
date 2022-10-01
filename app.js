const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors');

const app = express()
const port = 3200
const server = require('http').Server(app)

app.use(bodyParser.json({ limit: '1000mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '1000mb' }));

app.use(cors());
app.use(bodyParser.json())

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

const dbConsulta = require('./dal/consulta')


server.listen(port, function () {
    console.log('\n')
    console.log(`App running on port ${port}.`)
})

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })

app.post('/api/info/consulta', dbConsulta.consulta);

