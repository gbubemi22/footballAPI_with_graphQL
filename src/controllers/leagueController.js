const { StatusCodes } = require("http-status-codes");
const LeagueResolver = require("../graphql/League/resolver.league");

const LeagueController = {
  createLeague: async (req, res) => {
    const { leagueInput } = req.body;

    const newLeague = await LeagueResolver.Mutation.createLeague(
      {},
      { leagueInput },
      {}
    );

    res.status(StatusCodes.CREATED).json({
      message: "League created successfully",
      data: newLeague,
    });
  },
  async getAllLeagues(req, res) {
    
      const allLeagues = await LeagueResolver.Query.getAllLeagues();
      res.status(StatusCodes.OK).json({
        message: "All leagues retrieved successfully",
        count: allLeagues.length,
        data: allLeagues,
      });
    
  },

  async getOneLeague(req, res) {
    const { ID } = req.params; 
    
      const league = await LeagueResolver.Query.league({}, { ID }, {});
      if (league) {
        res.status(StatusCodes.OK).json({
          message: "League retrieved successfully",
          data: league,
        });
      } else {
        res.status(StatusCodes.NOT_FOUND).json({
          message: "League not found",
        });
      }
   
  },
};

module.exports = LeagueController;
