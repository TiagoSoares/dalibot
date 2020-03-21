const _ = require('lodash')
const moment = require('moment')
const { RichEmbed } = require('discord.js')

const { Client } = require('unb-api');
const client = new Client('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfaWQiOiI2OTA1Njc3NTE0NTQwMzM0MjgiLCJpYXQiOjE1ODQ3MTQ1ODJ9.62tam53cZRgY7VndK54ZefrTQbFnibLUC-V3jtJsKJY'); 

const {
  selectTeamByName,
  getFullTeamDetails,
  getNextGameForTeam
} = require('../functions')
const {
  defaultTeamId,
  colors: { embedColor }
} = require('../botSettings')
const { messages: { commands: { nextGame: lang } } } = require('../messages')

async function getTeamId (msg, args) {
  // If there are no arguments use default
  if (_.isEmpty(args)) {
    return defaultTeamId
  }

  // If arguments are text, make a request to get teams with matching name
  if (args.join(' ')) {
    return selectTeamByName(msg, args.join(' '))
  }

  return null
}

module.exports = async (msg, args) => {
  msg.delete()
  msg.channel.send(`================================================================\nI see you want to start a small heist... You haven't recruited anyone yet. Let me help you.\n================================================================`).then(message => message.delete(5000))

  // axios.get('https://unbelievaboat.com/api/v1/')

  client.getUserBalance('628512144454975489', '296375699957088259').then(user => console.log(user));
  client.setUserBalance('628512144454975489', '296375699957088259', { cash: 70938, bank: 2747606 }, 'Changing my cash back to before').catch(err => console.log(err))

  // const embed = new RichEmbed()
    // .setTitle(lang.title(selectedTeam.name))
  //   .addField(lang.gameFieldTitle, lang.gameTeams(homeTeam.name, awayTeam.name))
  //   .addField(lang.homeTeam, homeTeam.name, true)
  //   .addField(lang.awayTeam, awayTeam.name, true)
  //   .addField(lang.competition, competitionName, true)
  //   .addField(lang.venue, venue, true)
  //   .addField(lang.gameDay, gameDate, true)
  //   .addBlankField()
  //   .setFooter(lang.footer(msg.author.username, msg))
  //   .setThumbnail(selectedTeam.logo)
  //   .setColor(embedColor)

  // if (gameWeek) {
  //   embed.addField(lang.gameweek, gameWeek, true)
  // }

  // msg.channel.send(embed)
}
