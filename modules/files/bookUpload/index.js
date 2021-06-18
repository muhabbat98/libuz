const {FileModel }= require("../databaseConnection")
const database = new FileModel()

module.exports  = async function(req, res){
    
    for (let one of req.files){
       const [row ]=await database.createFile(one.filename, one.mimetype, one.destination)
        res.json(row) 
    } 
    
  
   
}