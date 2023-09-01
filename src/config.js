const userConfig = {
    theme:"light",
    set:function (value){
        console.log('111111111',this)
        this.theme=value
    }
}

module.exports = userConfig;