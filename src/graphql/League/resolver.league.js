const League = require("../../models/League");

module.exports = {
  Query: {
    async league(_, { ID }) {
      return await League.findById(ID);
    },
    async getAllLeagues() {
      return await League.find().sort({ createdAt: -1 });
    },
  },
  Mutation: {
    async createLeague(_, { leagueInput }) {
      const { leaguename, location, logo } = leagueInput;

      const newLeague = new League({
        leaguename,
        location,
        logo,
      });

      const result = await newLeague.save();

      return {
        id: result.id,
        ...result._doc,
      };
    },
    async deleteLeague(_, { ID }) {
      const wasDeleted = (await League.deleteOne({ _id: ID })).deletedCount;
      return wasDeleted;
    },
    async editLeague(_, { ID, editeLeague: { leagueName, location, logo } }) {
      const wasEdited = (
        await League.updateOne({ _id: ID }, { leagueName, location, logo })
      ).modifiedCount;
      return wasEdited;
    },
  },
};
