const axios = require('axios')
const { URL } = require('url')
const path = require('path')

const confController = {
  createApacheConf: ({ projectDomain, uploadUrl }) => {
    const baseUrl = new URL(uploadUrl).origin
    const basePath = process.cwd()
    const projectName = path.basename(basePath)
    url = (baseUrl + `/projects/${projectName}/${projectDomain || (projectName + '.com')}`)
    return axios.post(url)
  }
}

module.exports = confController