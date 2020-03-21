const moment = require('moment')

module.exports = async (dalibot, msg) => {
  const logChannel = await dalibot.channels.get('690560593983307796')
  logChannel.send(`User \`${msg.author.username}\` from \`${msg.guild.name}\` ran the command \`${msg.content}\` in the channel \`${msg.channel.name}\` at \`${moment().format('LLLL')}\``)
}