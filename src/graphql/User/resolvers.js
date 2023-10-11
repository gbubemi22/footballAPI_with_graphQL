const User = require('../../models/User');

module.exports = {
  Query: {
    async user(_, { ID }) {
      return await User.findById(ID);
    },
    async getUsers() {
      return await User.find().sort({ createdAt: -1 });
    },
    async getUserByEmail(_, { email }) { 
      return await User.findOne({ email });
    },
  },
  Mutation: {
     async createUser(_, { userInput }) {
          const { fullname, username, email, phonenumber, password } = userInput;
          
          const createdUser = new User({
            fullname: fullname,
            username: username,
            email: email,
            phonenumber: phonenumber,
            password: password,
          });

      const result = await createdUser.save();
      console.log(result._doc);
      return {
        id: result.id,
        ...result._doc,
      };
    },
    async deleteUser(_, { ID }) {
      const wasDeleted = (await User.deleteOne({ _id: ID })).deletedCount;
      return wasDeleted;
    },
    async editUser(_, { ID, EditUser: { fullname, phonenumber } }) {
      const wasEdited = (await User.updateOne({ _id: ID }, { fullname: fullname, phonenumber: phonenumber })).modifiedCount;
      return wasEdited;
    },
  },
};
