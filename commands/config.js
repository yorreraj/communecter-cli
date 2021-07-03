const fs = require("fs")
const path = require('path');
const config = require('../config.json')

module.exports = function(program){
    program
    .command('config')
    .option('-m, --modules <modules...>', 'Remplacer tout les modules existant avec les nouveaux.')
    .option('-p, --projectpath <projectpath>', 'Chemin racine du projet')
    .option('-addm, --addmodules <modules...>', 'Ajouter plus des modules')
    .option('-rmm, --removemodules <modules...>', 'Rétirer de module')
    .description('Configuration du CLI')
    .action((options) => {
        if(Object.keys(options).length < 1)
            console.log("Spécier la configuration.")
        else{
            let newConfig = config
            
            if(options.modules)
                newConfig.modules = [...newConfig.modules, ...options.modules]

            if(options.projectpath)
                newConfig.projectpath = options.projectpath+"/"

            if(options.removemodules)
                newConfig.modules = newConfig.modules.filter(module => options.removemodules.indexOf(module)<0)

            if(options.addmodules){
                options.addmodules.forEach(module => {
                    if(newConfig.modules.indexOf(module) < 0)
                        newConfig.modules.push(module)
                })
            }

            fs.writeFile(path.join(__dirname, '..', 'config.json'), JSON.stringify(newConfig), function(){})
        }
    });
}