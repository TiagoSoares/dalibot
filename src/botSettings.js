const server = 'rangers'

// eslint-disable-next-line import/no-dynamic-require
const serverSettings = require(`./servers/${server}`)

serverSettings.permissions = ['ADMINISTRATOR']

module.exports = serverSettings
