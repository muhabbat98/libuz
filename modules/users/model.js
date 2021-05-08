const { Model } = require('../../connect/pool')


class UserModel extends Model{
    async admins (){
        const {rows} = await this.query('SELECT * FROM users WHERE user_status=1')
        return rows
    }
    async addAdmins (username, password){
        const {rows} = await this.query("INSERT INTO users(username, password, user_status) VALUES ($1, crypt($2, gen_salt('bf')), 1) RETURNING user_id username, password, user_status", username, password)
        return rows
    }
    async librarians (){
        const {rows} = await this.query('SELECT * FROM librarians ln INNER JOIN users u ON u.user_id= ln.user_id FULL JOIN libraries ly ON ln.library_id= ly.library_id')
        return rows
    }
    async addLibrarian (username, password, firstName, lastName, librarianPhone, library){

        // create user
        const  {rows:[user]} = await this.query("INSERT INTO users(username, password, user_status) VALUES ($1, crypt($2, gen_salt('bf')), 2) RETURNING user_id, username, password, user_status", username, password)

        // create librarian 
        const {rows:[librarian]}= await this.query("INSERT INTO librarians(user_id, first_name, last_name, librarian_phone, library_id) VALUES ($1, $2, $3, $4, $5) RETURNING librarian_id", user.user_id, firstName, lastName, librarianPhone, library)

        // join librarian and library and select all of them
        const {rows:[lib]}=await this.query("SELECT * FROM librarians ln INNER JOIN libraries ly ON ln.library_id=ly.library_id AND ln.librarian_id=$1", librarian.librarian_id)

        return{...user, ...lib}
    }
    async readers (){
        const {rows} = await this.query('SELECT * FROM readers r INNER JOIN users u ON u.user_id= r.user_id FULL JOIN reader_roles rl ON r.reader_role_id= rl.reader_role_id')
        return rows
    }
    async addReader (username, password, readerEmail, readerRole, readerPhone){

        // create user
        const  {rows:[user]} = await this.query("INSERT INTO users(username, password, user_status) VALUES ($1, crypt($2, gen_salt('bf')), 2) RETURNING user_id, username, password, user_status", username, password)

        // create reader 
        const {rows:[reader]}= await this.query("INSERT INTO readers(user_id, reader_email, reader_role_id, reader_phone) VALUES ($1, $2, $3, $4) RETURNING reader_id", user.user_id, readerEmail, readerRole||NULL, readerPhone)

        // join reader and reader_role and select all of them
        const {rows:[read]}=await this.query("SELECT * FROM readers r INNER JOIN reader_roles rs ON r.reader_role_id= rs.reader_role_id AND r.reader_id=$1", reader.reader_id)

        return{...user, ...read}
    }
}

module.exports = {UserModel}