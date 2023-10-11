const userResolver = require('../graphql/User/resolvers'); 
const UnauthenticatedError = require("../errors/unauthenticated");
const BadRequestError = require("../errors/bad-request");
const { StatusCodes } = require("http-status-codes");
const validatePasswordString = require("../utils/password");
const jwt = require("jsonwebtoken");

// Define controller functions
const AuthController = {
  createUser: async (req, res) => {
    try {
      const { userInput } = req.body;
       console.log(userInput)
      // Check if the email is already in use
      const existingUser = await userResolver.Query.getUserByEmail({}, { email: userInput.email });

      if (existingUser) {
        throw new Error("Email is already in use.");
      }

      validatePasswordString(userInput.password);

      // Create the user if all checks pass
      const newUser = await userResolver.Mutation.createUser({}, { userInput }, {});

      // Return a response using the appropriate status code
      res.status(StatusCodes.CREATED).json({
        message: "User created successfully",
        data: newUser, 
      });
    } catch (error) {
      console.log("CHECK::::",error)
      res.status(500).json({
        error: 'Failed to create user', error,
        message: error.message,
      });
    }
},
  

  // ...

  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new BadRequestError("Please provide username and password");
    }

    const user = await await userService.getUserByEmail(email);

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("Invalid Credentials");
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECT, {
      expiresIn: "1h",
    });

    res.status(StatusCodes.OK).json({
      user,
      token,
    });
  },
};

module.exports = AuthController;
