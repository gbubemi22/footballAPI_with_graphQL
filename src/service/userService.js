const User = require('../models/User');

const userService = {
  getUserById: async (ID) => {
    try {
      return await User.findById(ID);
    } catch (error) {
      throw new Error('Error fetching user by ID');
    }
  },

  getUsers: async () => {
    try {
      return await User.find().sort({ createdAt: -1 });
    } catch (error) {
      throw new Error('Error fetching users');
    }
  },

  createUser: async (userInput) => {
    try {
      const { fullname, username, email, phonenumber, password } = userInput;
      const createdUser = new User({
        fullname: fullname,
        username: username,
        email: email,
        phonenumber: phonenumber,
        password: password,
      });
      const result = await createdUser.save();
      return {
        id: result.id,
        ...result._doc,
      };
    } catch (error) {
      throw new Error('Error creating user');
    }
  },

  deleteUserById: async (ID) => {
    try {
      const wasDeleted = (await User.deleteOne({ _id: ID })).deletedCount;
      return wasDeleted;
    } catch (error) {
      throw new Error('Error deleting user');
    }
  },

  editUser: async (ID, EditUser) => {
    try {
      const { fullname, phonenumber } = EditUser;
      const wasEdited = (await User.updateOne({ _id: ID }, { fullname: fullname, phonenumber: phonenumber })).modifiedCount;
      return wasEdited;
    } catch (error) {
      throw new Error('Error editing user');
    }
  },
};

module.exports = userService;
