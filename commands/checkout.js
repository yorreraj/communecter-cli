const exec = require("../utils/exec");
const config = require("../config.json");
const chalk = require("chalk");
const checkConfig = require("../utils/check-config");

module.exports = function(program){
    program
    .command('checkout <branch>')
    .option('-m, --module <modules...>', 'Spécifier un module')
    .option('-e --exclude <modules...>', "Exclure des modules")
    .description('Checkout to branch')
    .action((branch, options) => {
        if(checkConfig()){
            let modules = options.module?options.module:config.modules,
                excludeModules = options.exclude?options.exclude:[];
            modules = modules.filter(module => excludeModules.indexOf(module) < 0)

            modules.forEach(module => {
                let path = (module=="pixelhumain")?config.projectpath:config.projectpath+"modules/";
                path += module;

                exec({
                    title: `checkout module ${module}`,
                    cmd: `cd ${path} && git checkout ${branch}`
                })
            })
        }
    });
}