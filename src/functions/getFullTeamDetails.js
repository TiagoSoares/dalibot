/* eslint-disable global-require */
module.exports = async (teamId) => {
  const { request } = require('./index')
  let team
  const logoPath = `https://imagecache.365scores.com/image/upload/d_Competitors:default1.png/Competitors/${teamId}`

  const params = {
    competitors: teamId
  }

  await request(
    '/games/current',
    params
  )
    .then(({
      data
    }) => {
      team = data.competitors.find(({ id }) => id === teamId)
    })
  team.logo = logoPath
  return team
}
