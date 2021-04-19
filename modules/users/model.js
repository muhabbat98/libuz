const { Model } = require('../../connect/pool')


class UserModel extends Model{
    async admins (){
        const {rows} = await this.query('SELECT * FROM users WHERE user_status=1')
        return rows
    }
    async librarians (){
        const {rows} = await this.query('SELECT * FROM users WHERE user_status=1')
        return rows
    }
}

module.exports = {UserModel}