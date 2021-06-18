const {FileModel }= require("../databaseConnection")
const database = new FileModel()

module.exports  = async function(req, res){
    console.log(req.files)
    if(req.files){
        for(let one of req.files){
            const [row] =await database.createImage(one.filename, one.mimetype, one.path )            
            res.json(row)
        }
    }
    
}