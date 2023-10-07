const { gql } = require('apollo-server')

module.exports = gql`
type User {
  fullname  : String
  username: String
  email: String
  phonenumber: Int
  password: String
  role: String 
}
 
  input UserInput {
  fullname  : String
  username: String
  email: String
  phonenumber: Int
  password: String
  role: String  
  }

  input EditUser {
    fullname: String
    phonenumber: Int

  }


  type Query {
    user(ID: ID!): User
    getUsers: [User]
    
  }
  

  type Mutation {
      createUser(userInput: UserInput): User!
      deleteUser(ID: ID!): Boolean
      editUser(ID:ID!,editUser: EditUser): Boolean
  }


`