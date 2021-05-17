const { Model } = require('../../connect/pool')


class AnswerModel extends Model{
    // Query
        async oneRoom(room_id){
            const {rows} = await this.query("SELECT * FROM questions q INNER JOIN answers a ON q.question_id = a.question_id WHERE a.room_id =$1 AND q.question_status=3 ORDER BY q.created_at", room_id)
            return rows
        }
        async unreaded(){
            const {rows} =await this.query("SELECT * FROM questions q LEFT JOIN libraries l ON q.library_id=l.library_id LEFT JOIN themes t ON q.theme_id=t.theme_id WHERE q.question_status=1")
            return rows
        }
    // Mutation
        async createRoom (questionId, librarianId){
            // update question status to taken 
            const {rows:[reader]} = await this.query("UPDATE questions SET question_status = 2 WHERE question_id=$1 RETURNING reader_id", questionId)
            // create Room for new messageing
            const {rows: [{room_id}]} = await this.query(` with s as (
                select room_id
                from rooms
                where reader_id = $1 and  librarian_id = $2
            ), i as (
                insert into rooms (reader_id, librarian_id)
                select $1, $2
                where not exists (select room_id from s)
                returning room_id
            )
            select room_id
            from i
            union all
            select room_id
            from s;`, reader.reader_id, librarianId)
            
            const {rows} = await this.query("SELECT * from answers a INNER JOIN questions q ON a.question_id = q.question_id WHERE a.room_id=$1", room_id)

            if (!rows.length){
                const {rows:question} = await this.query("SELECT * FROM questions WHERE question_id=$1", questionId)
                question[0].room_id= room_id
                return question
            }
            return rows
        }
        async createAnswer(questionId, answerText, librarianId){
            // update question status to taken 
            const {rows:[reader]} = await this.query("UPDATE questions SET question_status = 3 WHERE question_id=$1 RETURNING reader_id", questionId)
           
            const {rows:[answer]} = await this.query("INSERT INTO answers (question_id, librarian_id, room_id, answer_text) (SELECT $1, $2, room_id, $3 FROM rooms r WHERE r.reader_id = $4 AND r.librarian_id = $2 ) RETURNING room_id",questionId, librarianId, answerText, reader.reader_id)

            const {rows} = await this.query("SELECT * FROM answers a INNER JOIN questions q ON a.question_id= q.question_id WHERE a.room_id=$1  ORDER BY a.answer_id DESC LIMIT 1", answer.room_id)
            return rows
        }
}

module.exports = {AnswerModel}