const {Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password:'123',
    port:5432,
    database:'ill'
  })


class Model {
    constructor (){
        this.pool = this.pool||pool
    }
     async query(SQL, ...parms){
         const client = await pool.connect()
         try{
            return client.query(SQL, parms? parms :null) 
         }
         catch(err){
            throw new error('error with database connection') 
        }
         finally{
            client.release()
         }
     }
  }

  module.exports.Model = Model
