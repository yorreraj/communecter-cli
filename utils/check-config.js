const config = require("../config.json");
const chalk = require("chalk");

module.exports = function(){
    let res = true;

    if(!config.modules || config.modules.length < 1){
        console.log(chalk.red("Veuillez ajouter d'abord les modules de reférence avec: ") + chalk.white.bgGreen("co config -m <module1> <module2> ..."))
        res = false
    }

    if(!config.projectpath || config.projectpath == ""){
        console.log(chalk.red("Veuillez d'abord configurer le chemin de votre projet en utilisant: ")+chalk.white.bgGreen("co config -p <path_to_your_project>"))
        res = false
    }

    return res;
}