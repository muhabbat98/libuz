const { Model } = require('../../connect/pool')


class QuestionModel extends Model{
    // Query 
   async allQuestions (){
       const {rows} =await this.query("SELECT * FROM questions q  LEFT JOIN themes t ON q.theme_id=t.theme_id")
       return rows
   }
   async oneQuestion (id){
        const {rows} =await this.query(" SELECT * FROM questions q LEFT JOIN themes t ON q.theme_id=t.theme_id WHERE q.question_id = $1", id)
        return rows
    }
    async notAnsweredRoom(roomId){
        const {rows} =await this.query("SELECT * FROM questions q  LEFT JOIN rooms r ON r.reader_id=q.reader_id WHERE r.room_id = $1 AND q.question_status=2", roomId)
        return rows
    }
    async notAnsweredQuestion(readerId){
        const {rows} =await this.query("SELECT * FROM questions q WHERE q.reader_id=$1 AND q.question_status=1", readerId)
        return rows
    }
   async createQuestion(readerId, themeId, libraryId, questionText){
       const {rows} = await  this.query(`INSERT INTO questions(reader_id, theme_id, library_id, question_text) VALUES ($1, $2, $3, $4) RETURNING question_id, reader_id, theme_id, library_id, question_text, question_created_at, question_status`,readerId, themeId||null, libraryId||null, questionText)
       return rows 
   }
    async libUnread(readerId){
        const {rows} =await this.query("SELECT * FROM questions q LEFT JOIN libraries l ON q.library_id=l.library_id LEFT JOIN themes t ON q.theme_id=t.theme_id WHERE q.reader_id = $1 AND q.question_status=1 ", readerId)
        return rows
    }
    async readerRooms(readerId){
        const {rows} =await this.query("SELECT * from rooms r NATURAL JOIN librarians l WHERE r.reader_id = $1", readerId)
        return rows
    }
    async readerUnread(readerId){
        const {rows} =await this.query("SELECT DISTINCT r.room_id from rooms r LEFT JOIN answers a  ON a.room_id= r.room_id WHERE r.reader_id=$1 AND a.isreaded=false ", readerId)
        return rows
    }
    async libraryName(id){
        const {rows} =await this.query("SELECT library_name from libraries WHERE library_id=$1", id)
        return rows
    }
    // Mutation
    async roomQuestion(roomId, questionText){
        const {rows:[question]} = await this.query("SELECT  * FROM rooms r INNER JOIN questions q ON r.reader_id=q.reader_id WHERE r.room_id = $1", roomId)
        const {rows:[created]} = await this.query('INSERT INTO questions(reader_id, theme_id, library_id, question_text, question_status) VALUES ($1, $2, $3, $4, 2) RETURNING question_id, reader_id, theme_id, library_id, question_text, question_created_at, question_status', question.reader_id, question.theme_id, question.library_id, questionText )  
        return[ {...created, room_id:roomId}]
    }
}

module.exports = {QuestionModel}