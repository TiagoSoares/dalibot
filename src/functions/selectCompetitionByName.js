/* eslint-disable global-require */
const _ = require('lodash')
const { RichEmbed } = require('discord.js')

module.exports = async (primaryMessage, competitionName) => {
  const { messages: { functions: { selectCompetitionByNameLang } } } = require('../messages')
  const { questionLabel } = selectCompetitionByNameLang
  const { request } = require('../functions/index')

  let competitionId
  const filter = ({ author: { id } }) => (id === primaryMessage.author.id)
  const awaitMessagesOptions = { maxMatches: 1, time: 20000, errors: ['time'] }
  const params = {
    query: competitionName
  }

  await request(
    '/search',
    params
  ).then(({ data: { competitions, countries } }) => {
    if (_.isEmpty(competitions)) { return }

    const embed = new RichEmbed()
      .setTitle(questionLabel)

    const competitionsFromSearch = _
      .chain(competitions.slice(0, 15))
      .sortBy('countryId')
      .uniqBy('nameForURL')
      .value()

    _.map(competitionsFromSearch, ({ name, countryId }, index) => {
      const country = _.find(countries, ({id}) => id === countryId)
      embed.addField(index + 1, `${country.name} - ${name}`)
    })

    competitionId = primaryMessage.reply(embed)
      .then(msg => primaryMessage.channel.awaitMessages(filter, awaitMessagesOptions)
        .then((collected) => {
          msg.delete()
          const selectedValue = collected.first().content - 1
          if (!_.isInteger(selectedValue)) { return null }

          return competitionsFromSearch[selectedValue].id
        })
        .catch((error) => {
          msg.delete()
          console.error(error)
          return null
        }))
  })
  return competitionId
}
