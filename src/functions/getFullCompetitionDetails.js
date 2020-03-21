/* eslint-disable global-require */
module.exports = async (competitionId) => {
  const { request } = require('./index')
  let competition
  const logoPath = `https://imagecache.365scores.com/image/upload/Competitions/${competitionId}`

  const params = {
    competitions: competitionId
  }

  await request(
    '/standings/',
    params
  )
    .then(({
      data
    }) => {
      competition = data
    })
  competition.logo = logoPath
  return competition
}
