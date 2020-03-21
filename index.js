/* eslint-disable no-console */
const Discord = require('discord.js')
require('dotenv').config()

const {
  token,
  permissions,
  prefix
} = require('./src/botSettings')
const {
  commands
} = require('./src/messages')
const {
  startHeist,
  table,
  logMessages,
  help
} = require('./src/commands')

const dalibot = new Discord.Client()

// When Bot starts running
dalibot.once('ready', () => {
  console.log(`The bot ${dalibot.user.username} has been started and is running!`)  
  dalibot.user.setPresence({ status: 'online', game: { name: 'Thinking of you królik' } })
})

// To run on new message
dalibot.on('message', async (msg) => {
    if (msg.author.bot || msg.channel === 'dm') return
    
    const messageArray = msg.content.split(' ')
    
    const args = messageArray.slice(1)
    const commandWithPrefix = messageArray[0]
    
    if (!commandWithPrefix.startsWith(prefix) || msg.author.id != 296375699957088259) return
    
      const command = commandWithPrefix.slice(prefix.length)
      
      logMessages(dalibot, msg)
      
      switch (command) {
        case "startHeist":
        startHeist(msg, args)
      break
    case "fuckLove":
      msg.channel.send(`I know it sucks. Here, it'll make you feel better. https://open.spotify.com/track/7AQim7LbvFVZJE3O8TYgf2?si=lqbjxT8FT3auUncCqwHjow`)
      break
//     case 'help':
//       help(dalibot, msg, args)
//       break
    case 'inviteLink':
      const botInvite = await dalibot.generateInvite(permissions)
      const embed = new Discord.RichEmbed()
        .setTitle(dalibot.user.username)
        .addField('Invite', botInvite)
        .addField('Permissions', permissions)
        .addField('Guilds', dalibot.guilds.array().length)
      msg.reply(embed)
      break
    default:
      msg.reply("The command you ran doesn't match out command list. Use >help for a list of commands.");
      break
  }
})

// Log bot in
dalibot.login(token)
