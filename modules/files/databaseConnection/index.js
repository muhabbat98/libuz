const { Model } = require('../../../connect/pool')

class FileModel extends Model{
    async createFile (filename, mimetype, path){
        const{ rows }= await this.query("INSERT INTO book_file (filename, mimetype, path) VALUES ($1, $2, $3) RETURNING file_id, filename, path, mimetype", filename, mimetype, path)
        return rows
    }
    async createImage (filename, mimetype, path){
        const{ rows }= await this.query("INSERT INTO book_image (filename, mimetype, path) VALUES ($1, $2, $3)  RETURNING image_id, filename, path", filename, mimetype, path)
        return rows
    }
}
module.exports = {FileModel}
