#! /usr/bin/env node
const { Command } = require("commander"),
      program = new Command(),
      config = require("../config.json");

async function main(){
    require("../commands/index")(program);

    await program.parseAsync(process.argv);
}

main();