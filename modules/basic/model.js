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
}

module.exports = {BasicModel}