const syncExec = require('sync-exec');
const chalk = require('chalk');
const boxen = require("boxen");

module.exports = function({title, cmd}){
    const {stdout, stderr} = syncExec(cmd)

    if(title)
        console.log(boxen(title, {padding:1, borderStyle: 'classic', align:"center", borderColor:"blue"}))

    if(stderr)
        console.log(chalk.red(stderr))
    else
        console.log(chalk.green(stdout))
}