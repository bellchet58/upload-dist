#!/usr/bin/env node
var uploader = require('../lib/uploader')
var program = require('commander')
var chalk = require('chalk')
var package = require('../package.json')

program.version('v' + package.version)
  .description('check the tool\'s version')

program.command('sync <uploadUrl> [relativeDir]')
  .alias('s')
  .description('sync webpacked dist dir to url')
  .action(function (uploadUrl, relativeDir) {
    uploader.doUpload(uploader.getFormData(relativeDir), uploadUrl).then(() => {
      console.log(chalk.green('upload success!'))
    }).catch(err => {
      console.error(chalk.red('upload failed!\n'), chalk.blue(err))
    })
  })

program.parse(process.argv)

if (program.args.length === 0) {
  program.help()
}