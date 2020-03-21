const { RichEmbed } = require('discord.js')
const { messages: { commands: { help: lang } } } = require('../messages')
const { colors: { embedColor } } = require('../botSettings')

module.exports = (brobot, msg, _args) => {
  const helpEmbed = new RichEmbed()
    .setTitle(lang.title(brobot.user.username))
    .setDescription(lang.description(brobot.user.username))
    .addBlankField()
    .addField(lang.nextGameLabel, lang.nextGame, true)
    .addBlankField()
    .addField(lang.tableLabel, lang.table, true)
    .setColor(embedColor)
  msg.channel.send(helpEmbed)
}