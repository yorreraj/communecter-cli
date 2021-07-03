const exec = require("../utils/exec");
const config = require("../config.json");

module.exports = function(program){
    program
    .command('clear-cache')
    .description('Effacer tous les caches des assets')
    .action(() => {
        exec({
            cmd: `cd ${config.projectpath}pixelhumain/ph/assets && rm -r ./*`
        });
    });
}