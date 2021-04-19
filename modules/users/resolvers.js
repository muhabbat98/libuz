const { UserModel} = require("./model")
const users = new UserModel()
const resolvers = {
    Query: {
      admins: async() => users.admins(),
    },
    Admin: {
      admin_id: (global)=> global.user_id
    }
  };
  module.exports = resolvers

