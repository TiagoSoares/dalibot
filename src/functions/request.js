const axios = require('axios')

module.exports = (relativePath, customParams) => {
  const params = {
    ...customParams
  }

  return axios.get(`https://webws.365scores.com/web/${relativePath}`, {
    params
  }).catch((error) => {
    console.log(error)
  })
}
