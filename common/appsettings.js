const Pool = require('pg').Pool


//local
// const pool = new Pool({  
//   user: 'postgres',
//   host: 'localhost',
//   database: 'Toma Decisiones',
//   password: 'alex',
//   port: 5432
// })


//nube
//POSTGRESQL HEROKU
const pool = new Pool({  
  user: 'pmkxbaldnlejbp',
  host: 'ec2-3-216-167-65.compute-1.amazonaws.com',
  database: 'd8fsch77jtpkcq',
  password: '20b21f4b1fc759103c27af5f56226b70f5bdbb3b5d019fe91f9518ecbb1d7db0',
  port: 5432,
  'ssl':{rejectUnauthorized:false}

})

module.exports={
  pool
}