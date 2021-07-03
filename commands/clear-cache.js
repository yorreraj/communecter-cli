const exec = require("../utils/exec");
const config = require("../config.json");
const checkConfig = require("../utils/check-config");

module.exports = function(program){
    program
    .command('clear-cache')
    .description('Effacer tous les caches des assets')
    .action(() => {
        if(checkConfig()){
            exec({
                cmd: `cd ${config.projectpath}pixelhumain/ph/assets && rm -r ./*`
            });
        }
    });
}