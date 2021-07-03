const COMMANDS = ["clear-cache", "checkout", "pull", "config", "branch"]

module.exports = function(program){
    COMMANDS.forEach(command => {
        require(`./${command}.js`)(program)
    })
}