const { Model } = require('../../connect/pool')


class RecordModel extends Model{
    // Query 
    async allRecords(page, limit){
        if(page&&limit){
            const {rows} =await this.query("SELECT * FROM fields ORDER BY fiel_id DESC OFFSET $1 ROWS FETCH FIRST $2 ROW ONLY",(page-1)*4, limit )
            return rows
        }
        const {rows} = await this.query("SELECT * FROM fields")
        return rows
    }
    async mostDownloaded(){
        const {rows} = await this.query("SELECT * FROM fields f NATURAL JOIN countOfDownloads c ORDER BY c.count DESC LIMIT 3 ")
        return rows
    }
    async file(id){
        const {rows} = await this.query("SELECT * FROM book_file WHERE file_id=$1", id)
        return rows
    }
    async image(id){
        const {rows} = await this.query("SELECT * FROM book_image WHERE image_id=$1", id)
        return rows
    }
    async totalCount(id){
        const {rows} = await this.query("SELECT * FROM countOfDownloads WHERE file_id=$1", id)
        return rows
    }
  
    // Mutation 
    async createNewRecord(title, fileId, imageId,creator , subject,description,	type, source, relation, coverage, publisher,contributor, rights, date, format, identifier, language,audience,	provenance,	right_holders, instructional_method, accrual_method, accrual_periodicity, accrual_policy){
        
        const {rows} = await this.query("INSERT INTO fields(title, file_id, image_id, creator, subject, description, type, source, relation, coverage, publisher,contributor, rights, date, format, identifier, language,audience,	provenance,	right_holders, instructional_method, accrual_method, accrual_periodicity, accrual_policy ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24) RETURNING fiel_id, title, file_id, image_id",title, fileId, imageId,creator ,subject,description,	type, source, relation, coverage, publisher,contributor, rights, date, format, identifier, language,audience,	provenance,	right_holders, instructional_method, accrual_method, accrual_periodicity, accrual_policy)
        return rows
    }
    async addCount(id){
        const {rows:[fileId]} = await this.query("SELECT * FROM countOfDownloads WHERE file_id=$1", id)
    
        if(fileId){
            const {rows} = await this.query("UPDATE countOfDownloads SET count=$1 WHERE file_id=$2 RETURNING file_id, count, download_id", fileId.count+1, id)
            return rows
        }
        const {rows} = await this.query("INSERT INTO countOfDownloads(file_id) VALUES( $1 )RETURNING file_id, count, download_id", id)
        return rows
      
    }
   
}
module.exports = {RecordModel}