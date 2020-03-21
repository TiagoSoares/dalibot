/* eslint-disable global-require */
const _ = require('lodash')
const moment = require('moment')

module.exports = async (teamId) => {
  const {
    getAllGamesForTeam,
    getGameById
  } = require('./index')

  const games = await getAllGamesForTeam(teamId)
  const gameToFetch = games.find(({ startTime, gameTime }) => gameTime < 0 && moment(startTime).isAfter(moment()))

  if (_.isEmpty(games) || !gameToFetch) { return null }

  return getGameById(gameToFetch.id)
}
