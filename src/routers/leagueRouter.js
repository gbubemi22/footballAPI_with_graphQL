const express = require('express');
const router = express.Router();


const LeagueController = require('../controllers/leagueController')



router
.route('/')
.post(LeagueController.createLeague)
.get(LeagueController.getAllLeagues)

router
.route('/:ID')
.get(LeagueController.getOneLeague)



module.exports = router;