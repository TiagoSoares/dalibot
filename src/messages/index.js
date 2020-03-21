const { language } = require('../botSettings')

// eslint-disable-next-line import/no-dynamic-require
module.exports = require(`./${language}`)
