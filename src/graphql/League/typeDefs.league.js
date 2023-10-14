const { gql } = require("apollo-server");

module.exports = gql`
type League {
     leaguename: String
     location: String
     logo: String
}


inpute LeagueInput {
     leaguename: String
     location: String
     logo: String  
}

inpute EditeLeague {
     leaguename: String
     location: String
     logo: String 
}


type Query {
     league(ID: ID!): user
     getAllLeagues: [League]

}

type Mutation {
     createLeague(leagueInput: LeagueInput): League
     deleteLeague(ID: ID!): Boolean
    editLeague(ID: ID!, editeLeague: EditeLeague): Boolean
}


`;
