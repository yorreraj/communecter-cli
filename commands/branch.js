const exec = require("../utils/exec");
const config = require("../config.json");
const checkConfig = require("../utils/check-config");

module.exports = function(program){
    program
    .command('branch')
    .option('-m, --module <modules...>', 'Spécifier un module')
    .option('-e --exclude <modules...>', "Exclure des modules")
    .description('Afficher le branche actuel')
    .action((options) => {
        if(checkConfig()){
            let modules = options.module?options.module:config.modules,
                excludeModules = options.exclude?options.exclude:[];
            modules = modules.filter(module => excludeModules.indexOf(module) < 0)

            modules.forEach(module => {
                let path = (module=="pixelhumain")?config.projectpath:config.projectpath+"modules/";
                path += module;

                exec({
                    title: `Branche du module ${module}`,
                    cmd: `cd ${path} && git branch`
                })
            })
        }
    });
}