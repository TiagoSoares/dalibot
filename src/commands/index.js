/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const _ = require('lodash')

const commands = {}
const listOfCommands = ['startHeist', 'table', 'logMessages', 'help']

_.map(listOfCommands, (command) => {
  commands[command] = require(`./${command}`)
})

module.exports = commands
