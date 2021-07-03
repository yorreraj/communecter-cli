const exec = require("../utils/exec");
const config = require("../config.json");

module.exports = function(program){
    program
    .command('pull')
    .option('-m, --module <modules...>', 'Spécifier un module')
    .option('-e --exclude <modules...>', "Exclure des modules")
    .description('Pull repo')
    .action((options) => {
        let modules = options.module?options.module:config.modules,
            excludeModules = options.exclude?options.exclude:[];
        modules = modules.filter(module => excludeModules.indexOf(module) < 0)

        modules.forEach(module => {
            let path = (module=="pixelhumain")?config.projectpath:config.projectpath+"modules/";
            path += module;

            exec({
                title: `pull module ${module}`,
                cmd: `cd ${path} && git pull`
            })
        })
    });
}