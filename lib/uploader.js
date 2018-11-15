const fs = require('fs')
const path = require('path')
const FormData = require('form-data')
const axios = require('axios')
const { promisify } = require('util')

const basePath = process.cwd()
const getFiles = (dir, files_) => {
  files_ = files_ || []
  let files = fs.readdirSync(dir)
  for (let i in files) {
    let name = dir + '/' + files[i]
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files_);
    } else {
      files_.push(name);
    }
  }
  return files_
}

async function getFormHeaders(form) {
  const getLen = promisify(form.getLength).bind(form)
  const len = await getLen()
  return {
    ...form.getHeaders(),
    'Content-Length': len
  }
}

const uploader = {
  getFormData: function (relativeDir = 'dist') {
    let dir = path.resolve(basePath, `./${process.env.UPLOAD_DIR || relativeDir}`)
    let files = getFiles(dir, []);
    let formData = new FormData()

    for (let i = 0; i < files.length; i++) {
      const f = files[i]
      formData.append(f.substr(dir.length + 1), fs.createReadStream(f), path.basename(f))
    }
    return formData
  },
  doUpload: async function main(formData, url) {
    const baseUrl = process.env.UPLOAD_URL || 'http://127.0.0.1:3000'
    url = url || (baseUrl + `/upload/${path.basename(basePath)}`)

    const headers = await getFormHeaders(formData)
    return axios.post(url, formData, {
      method: 'post',
      headers: headers,
      maxContentLength: Infinity,
      onUploadProgress: function (e) {
        var percentage = Math.round((e.loaded * 100) / e.total) || 0
        if (percentage < 100) {
          console.log(percentage + '%')
        }
      }
    }) 
   }
}


module.exports = uploader
