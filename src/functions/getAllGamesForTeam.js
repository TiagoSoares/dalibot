/* eslint-disable global-require */
module.exports = async (teamId) => {
  const { request } = require('./index')

  let teamGames

  const params = {
    competitors: teamId
  }

  await request(
    '/games/current/',
    params
  )
    .then(({
      data
    }) => {
      teamGames = data.games
    })

  return teamGames
}
