/* eslint-disable global-require */
const _ = require('lodash')
const { RichEmbed } = require('discord.js')

module.exports = async (primaryMessage, teamName) => {
  const { messages } = require('../messages')
  const { questionLabel } = messages.functions.selectTeamByNameLang
  const { request } = require('../functions/index')

  let teamId
  const filter = ({ author: { id } }) => (id === primaryMessage.author.id)
  const awaitMessagesOptions = { maxMatches: 1, time: 20000, errors: ['time'] }
  const params = {
    query: teamName
  }

  await request(
    '/search',
    params
  ).then(({ data: { competitors: unfilteredCompetitors, countries } }) => {
    
    if (_.isEmpty(unfilteredCompetitors)) { return }

    const competitors = _.filter(unfilteredCompetitors, ({hasStandingsGroups}) => !hasStandingsGroups)

    if (_.isEmpty(competitors)) { return }

    const embed = new RichEmbed()
      .setTitle(questionLabel)

    const teams = _
      .chain(competitors.slice(0, 15))
      .sortBy('countryId')
      .uniqBy('nameForURL')
      .value()

    _.map(teams, ({ name, countryId }, index) => {
      const country = _.find(countries, ({id}) => id === countryId)
      embed.addField(index + 1, `${country.name} - ${name}`)
    })

    teamId = primaryMessage.reply(embed)
      .then(msg => primaryMessage.channel.awaitMessages(filter, awaitMessagesOptions)
        .then((collected) => {
          msg.delete()
          const selectedValue = collected.first().content - 1
          if (!_.isInteger(selectedValue)) { return null }

          return teams[selectedValue].id
        })
        .catch((error) => {
          msg.delete()
          console.error(error)
          return null
        }))
  })
  return teamId
}
