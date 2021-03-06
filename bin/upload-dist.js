#!/usr/bin/env node
var uploader = require('../lib/uploader')
var confController = require('../lib/confController')
var gradlewHelper = require('../lib/gradlewHelper')
var program = require('commander')
var chalk = require('chalk')
var package = require('../package.json')

program.version('v' + package.version)
  .description('check the tool\'s version')
  .option('-a, --addConf [projectDomain]', 'add static server(apache/nginx etc.) conf to target machine and restart server')
  .option('-g, --gradlew [projectPath]', 'generate apk file using gradlew')

program.command('sync <uploadUrl> [relativeDir]')
  .alias('s')
  .description('sync webpacked dist dir to url')
  .action(function (uploadUrl, relativeDir, cmd) {
    uploader.doUpload(uploader.getFormData(relativeDir), uploadUrl).then(() => {
      console.log(chalk.green('upload success!'))
      cmd.addConf = program.addConf
      cmd.gradlewPath = program.gradlew
      if (cmd.addConf) {
        return confController.createApacheConf({ projectDomain: typeof cmd.addConf === 'boolean' ? null : cmd.addConf, uploadUrl }).then(resp => {
          resp.data.success ? console.log(chalk.green('conf create success!')) : console.log(chalk.red('conf create failed!\n Try Again!'), chalk.blue(resp.data.msg))
        })
      }
      if(cmd.gradlewPath) {
        console.log(chalk.green('open'), chalk.yellow(`${gradlewHelper.getUrl({ projectPath: typeof cmd.gradlewPath === 'boolean' ? null: cmd.gradlewPath, uploadUrl })}`), chalk.green('in the browser to download!'))
      }
    }).catch(err => {
      console.error(chalk.red('upload failed!\n'), chalk.blue(err))
    })
  })

program.parse(process.argv)

if (program.args.length === 0) {
  program.help()
}