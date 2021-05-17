const { Model } = require('../../connect/pool')


class QuestionModel extends Model{
   async allQuestions (){
       const {rows} =await this.query("SELECT * FROM questions q  LEFT JOIN themes t ON q.theme_id=t.theme_id")
       return rows
   }
   async oneQuestion (id){
    const {rows} =await this.query(" SELECT * FROM questions q LEFT JOIN themes t ON q.theme_id=t.theme_id WHERE q.question_id = $1", id)
    return rows
    }
   async createQuestion(readerId, themeId, libraryId, questionText){
       const {rows} = await  this.query(`INSERT INTO questions(reader_id, theme_id, library_id, question_text) VALUES ($1, $2, $3, $4) RETURNING question_id, reader_id, theme_id, library_id, question_text, created_at, question_status`,readerId, themeId||null, libraryId||null, questionText)
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
}

module.exports = {QuestionModel}