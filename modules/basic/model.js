const { Model } = require('../../connect/pool')


class BasicModel extends Model{
    async libraries(){
        const {rows} = await this.query("SELECT * FROM libraries")
        return rows
    }
    async themes(){
        const {rows} = await this.query("SELECT * FROM themes")
        return rows
    }
    async readerRole(){
        const {rows} = await this.query("SELECT * FROM reader_roles")
        return rows
    }
    async addReaderRole(roleName){
        const {rows} = await this.query("INSERT INTO reader_roles(reader_role) VALUES ($1)", roleName)
        return rows
    }
}

module.exports = {BasicModel}