const { Model } = require('../../connect/pool')


class AnswerModel extends Model{
        async createRoom (questionId, librarianId){
            const {rows:[reader]} = await this.query("UPDATE questions SET question_status = 2 WHERE question_id=$1 RETURNING reader_id", questionId)
            console.log(reader, librarianId)
            const {rows} = await this.query("INSERT INTO rooms(reader_id, librarian_id) VALUES($1, $2) RETURNING room_id", reader.reader_id, librarianId)
            console.log(rows)
            return rows
        }
}

module.exports = {AnswerModel}