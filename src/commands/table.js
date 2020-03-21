// Dependencies
const { Attachment } = require('discord.js')
const _ = require('lodash')
const Canvas = require('canvas')

const {
  getFullCompetitionDetails,
  selectCompetitionByName
} = require('../functions')
// Commands Import
const {
  defaultCompetitionId,
  colors: {
    lightColor,
    lightGrayColor,
    darkGrayColor,
    darkColor
  }
} = require('../botSettings')
const { messages: { commands: { table: lang } } } = require('../messages')

const { tableHeadings } = lang

const columns = [
  { accessor: 'position', label: tableHeadings.position, multiplier: 1 },
  { accessor: 'team', label: tableHeadings.team, multiplier: 2 },
  { accessor: 'gamePlayed', label: tableHeadings.gamePlayed, multiplier: 8 },
  { accessor: 'gamesWon', label: tableHeadings.gamesWon, multiplier: 9 },
  { accessor: 'gamesEven', label: tableHeadings.gamesEven, multiplier: 10 },
  { accessor: 'gamesLost', label: tableHeadings.gamesLost, multiplier: 11 },
  { accessor: 'for', label: tableHeadings.for, multiplier: 12 },
  { accessor: 'against', label: tableHeadings.against, multiplier: 13 },
  { accessor: 'ratio', label: tableHeadings.ratio, multiplier: 14 },
  { accessor: 'points', label: tableHeadings.points, multiplier: 15 }
]

async function getCompetitionId (msg, args) {
  // If there are no arguments use default
  if (_.isEmpty(args)) {
    return defaultCompetitionId
  }

  // If arguments are text, make a request to get teams with matching name
  if (args.join(' ')) {
    return selectCompetitionByName(msg, args.join(' '))
  }

  return null
}

module.exports = async (msg, args) => {
  const competitionId = await getCompetitionId(msg, args)

  if (!competitionId) { return msg.reply(lang.error) }
  const competition = await getFullCompetitionDetails(competitionId)

  if (!competition) { return msg.reply(lang.error) }

  const competitionLogo = await Canvas.loadImage(competition.logo)
  const teams = competition.standings[0].rows

  const canvasWidth = 1200
  const canvasHeight = 44 + (_.size(teams) * 50)
  const canvasSideBarWidth = 250
  const canvas = Canvas.createCanvas(canvasWidth, canvasHeight)

  // Background
  const background = canvas.getContext('2d')
  background.strokeRect(0, 0, canvas.width, canvas.height)
  background.fillStyle = darkGrayColor
  background.fillRect(0, 0, canvasWidth, canvasHeight)

  // Side Bar background
  const sideBar = canvas.getContext('2d')
  sideBar.fillStyle = lightGrayColor
  sideBar.fillRect(canvasSideBarWidth, 0, canvasWidth, canvasHeight)

  // Side Bar
  sideBar.font = '20px Montserrat SemiBold'
  sideBar.textAlign = 'center'
  sideBar.fillStyle = lightColor
  sideBar.fillText(competition.countries[0].name, canvasSideBarWidth / 2, canvasHeight / 3)
  sideBar.fillText(competition.competitions[0].name, canvasSideBarWidth / 2, canvasHeight / 2.7)
  sideBar.drawImage(competitionLogo, 50, canvasHeight / 2.5, 150, 150)

  const tableStart = canvasSideBarWidth
  const tableRowHeight = 50
  const tableWidth = canvasWidth - canvasSideBarWidth

  const table = canvas.getContext('2d')
  table.fillStyle = darkColor
  table.fillRect(tableStart, 0, tableWidth, tableRowHeight)
  table.fillStyle = lightColor

  _.map(columns, ({ label, multiplier }) => {
    const cellStartWidth = multiplier === 1 ? tableStart + (tableWidth / 20) : tableStart + (tableWidth / 16 * multiplier)

    table.fillText(label, cellStartWidth, tableRowHeight / 1.5)
  })

  table.font = '17px Montserrat SemiBold'
  table.textAlign = 'center'
  table.fillStyle = darkColor

  const logos = await Promise.all(_.map(teams, (team) => {
    const teamId = team.competitor.id
    const logoPath = `https://imagecache.365scores.com/image/upload/d_Competitors:default1.png/Competitors/${teamId}`
    return Canvas.loadImage(logoPath)
  })).then(logo => logo)

  _.map(teams, (team, index) => {
    _.map(columns, ({ multiplier, accessor }) => {
      const cellStartWidth = multiplier === 1 ? tableStart + (tableWidth / 20) : tableStart + (tableWidth / 16 * multiplier)
      const cellStartHeight = tableRowHeight * index + (tableRowHeight + 25)

      if (accessor === 'team') {
        table.textAlign = 'left'
        table.fillText(team.competitor.name, cellStartWidth + 20, tableRowHeight * index + (tableRowHeight + 25))
        table.drawImage(logos[index], cellStartWidth - 30, cellStartHeight - 18, tableRowHeight / 2, tableRowHeight / 2)
      } else {
        table.textAlign = 'center'
        table.fillText(team[accessor], cellStartWidth, tableRowHeight * index + (tableRowHeight + 25))
      }

      table.beginPath()
      table.setLineDash([10, 7])
      table.moveTo(tableStart, cellStartHeight + 20)
      table.lineTo(tableStart + tableWidth, cellStartHeight + 20)
      table.strokeStyle = darkGrayColor
      table.stroke()
    })
  })

  const attachment = new Attachment(canvas.toBuffer(), 'standings.png')

  msg.channel.send(attachment)
  // .then(message => message.delete(10000))
    .catch(error => console.error(error))
}
