const { Model } = require('../../connect/pool')


class QuestionModel extends Model{
   async allQuestions (){
       const {rows} =await this.query(" SELECT * FROM questions q LEFT JOIN libraries l ON q.library_id=l.library_id LEFT JOIN themes t ON q.theme_id=t.theme_id")
       return rows
   }
   async createQuestion(readerId, themeId, libraryId, questionText){
       const {rows} = await  this.query(`INSERT INTO questions(reader_id, theme_id, library_id, question_text) VALUES ($1, $2, $3, $4) RETURNING question_id, reader_id, theme_id, library_id, question_text, created_at, question_status`,readerId, themeId||null, libraryId||null, questionText)
       return rows 
   }
}

module.exports = {QuestionModel}