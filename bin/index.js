#! /usr/bin/env node
const { Command } = require("commander"),
      program = new Command()

async function main(){
    require("../commands/index")(program);
    await program.parseAsync(process.argv);
}

main();