/* eslint-disable global-require */
module.exports = async (gameId) => {
  const { request } = require('./index')

  const params = {
    gameId
  }

  return request(
    '/game/',
    params
  )
    .then(({ data: { game } }) => game)
}
