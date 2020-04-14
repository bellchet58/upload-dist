
const axios = require('axios')
const { URL } = require('url')
const path = require('path')
const querystring = require('querystring')

const gradlewHelper = {
  getUrl: ({ projectPath, api, uploadUrl }) => {
    const urlObj = new URL(uploadUrl)
    const baseUrl = urlObj.origin
    const urlParams = querystring.parse(urlObj.search.slice(1))
    const params = querystring.stringify({ projectPath: projectPath || (urlParams && urlParams.path), api })
    const url = (baseUrl + `/projects/gradlew?${ params }`)
    return url
  }
}

module.exports = gradlewHelper