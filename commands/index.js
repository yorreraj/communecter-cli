const COMMANDS = ["clear-cache", "checkout", "pull", "config", "branch", "create-cms-block"]

module.exports = function(program){
    COMMANDS.forEach(command => {
        require(`./${command}.js`)(program)
    })
}