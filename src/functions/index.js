/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const _ = require('lodash')

const functions = {}
const listOfFunctions = [
  'request',
  'selectTeamByName',
  'getFullTeamDetails',
  'getAllGamesForTeam',
  'getNextGameForTeam',
  'getGameById',
  'selectCompetitionByName',
  'getFullCompetitionDetails'
]

_.map(listOfFunctions, (f) => {
  functions[f] = require(`./${f}`)
})

module.exports = functions
